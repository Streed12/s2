import getGiphy from '../media/giphy'

const inputTextChange = (e) => {
  e.preventDefault();
  return {
    type: 'inputTextChange',
    payload: e.target.value
  };
};

const inputButtonClick = (e, history) => {

  e.preventDefault();
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

export { inputTextChange, inputButtonClick, wordClick, 
         loadImages, nextBatch, prevBatch, selectClick };