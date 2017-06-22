import getGiphy from '../media/giphy'
import axios from 'axios'

const inputTextChange = (e) => {
  e.preventDefault();
  return {
    type: 'inputTextChange',
    payload: e.target.value
  };
};

const inputButtonClick = (history) => {

  history.push('/choose');

  return {
    type: 'inputButtonClick'
  };
};

const wordClick = (idx) => {
  return {
    type: 'toggleChosen',
    payload: idx
  };
};

const loadImages = words => async dispatch => {
  let promises = words.map(word => getGiphy(word));
  let imageData = await Promise.all(promises);
  
  dispatch({
    type: 'createImageState',
    payload: imageData
  });
}

const nextBatch = (idx) => {
  return {
    type: 'nextBatch',
    payload: idx
  };
};

const prevBatch = (idx) => {
  return {
    type: 'prevBatch',
    payload: idx
  };
};

const selectClick = (wordIndex, imageIndex) => {
  return {
    type: 'imageSelected',
    payload: {
      wordIndex, imageIndex
    }
  }
};


const generateVideo = (images) => async dispatch => {

  let videoURL = await axios.post('/api/generate', { images });

  dispatch({
    type: 'produceVideo',
    payload: { videoURL: videoURL.data }
  })
}

export { inputTextChange, inputButtonClick, wordClick, 
         loadImages, nextBatch, prevBatch, selectClick, generateVideo };