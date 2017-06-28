const builder = require('xmlbuilder');
const { AWS } = require('./config_setup');
const base64Img = require('base64-img');
const gifyParse = require('gify-parse');
const axios = require('axios');

let { username, client, callbackURL } = AWS

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

const createXML = async ({selectedWords, textEntry, videoID}) => {
  const promises = selectedWords.map(attachDuration);
  const withDuration = await Promise.all(promises);

  let mediaXML = builder.create('root')
    .ele('callbackUrl', `${callbackURL}${videoID}`).up()
    .ele('username', username).up()
    .ele('key', client).up()

    let startPoint = 0;

    withDuration.forEach(word => {
      let { duration, height, id, imageURL, width } = word;

      let item = mediaXML.ele('item')
        item.ele('layer', 0).up()
        item.ele('order', 0).up()
        item.ele('url', imageURL).up()
        item.ele('mediaType', 'gif').up()           
        item.ele('startPoint', startPoint).up()      
        item.ele('endPoint', startPoint + duration).up()      
        item.ele('xPosition', 0).up()      
        item.ele('yPosition', 0).up()      
        item.ele('mediaWidth', width).up()      
        item.ele('mediaHeight', height).up()           
      .up()
      startPoint += duration ;
    })

 return mediaXML.end({pretty: true});
}

module.exports = { createXML }