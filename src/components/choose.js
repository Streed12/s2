import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Link } from 'react-router-dom';


export class Choose extends Component {
  render() {
    const { wordClick, wordsRemaining, words } = this.props;

    return (
      <div>
        <div>
        {words.map((word, i) => {
          return (
            <span className={`wordSelected-${word.selected}`} key={i} onClick={() => wordClick(i)} >
              {word.text}
              {' '}
            </span>
          )
        })}
        </div>

        <div> {`${wordsRemaining} words remaining`} </div>
        <Link to='/media'> Next </Link>
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

