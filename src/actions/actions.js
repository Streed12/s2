// import getGiphy from '../media/giphy'

// const inputTextChange = (e) => {
//   e.preventDefault();
//   return {
//     type: 'inputTextChange',
//     payload: e.target.value
//   };
// };

// const inputButtonClick = (history) => {

//   history.push('/choose');

//   return {
//     type: 'inputButtonClick'
//   };
// };

// const wordClick = (idx) => {
//   return {
//     type: 'toggleChosen',
//     payload: idx
//   };
// };

// const loadImages = words => async dispatch => {
//   let promises = words.map(word => getGiphy(word));
//   let imageData = await Promise.all(promises);
  
//   dispatch({
//     type: 'createImageState',
//     payload: imageData
//   });
// }

// const nextBatch = (idx) => {
//   return {
//     type: 'nextBatch',
//     payload: idx
//   };
// };

// const prevBatch = (idx) => {
//   return {
//     type: 'prevBatch',
//     payload: idx
//   };
// };

// const selectClick = (wordIndex, imageIndex) => {
//   return {
//     type: 'imageSelected',
//     payload: {
//       wordIndex, imageIndex
//     }
//   }
// };

// export { inputTextChange, inputButtonClick, wordClick, 
//          loadImages, nextBatch, prevBatch, selectClick };

let a = { one: 1, two : { three: 3 }}
let b = Object.assign({}, a)
var obj = Object.create({ foo: 1 }, { // foo is on obj's prototype chain.
  bar: {
    value: 2  // bar is a non-enumerable property.
  },
  baz: {
    value: 3,
    enumerable: true  // baz is an own enumerable property.
  }
});
console.log(b)
console.log(obj)
