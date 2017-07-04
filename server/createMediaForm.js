const builder = require('xmlbuilder');
const base64Img = require('base64-img');
const gifyParse = require('gify-parse');
const axios = require('axios');

const base64Async = (url) => {
  return new Promise((resolve, reject) => {
    base64Img.requestBase64(url, (err, res, body) => {
      if (err) reject(err);
      else resolve(body)
    })
  });
};

const getDuration = async (url) => {
  const downsizedURL = url.replace(/giphy.gif/, '100w.gif')
  const b64 = await base64Async(downsizedURL);
  const b64Stripped = b64.replace(/^data:image\/[a-z]+;base64,/, "");
  const pictureDatainBinary = Buffer.from(b64Stripped, 'base64');
  return gifyParse.getInfo(pictureDatainBinary).duration;
};

const attachDuration = async (mediaItem) => {
  const duration = await getDuration(mediaItem.imageURL);
  return Object.assign({}, mediaItem, { duration });
};

const createMediaForm = async ({ selectedWords, textEntry, videoID }) => {
  const promises = selectedWords.map(attachDuration);
  const withDuration = await Promise.all(promises);

  let mediaForm = { root: { item: [] }};
  let base = {
    id: null,
    layer: '0',
    order: '0',
    url: '',
    mediaType: 'gif',
    startPoint: '',
    endPoint: '',
    xPosition: '0',
    yPosition: '0',
    mediaWidth: '0',
    mediaHeight: '0'
  }

  let rollingStart = 0;
  withDuration.forEach((word, idx) => {
    let { duration, height, id, imageURL, width } = word;
    mediaForm.root.item.push(
      Object.assign({}, base, {
        url: imageURL,
        id: '1' + idx + idx,
        startPoint: String(rollingStart),
        endPoint: String(rollingStart + duration),
        xPosition: '0',
        yPosition: '0',
        mediaWidth: width,
        mediaHeight: height        
      })
    );

    rollingStart += duration;
  });

  return mediaForm;
};

module.exports = { createMediaForm }