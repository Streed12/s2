import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import Choose from './choose'
import { Route } from 'react-router-dom';


export class App extends Component {
  render() {
    return (
      <div>
        <h1> dope </h1>
        <form>
          <textarea onChange={this.props.textChange} value={this.props.state.string} />
          {this.props.state.charactersRemaining} characters remaining
          <button onClick={(e) => this.props.buttonClick(e, this.props.history)}> submit </button>
        </form>
        <Route path="/choose" component={Choose}/>
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

