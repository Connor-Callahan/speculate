import React, { Component } from 'react';
import {connect} from 'react-redux'
import CreateForm from './CreateForm'

import { setLogin, setLogout, setUsername, setPassword, setFirstname, setLastname, setUserID, setBalance} from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (login) => dispatch(setLogin(login)),
    setUsername: (username) => dispatch(setUsername(username)),
    setPassword: (password) => dispatch(setPassword(password)),
    setFirstname: (firstname) => dispatch(setFirstname(firstname)),
    setLastname: (lastname) => dispatch(setLastname(lastname)),
    setUserID: (id) => dispatch(setUserID(id)),
    setBalance: (balance) => dispatch(setBalance(balance)),
    setLogout: (login) => dispatch(setLogout(login))
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.user.login,
    createForm: state.user.createForm,
    username: state.user.username,
    password: state.user.password,
    loggedIn: state.user.loggedIn,
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    balance: state.user.balance,
    id: state.user.id
  }
}

class LoginForm extends Component {

  handleFormInput = (e) => {
    let input = e.target.id
    switch(input) {
      case 'username' :
      return this.props.setUsername(e.target.value)
      case 'password' :
      return this.props.setPassword(e.target.value)
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
    this.props.setLogin(false) : this.props.setLogin(true)
  }

  submitLogin = async(e) => {
    e.preventDefault()
    let allUsernames = await fetch(`https://speculate-app-api.herokuapp.com/api/v1/users/`)
    .then(r => r.json())

    let currentUser = allUsernames.find(user => {
      return user.username === this.props.username
    })
    if(currentUser) {
      this.props.setUsername(currentUser.username)
      this.props.setPassword(currentUser.password)
      this.props.setFirstname(currentUser.first_name)
      this.props.setLastname(currentUser.last_name)
      this.props.setBalance(currentUser.balance)
      this.props.setUserID(currentUser.id)
      this.props.setLogin(false)
      this.props.setLogout(true)
    } else {
      alert('Username /or login incorrect, please try again.')
    }
  }

  createAccount = (e) => {
    e.preventDefault()
    fetch('https://speculate-app-api.herokuapp.com/api/v1/users/', {
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
      this.props.setLogin(true)
      this.props.setLogout(true)
    })
  }



  render() {

    return (
      <div className="login-container">
      {
        this.props.createForm ?
        <CreateForm />
        :
        <div>
          <h1 id="close-login" onClick={this.handleLogin}>Speculate.</h1>
            <form className="login-form" autoComplete="off" onChange={this.handleFormInput}>
              <input className="login-input"  type="text" id="username" placeholder="Username"/>
                <br></br>
              <input className="login-input"  type="password" id="password" placeholder="Password"/>
                <br></br>
              <button onClick={this.submitLogin} className="form-button">Login</button>
            </form>
            <p id="signup">Don't have a Speculate account yet? Sign up now.</p>
          </div>
      }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
