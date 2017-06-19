import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Route } from 'react-router-dom';
import getGiphy from '../media/giphy'
import ImageStrip from './imagestrip'
import { Link } from 'react-router-dom';



export class Media extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    if (!this.props.searchTerms.length) {
     this.props.history.push('/');
     return;
    }    

    let { loadImages, searchTerms } = this.props;
    loadImages(searchTerms);
  }


  render() {
    const { nextBatch, prevBatch, words, selectClick } = this.props

    return (
      <div className="media-container">
      <div className="media-inner-container inner-content">
      {words.map((word, idx) => {
        return (
          <ImageStrip 
            key={idx}
            wordIndex={idx}
            word={word} 
            nextBatch={nextBatch}
            prevBatch={prevBatch}
            selectClick={selectClick}
          />
        )
      })}
      </div>
      <div className="nextLink">
        <span> NEXT </span>
      </div>
      <Link className="backLink" to='/choose'> {'< BACK '} </Link>

      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadImages: searchTerm => {
      dispatch(actions.loadImages(searchTerm))
    },
    nextBatch: idx => {
      dispatch(actions.nextBatch(idx))
    },
    prevBatch: idx => {
      dispatch(actions.prevBatch(idx))
    },
    selectClick: (wordIndex, imageIndex) => {
      dispatch(actions.selectClick(wordIndex, imageIndex))
    },
  }
};

const filterSelectedWords = (wordsArray) => {
  return wordsArray.filter(word => word.selected)
                   .map(word => word.text);
};


const mapStateToProps = (state) => {
  return {
    searchTerms: filterSelectedWords(state.input.wordsArray),
    words: state.images
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Media);

