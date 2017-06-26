import builder from 'xmlbuilder'
import axios from 'axios'
import { createXML } from './createXML'
import util from 'util'
import crypto from 'crypto';

const awsURL = 'https://mediamix-upload.s3-eu-central-1.amazonaws.com/public/'
let counter = 0;

const videoURLCache = {};

const videoIDGenerator = (req, res) => {
  const hash = crypto.createHash('sha256');
  hash.update(++counter + '-' + new Date().toString());
  let videoID = hash.digest('hex').slice(0, 10);
  console.log('video id generated', videoID) // delete
  videoURLCache[videoID] = 'waiting';
  res.status(200).send(videoID);
}

const buildVideo = async (req, res) => {
  let { selectedWords, textEntry, videoID } = req.body;
  if (!videoURLCache[videoID]) {
    res.status(404).end();
  }

  res.status(200).end();
  let xmlFile = await createXML(req.body);

  return generateVideo(xmlFile, videoID);
};

const generateVideo = (xmlFile, videoID) => {
  return axios.put(`${awsURL}${videoID}.xml`, xmlFile, {
    headers: {
        'Content-Type': 'application/xml',    
    }
  })
  .catch((error) => {
    console.log(e);
    videoURLCache[videoID] = 'error';    
  });
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
    }, 5000);
  } else {
    res.status(200).send(status);
  }
};

const saveVideoURL = (req, res) => {
  const { videoID } = req.params;
  const url = req.body.xml.result[0];
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
