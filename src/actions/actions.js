function inputTextChange(e) {
  e.preventDefault();
  return {
    type: 'inputTextChange',
    payload: e.target.value
  }
}

function inputButtonClick(e, history) {

  e.preventDefault();
  history.push('/choose');

  return {
    type: 'inputButtonClick'
  }
}

function wordClick(idx) {
  console.log(idx)

  return {
    type: 'toggleChosen',
    payload: idx
  }
}

export { inputTextChange, inputButtonClick, wordClick };