import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import Choose from './choose'

export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      displayError: false
    }

    this.validate = this.validate.bind(this);
  }

  validate() {
    const { history, buttonClick } = this.props;
    const { string } = this.props.state;

    if (string.split(' ').length < 5) {
      this.setState({
        displayError: true
      })
      setTimeout(() => {
        this.setState({
          displayError: false
        })
      }, 2000)

    } else {
      buttonClick(history)
    }
  }

  render() {

    const { textChange, history, buttonClick } = this.props;
    const { string, charactersRemaining } = this.props.state;

    return (
      <div className="app-interior-container">
        <form className="inner-content">
          <div className="inputArea">
            <textarea onChange={ textChange } value={ string } />
            <div className="inputInfo">
              <span className="formValidation">{this.state.displayError ? "Please input at least five words" : ""}</span>
              <span className="charsRemaining"> { charactersRemaining } </span>
            </div>
          </div>
        </form>
        <div className="nextLink">
          <span onClick={this.validate}> NEXT > </span>
        </div>
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

