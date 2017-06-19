import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Link } from 'react-router-dom';


export class Choose extends Component {
  constructor(props) {
    super()
    this.state = {
      displayError: false
    }

    this.validate = this.validate.bind(this);    
  }

  validate() {
    let { wordsRemaining, history } = this.props

    if (wordsRemaining) {
      this.setState({
        displayError: true
      })
      setTimeout(() => {
        this.setState({
          displayError: false
        })
      }, 1500)

    } else {
      history.push('/media');
    }
  }


  componentWillMount(){
    if (!this.props.words.length) {
     this.props.history.push('/');
     return;
    }    
  }

  render() {
    const { wordClick, words } = this.props;

    return (
      <div className="choose-container app-interior-container">
        <div className={`tapInstructions${this.state.displayError ? '-error' : ''}`}>Tap five keywords </div>
        <div className="chooseBox inner-content">
        {words.map((word, i) => {
          return (
            <span key={i}>
            <span className={`wordSelected-${word.selected}`} onClick={() => wordClick(i)} >
              {word.text}
            </span>
            <span>{' '}</span>
            </span>
          )
        })}
        </div>
        <div className="nextLink">
          <Link className="backLink" to='/'> {'< BACK '} </Link>
          <span onClick={this.validate}> NEXT > </span>
        </div>
        

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    wordClick: (i) => {
      dispatch(actions.wordClick(i))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    words: state.input.wordsArray,
    wordsRemaining: state.input.wordsRemaining
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Choose);

