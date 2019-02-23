import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (login) => dispatch( {type:'HANDLE_USER_LOGIN', payload:login}),
    handleUsername: (username) => dispatch( {type: 'HANDLE_USERNAME', payload:username}),
    handlePassword: (password) => dispatch( {type: 'HANDLE_PASSWORD', payload:password})
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    username: state.username,
    password: state.password
  }
}

class LoginForm extends Component {

  handleLogin = (e) => {
    this.props.login ?
    this.props.handleLogin(false) : this.props.handleLogin(true)
  }

  submitLogin = async(e) => {
    e.preventDefault()
    let allUsernames = await fetch(`http://localhost:3000/api/v1/users/`)
    .then(r => r.json())
    console.log(allUsernames)

    let currentUser = allUsernames.find(user => {
      return user.username === this.props.username
    })
    if(currentUser) {
      this.props.handleUsername(currentUser.username)
      this.props.handlePassword(currentUser.password)
      this.props.handleLogin(false)
    } else {
      alert('Username /or login incorrect, please try again.')
    }
  }

  handleFormInput = (e) => {
    let input = e.target.id
    switch(input) {
      case 'username' :
      return this.props.handleUsername(e.target.value)
      case 'password' :
      return this.props.handlePassword(e.target.value)
    }

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

        </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
