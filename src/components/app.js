import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import Choose from './choose'


export class App extends Component {
  render() {

    const { textChange, history, buttonClick } = this.props;
    const { string, charactersRemaining } = this.props.state;

    return (
      <div>
        <h1> dope </h1>
        <form>
          <textarea onChange={ textChange } value={ string } />
          { charactersRemaining } characters remaining
          <button onClick={(e) => buttonClick(e, history)}> submit </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    textChange: (e) => {
      dispatch(actions.inputTextChange(e))
    },
    buttonClick: (e, history) => {
      dispatch(actions.inputButtonClick(e, history))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.input
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);

