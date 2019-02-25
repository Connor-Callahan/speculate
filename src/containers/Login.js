import React, { Component } from 'react';
import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (login) => dispatch( {type:'HANDLE_USER_LOGIN', payload:login})
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    username: state.username,
    loggedIn: state.loggedIn,
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
    return (
      <div id="user-login">
      {
        this.props.login && this.props.loggedIn === false ?
        <LoginForm fetchTransactions={this.props.fetchTransactions}/>
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
