import React, { Component } from 'react';
import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (login) => dispatch( {type:'HANDLE_USER_LOGIN', payload:login}),
    logout: (logout) => dispatch( {type:'HANDLE_LOGGED_IN', payload:logout}),
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    username: state.username,
    loggedIn: state.loggedIn,
    balance: state.balance,
    id: state.id
  }
}

class Login extends Component {

// open and close the form to login or create an account -> loginForm comp closes with login state change
  handleLogin = (e) => {
    this.props.login ?
    this.props.handleLogin(false)
    :
    this.props.handleLogin(true)
  }

// change login state and loggedIn (div to login and button to logout) -> patch balance to user table on logout
  handleLogout = (e) => {
    fetch(`http://localhost:3000/api/v1/users/${this.props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        balance: this.props.balance
      })
    })
    this.props.handleLogin(false)
    this.props.logout(false)
  }

  render() {
    return (
      <div id="user-login">
      {
        this.props.login && this.props.loggedIn === false ?
        <LoginForm fetchTransactions={this.props.fetchTransactions}/>
        :
        null
      }
      {
        this.props.loggedIn ?
        <button
        id="login-button"
        onClick={this.handleLogout}>
        Logout
        </button>
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
