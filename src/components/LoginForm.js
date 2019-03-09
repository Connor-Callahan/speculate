import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (login) => dispatch( {type:'HANDLE_USER_LOGIN', payload:login}),
    handleUsername: (username) => dispatch( {type: 'HANDLE_USERNAME', payload:username}),
    handlePassword: (password) => dispatch( {type: 'HANDLE_PASSWORD', payload:password}),
    handleFirstName: (firstname) => dispatch( {type: 'HANDLE_FIRST_NAME', payload:firstname}),
    handleLastName: (lastname) => dispatch( {type: 'HANDLE_LAST_NAME', payload:lastname}),
    handleUserID: (id) => dispatch( {type: 'HANDLE_USER_ID', payload:id}),
    handleBalance: (balance) => dispatch( {type: 'HANDLE_USER_BALANCE', payload:balance}),
    handleLoggedIn: (login) => dispatch( {type: 'HANDLE_LOGGED_IN', payload:login}),
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
      return this.props.handleBalance(e.target.value)
      case 'firstname' :
      return this.props.handleFirstName(e.target.value)
      case 'lastname' :
      return this.props.handleLastName(e.target.value)
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
      this.props.handleFirstName(currentUser.first_name)
      this.props.handleLastName(currentUser.last_name)
      this.props.handleBalance(currentUser.balance)
      this.props.handleUserID(currentUser.id)
      this.props.handlePassword(currentUser.user_id)
      this.props.handleLogin(false)
      this.props.handleLoggedIn(true)
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
      this.props.handleUserID(data.id)
      this.props.handleLogin(false)
      this.props.handleLoggedIn(false)
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
