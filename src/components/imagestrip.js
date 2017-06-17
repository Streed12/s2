import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import Choose from './choose'


const ImageStrip = ({ wordIndex, nextBatch, prevBatch, selectClick, word}) => {
    return (
      <div className='image-strip'>
        <div className="image-word"> { word.string } </div>
        <div className='image-scroll'>
          {!word.atBeginning && <div className='image-scroll-true' onClick={() => prevBatch(wordIndex)}> {`<`} </div>}
        </div>
        <div className="images-row">
        
        <div className="images-container">
          {word.displayedImages.map((image, idx) => {
            return(
                <img 
                  key={idx}
                  src={image.url} 
                  className={`image imageSelected-${image.selected}`}
                  onClick={() => selectClick(wordIndex, idx)} />
            )
          })}
        </div>
        <div className='image-scroll'> 
          {!word.atEnd && <div className='image-scroll-true' onClick={() => nextBatch(wordIndex)}> {`>`} </div>}
        </div>
        </div>
      </div>
    )
}



export default ImageStrip
