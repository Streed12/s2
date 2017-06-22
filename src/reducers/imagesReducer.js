const DISPLAY_PER_ROW = 3;
const WORDS_TO_DISPLAY = 5;

const shape = {
  string: '',
  imagesArray: [],
  displayedImages: [],
  chosenIndex: null,
  atIndex: 0,  
  atBeginning: true,
  atEnd: false
};

// displayedImages = [ { url: url, selected: true/false } ]

const createDisplayedImages = (images, startIdx) => {
  return images.slice(startIdx, startIdx + DISPLAY_PER_ROW)
         .map(url => { 
            return { 
              url: url, 
              selected: false 
            }
          });
};

export default function imagesReducer(state = [], action) {
  switch (action.type) {

    case 'createImageState':
      return action.payload.map((obj, idx) => {
        return Object.assign({}, shape, {
          string: obj.word,
          imagesArray: obj.images,
          displayedImages: createDisplayedImages(obj.images, 0)
        })
      })

    case 'nextBatch':
      var wordIndex = action.payload;
      var word = state[wordIndex];
      if (word.atEnd) {
        return state;
      }

      var nextState = state.slice();
      var nextIndex = Math.min(nextState[wordIndex].atIndex + DISPLAY_PER_ROW, 
                                nextState[wordIndex].imagesArray.length - 1);

      nextState[wordIndex] = {...word, ...{
        atIndex : nextIndex,
        atEnd : nextIndex + DISPLAY_PER_ROW >= word.imagesArray.length,
        atBeginning : nextIndex === 0,
        chosenIndex : null,
        displayedImages : createDisplayedImages(word.imagesArray, nextIndex)      
      }};

      return nextState;

    case 'prevBatch':
      var wordIndex = action.payload;
      var word = state[wordIndex];  
      if (word.atBeginning) {
        return state;
      }

      var nextState = state.slice();
      var nextIndex = Math.max(nextState[wordIndex].atIndex - DISPLAY_PER_ROW, 0)

      nextState[wordIndex] = {...word, ...{
        atIndex : nextIndex,
        atEnd : nextIndex + DISPLAY_PER_ROW >= word.imagesArray.length,
        atBeginning : nextIndex === 0,
        chosenIndex : null,
        displayedImages : createDisplayedImages(word.imagesArray, nextIndex)      
      }};

      return nextState;

    case 'imageSelected':
      var newState = state.slice();
      var { wordIndex, imageIndex } = action.payload;
      var previousSelection = newState[wordIndex].chosenIndex || 0;
      newState[wordIndex].displayedImages[previousSelection].selected = false;
      newState[wordIndex].chosenIndex = imageIndex;
      newState[wordIndex].displayedImages[imageIndex].selected = true;

      return newState;


    case 'produceVideo':
      let { videoURL } = action.payload;
      let updatedState = Object.assign({}, state, {
        videoURL
      }); 
      return updatedState;

    default:
      return state
  }    
};




