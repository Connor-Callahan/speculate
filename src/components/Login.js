import React, { Component } from 'react';
import {connect} from 'react-redux'
import LoginForm from '../containers/LoginForm'

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (login) => dispatch( {type:'HANDLE_USER_LOGIN', payload:login})
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

class Login extends Component {

  handleLogin = (e) => {
    this.props.login ?
    this.props.handleLogin(false)
    :
    this.props.handleLogin(true)
  }

  render() {
    console.log(this.props.login)
    return (
      <div id="user-login">
      {
        this.props.login ?
        <LoginForm />
        :
        <button
        id="login-button"
        onClick={this.handleLogin}>
        Login/Create Account
        </button>
      }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
