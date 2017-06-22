import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Route } from 'react-router-dom';
import getGiphy from '../media/giphy'
import ImageStrip from './imagestrip'
import { Link } from 'react-router-dom';



export class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayError: false
    }
    this.validateSelections = this.validateSelections.bind(this)
  }


  componentWillMount() {
    if (!this.props.searchTerms.length) {
     this.props.history.push('/');
     return;
    }    

    let { loadImages, searchTerms } = this.props;
    loadImages(searchTerms);
  }

  validateSelections() {
    let { words, generateVideo, history } = this.props;

    if(Object.keys(words).length !== 5){
      this.setState({
        displayError: true
      })
      setTimeout(() => {
        this.setState({
          displayError: false
        })
      }, 1500)
    } else {
      this.props.generateVideo(words);
      history.push('/spunVideo')
    }
  }

  render() {
    const { nextBatch, prevBatch, words, selectClick } = this.props;

    return (
      <div className="media-container">
      <div className={`tapInstructions${this.state.displayError ? '-error' : ''}`}>Select five gifs</div>
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
      <Link className="backLink" to='/choose'> {'< BACK '} </Link>
        <span onClick={this.validateSelections}> NEXT > </span>
      </div>

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
    generateVideo: (images) => {
      dispatch(actions.generateVideo(images))
    }
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

