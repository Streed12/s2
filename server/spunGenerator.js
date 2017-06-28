import builder from 'xmlbuilder'
import axios from 'axios'
import createXML from './createXML'
import util from 'util'

const awsURL = 'https://mediamix-upload.s3-eu-central-1.amazonaws.com/public/sr_test2.xml'
let randomInfo;

const buildVideo = (req, res) => {
  let { images } = req.body;
  let mediaFormatted = createXML(images, 'gif');

  axios.put(awsURL, mediaFormatted, {
    headers: {
        'Content-Type': 'application/xml',    
    }
  })
  .then(data => {
    res.status(200).send('hello')
  })
  .catch(err => {
    console.log('Error with xml request to server', err)
  })
}

const getInfo = (req, res) => {
  res.send(randomInfo)
}

module.exports = {
  buildVideo,
  getInfo
}
