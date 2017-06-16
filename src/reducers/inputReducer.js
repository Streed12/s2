const MAX_CHARACTERS = 140;
const MAX_SELECTED_WORDS = 5;

const initialInputState = {
  string: '',
  charactersRemaining: MAX_CHARACTERS,
  wordsArray: [],
  wordsRemaining: MAX_SELECTED_WORDS
};


export default function inputReducer(state = initialInputState, action) {
  switch (action.type) {

    case 'inputTextChange':
      const newString = action.payload.slice(0, MAX_CHARACTERS);

      return Object.assign({}, state, {
        string: newString, 
        charactersRemaining: MAX_CHARACTERS - newString.length
      })

    case 'inputButtonClick':
      return Object.assign({}, state, {
        wordsArray: state.string.split(' ').map(word => {
          return { text: word, selected: false}
        })
      })

    case 'toggleChosen':
      let toggledIndex = action.payload;
      let isToggledOn = state.wordsArray[toggledIndex].selected;

      if (!state.wordsRemaining && !isToggledOn) {
        return state;
      }

      let newWordsArray = state.wordsArray.slice();
      newWordsArray[toggledIndex].selected = !isToggledOn;


      return Object.assign({}, state, {
        wordsArray: newWordsArray,
        wordsRemaining: state.wordsRemaining + (isToggledOn ? +1 : -1)
      })

    default:
      return state
  }    
};