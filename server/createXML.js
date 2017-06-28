import builder from 'xmlbuilder'
import { AWS } from './config_setup'
import base64Img from 'base64-img'
import gifyParse from 'gify-parse'
import axios from 'axios'

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
  const b64 = await base64Async(url);
  const b64Stripped = b64.replace(/^data:image\/[a-z]+;base64,/, "");
  const pictureDatainBinary = Buffer.from(b64Stripped, 'base64');
  return gifyParse.getInfo(pictureDatainBinary).duration;
};

const attachDuration = async (mediaItem) => {
  const duration = await getDuration(mediaItem.imageURL);
  return {...mediaItem, duration};
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