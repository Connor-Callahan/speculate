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
    login: state.login
  }
}

class LoginForm extends Component {

  handleLogin = (e) => {
    this.props.login ?
    this.props.handleLogin(false) : this.props.handleLogin(true)
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
            <button className="form-button">Login</button>
          </form>

        </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
