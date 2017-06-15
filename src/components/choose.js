import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

export class Choose extends Component {
  render() {
    return (
      <div>
      {this.props.words.map((word, i) => {
        return (
          <span
          className={`wordSelected-${word.selected}`} 
          key={i}
          onClick={() => this.props.wordClick(i)}
          >
          {word.text}
          {' '}
          </span>)
      })}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    wordClick: i => {
      dispatch(actions.wordClick(i))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    words: state.input.wordsArray
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Choose);

