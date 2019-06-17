import React, { Component } from 'react';
import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'

import { setLogin, createForm, setLogout, setUsername, setPassword, setFirstname, setLastname, setUserID, setBalance, fetchTransactions} from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (login) => dispatch(setLogin(login)),
    createForm: (form) => dispatch(createForm(form)),
    setUsername: (username) => dispatch(setUsername(username)),
    setPassword: (password) => dispatch(setPassword(password)),
    setFirstname: (firstname) => dispatch(setFirstname(firstname)),
    setLastname: (lastname) => dispatch(setLastname(lastname)),
    setUserID: (id) => dispatch(setUserID(id)),
    setBalance: (balance) => dispatch(setBalance(balance)),
    fetchTransactions: (transactions) => dispatch(fetchTransactions(transactions)),
    setLogout: (login) => dispatch(setLogout(login))
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.user.login,
    createForm: state.user.createForm,
    username: state.user.username,
    loggedIn: state.user.loggedIn,
    balance: state.user.balance,
    id: state.user.id
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

  handleCreate = (e) => {
    this.props.login ?
    this.props.createForm(false)
    :
    this.props.createForm(true)
  }

    // change login state and loggedIn (div to login and button to logout) -> patch balance to user table on logout
    handleLogout = (e) => {
      fetch(`https://speculate-app-api.herokuapp.com/api/v1/users/${this.props.id}`, {
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
      this.props.setUsername(null)
      this.props.setPassword(null)
      this.props.setFirstname(null)
      this.props.setLastname(null)
      this.props.setBalance(null)
      this.props.setUserID(null)
      this.props.setPassword(null)
      this.props.setLogout(false)
      this.props.fetchTransactions([])
    }


  render() {
    return (
      <div id="login-btns">
      {
        this.props.loggedIn ?
        <button
        className="login-btn"
        onClick={this.handleLogout}>
        Logout
        </button>
        :

        <div>
          <button onClick={this.handleLogin} id="login" className="login-btn">Login</button>
          <button onClick={this.handleCreate} className="login-btn" id="hide-create">Create Account</button>
        </div>
      }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
