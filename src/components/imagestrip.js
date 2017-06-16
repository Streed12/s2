import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import Choose from './choose'


const ImageStrip = ({ wordIndex, nextBatch, prevBatch, selectClick, word}) => {
    return (
      <div>
        {!word.atBeginning && <button onClick={() => prevBatch(wordIndex)}> Prev </button>}
        { word.string }
        {word.displayedImages.map((image, idx) => {
          return(
            <div key={idx}>
              <img 
                src={image.url} 
                className={`imageSelected-${image.selected}`}
                onClick={() => selectClick(wordIndex, idx)} />
            </div>
          )
        })}
        {!word.atEnd && <button onClick={() => nextBatch(wordIndex)}> Next </button>}

      </div>
    )
}



export default ImageStrip
