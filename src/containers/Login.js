import React, { Component } from 'react';
import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'

import { setLogin, setUsername, setPassword, setFirstname, setLastname, setUserID, setBalance, fetchTransactions} from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (login) => dispatch(setLogin(login)),
    setUsername: (username) => dispatch(setUsername(username)),
    setPassword: (password) => dispatch(setPassword(password)),
    setFirstname: (firstname) => dispatch(setFirstname(firstname)),
    setLastname: (lastname) => dispatch(setLastname(lastname)),
    setUserID: (id) => dispatch(setUserID(id)),
    setBalance: (balance) => dispatch(setBalance(balance)),
    fetchTransactions: (transactions) => dispatch(fetchTransactions(transactions))
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
    this.props.setLogin(false)
    :
    this.props.setLogin(true)
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
    this.props.setLogin(false)
    this.props.logout(false)
    this.props.handleUsername(null)
    this.props.handlePassword(null)
    this.props.handleFirstName(null)
    this.props.handleLastName(null)
    this.props.handleBalance(null)
    this.props.handleUserID(null)
    this.props.handlePassword(null)
    this.props.handleLoggedIn(false)
    this.props.handleTransactions([])
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


// import { setLogin, loggedIn, setUsername, setPassword, setFirstname, setLastname, setUserID, setBalance, fetchTransactions} from '../actions'
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setLogin: (login) => dispatch(setLogin(login)),
//     logout: (logout) => dispatch(loggedIn(logout)),
//     loggedIn: (login) => dispatch(loggedIn(login)),
//     setUsername: (username) => dispatch(setUsername(username)),
//     setPassword: (password) => dispatch(setPassword(password)),
//     setFirstname: (firstname) => dispatch(setFirstname(firstname)),
//     setLastname: (lastname) => dispatch(setLastname(lastname)),
//     setUserID: (id) => dispatch(setUserID(id)),
//     setBalance: (balance) => dispatch(setBalance(balance)),
//     fetchTransactions: (transactions) => dispatch(fetchTransactions(transactions))
//   }
// }
