import React, { Component } from 'react';
import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (login) => dispatch( {type:'HANDLE_USER_LOGIN', payload:login}),
    logout: (logout) => dispatch( {type:'HANDLE_LOGGED_IN', payload:logout}),
    handleUsername: (username) => dispatch( {type: 'HANDLE_USERNAME', payload:username}),
    handlePassword: (password) => dispatch( {type: 'HANDLE_PASSWORD', payload:password}),
    handleFirstName: (firstname) => dispatch( {type: 'HANDLE_FIRST_NAME', payload:firstname}),
    handleLastName: (lastname) => dispatch( {type: 'HANDLE_LAST_NAME', payload:lastname}),
    handleUserID: (id) => dispatch( {type: 'HANDLE_USER_ID', payload:id}),
    handleBalance: (balance) => dispatch( {type: 'HANDLE_USER_BALANCE', payload:balance}),
    handleLoggedIn: (login) => dispatch( {type: 'HANDLE_LOGGED_IN', payload:login}),
    fetchTransactions: (transactions) => dispatch( {type:'FETCH_TRANSACTIONS', payload:transactions})
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
    console.log('fuck')
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
    this.props.handleUsername(null)
    this.props.handlePassword(null)
    this.props.handleFirstName(null)
    this.props.handleLastName(null)
    this.props.handleBalance(null)
    this.props.handleUserID(null)
    this.props.handlePassword(null)
    this.props.handleLoggedIn(false)
    this.props.fetchTransactions([])

  }

  render() {
    return (
      <div id="user-login">
      {
        this.props.login && this.props.loggedIn === false ?
        <LoginForm />
        :
        null
      }
      {
        this.props.loggedIn ?
        <button
        id="logout-button"
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
