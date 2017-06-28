import builder from 'xmlbuilder'
import { AWS } from './config_setup'
let { username, client, callbackURL } = AWS


let mediaXML = builder.create('root')
  .ele('callbackUrl', callbackURL).up()
  .ele('username', username).up()
  .ele('key', client).up()

  let trimStart = 7000;
  let trimEnd = 1400;
  let startPoint = 0;


module.exports = (medias, type) => {

  if( type === 'gif'){
    medias.forEach((media, idx) => {
      let { imagesArray, chosenIndex } = media;
      let imgURL = imagesArray[chosenIndex].replace(/200.*/,'giphy.gif')

      let item = mediaXML.ele('item')
      
      item.ele('layer', 0).up()
      item.ele('order', 0).up()
      item.ele('url', imgURL).up()
      item.ele('mediaType', 'gif').up()      
      item.ele('trimStart', trimStart).up()      
      item.ele('trimEnd', trimEnd).up()      
      item.ele('startPoint', startPoint).up()      
      item.ele('endPoint', startPoint + 7000).up()      
      item.ele('xPosition', 0).up()      
      item.ele('yPosition', 0).up()      
      item.ele('mediaWidth', 400).up()      
      item.ele('mediaHeight', 300).up()           
      .up()
      startPoint += 7000;
      trimEnd += trimStart;
      trimStart += 7000;
    })
  }

  return mediaXML.end({pretty: true});
}