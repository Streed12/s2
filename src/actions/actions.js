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


const generateVideo = () => async (dispatch, getState) => { 
  let { input, images } = getState();
  const { string: textEntry } = input
  let selectedWords = images.map(image => {
  let { chosenIndex } = image;
  console.log('video generator', 'chosen index', chosenIndex, 'chosen image', image.displayedImages[chosenIndex])
  
    return {
      word: image.string,
      imageURL: image.displayedImages[chosenIndex].url.replace(/200.*/,'giphy.gif'),
      height: image.displayedImages[chosenIndex].height,
      width: image.displayedImages[chosenIndex].width
    }
  })
  try {
    const { data: videoID } = await axios.get('/api/generateID')
    
    const _vidSent = await axios.post('/api/buildVideo', { selectedWords, textEntry, videoID });
    const videoURL = await axios.get(`/api/videoURL/${videoID}`)

    dispatch({
      type: 'produceVideo',
      payload: { videoURL: videoURL.data }
    })
  } catch (e) {
    console.log(e)
    dispatch({
      type: 'setErrorMessage',
      payload: e
    })
  }
}

export { inputTextChange, inputButtonClick, wordClick, 
         loadImages, nextBatch, prevBatch, selectClick, generateVideo };