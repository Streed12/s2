const maxCharacters = 150;

const initialInputState = {
  string: '',
  charactersRemaining: maxCharacters,
  wordsArray: [],
  selectedIndices: new Set(),
  selectedWords: []
};


export default function inputReducer(state = initialInputState, action) {
  switch (action.type) {

    case 'inputTextChange':
      const newString = action.payload.slice(0, maxCharacters);

      return Object.assign({}, state, {
        string: newString, 
        charactersRemaining: maxCharacters - newString.length
      })

    case 'inputButtonClick':
      return Object.assign({}, state, {
        wordsArray: state.string.split(' ').map(word => {
          return { text: word, selected: false}
        })
      })

    case 'toggleChosen':
      let newWordsArray = state.wordsArray.slice();
      let toggledIndex = action.payload;
      newWordsArray[toggledIndex].selected = !newWordsArray[toggledIndex].selected;

      return Object.assign({}, state, {
        wordsArray: newWordsArray
      })

    default:
      return state
  }    
};