import React, { Component } from 'react';
import {connect} from 'react-redux'

import { setLogin} from '../actions'


const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (login) => dispatch(setLogin(login)),
  }
}


class Landing extends Component {

  handleLogin = (e) => {
    this.props.setLogin(true)
  }

  render() {
    return (
      <div >
      {
        this.props.loggedIn ?
        null
        :
        <div>
        <p id="landing-header">A simulation built to trade stocks.</p>
        <p id="landing-paragraph">Gain data and insights into markets without risk. Create a free account now to get started.</p>
        <button id="start-btn" onClick={this.handleLogin}>Get Started</button>
        </div>
      }

      </div>
    );
  }

  }

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
