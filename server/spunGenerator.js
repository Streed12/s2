import builder from 'xmlbuilder'
import axios from 'axios'
import createXML from './createXML'

const awsURL = 'https://mediamix-upload.s3-eu-central-1.amazonaws.com/public/sr_test.xml'


const buildVideo = (req, res) => {
  let { images } = req.body;
  let mediaFormatted = createXML(images, 'gif');

  axios.put(awsURL, mediaFormatted, {
    headers: {
        'Content-Type': 'application/xml'       
    }
  })
  .then(data => {
    // console.log(data)
  })
  .catch(err => {
    console.log('Error with xml request to server', err)
  })

  res.status(200).send('hello');
}

module.exports ={
  buildVideo
}
