import { combineReducers } from 'redux';
import input from './inputReducer';
import images from './imagesReducer';

const rootReducer = combineReducers({
  input, images
});

export default rootReducer;
