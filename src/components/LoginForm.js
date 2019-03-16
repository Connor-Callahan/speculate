import React, { Component } from 'react';
import {connect} from 'react-redux'

import { loginUser, setUsername, setPassword, setFirstname, setLastname, setUserID, setBalance, loggedIn} from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
    setUsername: (username) => dispatch(setUsername(username)),
    handlePassword: (password) => dispatch(setPassword(password)),
    setFirstname: (firstname) => dispatch(setFirstname(firstname)),
    setLastname: (lastname) => dispatch(setLastname(lastname)),
    setUserID: (id) => dispatch(setUserID(id)),
    setBalance: (balance) => dispatch(setBalance(balance)),
    loggedIn: (login) => dispatch(loggedIn(login)),
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    username: state.username,
    password: state.password,
    loggedIn: state.loggedIn,
    firstname: state.firstname,
    lastname: state.lastname,
    balance: state.balance,
    id: state.id
  }
}

class LoginForm extends Component {

  handleFormInput = (e) => {
    let input = e.target.id
    switch(input) {
      case 'username' :
      return this.props.handleUsername(e.target.value)
      case 'password' :
      return this.props.handlePassword(e.target.value)
      case 'balance' :
      return this.props.setBalance(e.target.value)
      case 'firstname' :
      return this.props.setFirstname(e.target.value)
      case 'lastname' :
      return this.props.setLastname(e.target.value)
      default:
    }
  }

  handleLogin = (e) => {
    this.props.login ?
    this.props.handleLogin(false) : this.props.handleLogin(true)
  }

  submitLogin = async(e) => {
    e.preventDefault()
    let allUsernames = await fetch(`http://localhost:3000/api/v1/users/`)
    .then(r => r.json())

    let currentUser = allUsernames.find(user => {
      return user.username === this.props.username
    })
    if(currentUser) {
      this.props.handleUsername(currentUser.username)
      this.props.handlePassword(currentUser.password)
      this.props.setFirstname(currentUser.first_name)
      this.props.setLastname(currentUser.last_name)
      this.props.setBalance(currentUser.balance)
      this.props.setUserID(currentUser.id)
      this.props.handlePassword(currentUser.user_id)
      this.props.handleLogin(false)
      this.props.loggedIn(true)
    } else {
      alert('Username /or login incorrect, please try again.')
    }
  }

  createAccount = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        first_name: this.props.firstname,
        last_name: this.props.lastname,
        username: this.props.username,
        password: this.props.password,
        balance: this.props.balance
      })
    }, this.setState({
      isLoggedIn: true,
      loginContainer: false
    }))
    .then(r => r.json())
    .then(data => {
      this.props.setUserID(data.id)
      this.props.handleLogin(false)
      this.props.loggedIn(false)
    })
  }

  render() {
    return (
      <div id="login-container">
        <button id="close-login" onClick={this.handleLogin}>𝖷</button>
          <form id="login-form" autoComplete="off" onChange={this.handleFormInput}>
            <label htmlFor="user_name">username : </label>
            <input className="login-input"  type="text" id="username"/>
              <br></br>
            <label htmlFor="password">password : </label>
            <input className="login-input"  type="password" id="password"/>
              <br></br>
            <button onClick={this.submitLogin} className="form-button">Login</button>
          </form>

          <form id="create-login-form"
          autoComplete="off"
          onChange={this.handleFormInput} >
            <label htmlFor="firstname">first name : </label>
            <input className="login-input" type="text" id="firstname"/>
              <br></br>
            <label htmlFor="lastname">last name : </label>
            <input className="login-input" type="text" id="lastname"/>
              <br></br>
            <label htmlFor="username">username : </label>
            <input className="login-input" type="text" id="username"/>
              <br></br>
            <label htmlFor="password">password : </label>
            <input className="login-input" type="password" id="password"/>
              <br></br>
            <label htmlFor="balance">balance : </label>
            <input className="login-input" type="number" id="balance"/>
              <br></br>
          <button className="form-button" onClick={this.createAccount}>Submit</button>
          </form>

        </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
