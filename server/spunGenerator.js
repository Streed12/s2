const builder = require('xmlbuilder');
const axios = require('axios');
const { createMediaForm } = require('./createMediaForm');
const util = require('util');
const crypto = require('crypto');

const createUrl = (url, params) => {
  let paramsSerialized = Object.entries(params).map(pair => {
    return `${pair[0]}=${pair[1]}`;
  }).join('&');

  return `${url}${paramsSerialized}`;
};

const BASE_URL = 'http://162.244.81.253:3333/api/projects'
const MediaEngineURLs = {
  'CREATE': (params) => createUrl(`${BASE_URL}?`, params),
  'UPDATE': (params, projectId) => createUrl(`${BASE_URL}/${projectId}?`, params),
  'DELETE': (params, projectId, itemNo) => createUrl(`${BASE_URL}/${projectId}/items/${itemNo}?`, params),
  'RENDER': (params, projectId) => createUrl(`${BASE_URL}/${projectId}/render/?`, params),
};

const testParams = {
  username: 'test_user',
  key: '1e19b1be60887562b0dd73b23b92f6c1'
};

const videoURLCache = {};
let counter = 0;

const videoIDGenerator = (req, res) => {
  const hash = crypto.createHash('sha256');
  hash.update(++counter + '-' + new Date().toString());
  let videoID = hash.digest('hex').slice(0, 10);
  videoURLCache[videoID] = 'waiting';
  res.status(200).send(videoID);
}

const buildVideo = async (req, res) => {
  let { selectedWords, textEntry, videoID } = req.body;
  if (!videoURLCache[videoID]) {
    res.status(404).end();
  }

  res.status(200).end();
  let mediaForm = await createMediaForm(req.body);

  return generateVideo(mediaForm, videoID);
};

const generateVideo = async (mediaForm, videoID) => {
  try {
    let createURL = MediaEngineURLs['CREATE'](testParams);
    let engineStatus = await axios.post(createURL, mediaForm, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!engineStatus.data || !engineStatus.data.root || !engineStatus.data.root.projectId) {
      throw 'mediaMix Engine Error';
    }

    let { projectId } = engineStatus.data.root;
    let callbackURL = `https://spnapplication.herokuapp.com/video/${videoID}`;
    let renderURL = MediaEngineURLs['RENDER'](Object.assign({}, testParams, { url : callbackURL }), projectId);
    return axios.get(renderURL);
  } catch(error) {
    console.log('error in generateVideo', error);
    videoURLCache[videoID] = 'error';    
  };
}

const sendVideoURL = (req, res) => {
  const { videoID } = req.params;
  const status = videoURLCache[videoID]

  if (!status) {
    res.status(404).send('Invalid ID');
  } else if (status === 'error') {
    res.status(500).send('Error with engine. Retry Later');
  } else if (status === 'waiting') {
    setTimeout(() => {
      const newStatus = videoURLCache[videoID];
      if(newStatus === 'waiting') {
        res.status(500).send('Server took too long. App engine down.');
      } else if (newStatus === 'error') {
        res.status(500).send('Error with engine. Retry Later');
      } else {
        res.status(200).send(newStatus);
      }
    }, 15000);
  } else {
    res.status(200).send(status);
  }
};

const saveVideoURL = (req, res) => {
  const { videoID } = req.params;
  const url = req.body.result;
  if (videoURLCache[videoID]) {
    videoURLCache[videoID] = url;
  } else {
    console.log('invalid id', videoID, url);
  }

  res.status(200).end();
};

module.exports = {
  videoIDGenerator,
  buildVideo,
  sendVideoURL,
  saveVideoURL
};
