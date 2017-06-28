import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

export class SpunVideo extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.words.length) {
     this.props.history.push('/');
     return;
    }    
  }
  render() {
    const { videoURL } = this.props;

    return (
      <div className="media-container">
      <div className="media-inner-container inner-content">
        <div>
          <span>{videoURL || 'isLoading'}</span>
        </div> 
      </div>
      <div className="nextLink">
      <Link className="backLink" to='/choose'> {'< BACK '} </Link>
        <span> NEXT > </span>
      </div>

      </div>
    );
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    generateVideo: (images) => {
      dispatch(actions.generateVideo(images))
    }
  }
};


const mapStateToProps = (state) => {
  return {
    images: state.images,
    videoURL: state.images.videoURL,
    words: state.input.wordsArray
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpunVideo);