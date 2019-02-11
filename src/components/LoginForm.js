import React from 'react';

const LoginForm = (props) => {
    return (
      <div>
      {
        props.loginContainer &&
        <div id="login-container">
        <button id="close-login" onClick={props.toggleLoginDisplay}>𝖷</button>
          <form id="login-form"
          autoComplete="off"
          onChange={props.handleFormInput}>
            <label htmlFor="user_name">username : </label>
            <input className="login-input" onChange={props.handleFormInput} type="text" id="username"/>
              <br></br>
            <label htmlFor="password">password : </label>
            <input className="login-input" onChange={props.handleFormInput} type="password" id="password"/>
              <br></br>
            <button className="form-button" onClick={props.loginAccount}>Login</button>
          </form>

          <form id="create-login-form"
          autoComplete="off"
          onChange={props.handleFormInput} >
            <label htmlFor="firstname">first name : </label>
            <input className="login-input" onChange={props.handleFormInput} type="text" id="firstname"/>
              <br></br>
            <label htmlFor="lastname">last name : </label>
            <input className="login-input" onChange={props.handleFormInput} type="text" id="lastname"/>
              <br></br>
            <label htmlFor="username">username : </label>
            <input className="login-input" onChange={props.handleFormInput} type="text" id="username"/>
              <br></br>
            <label htmlFor="password">password : </label>
            <input className="login-input" onChange={props.handleFormInput} type="password" id="password"/>
              <br></br>
            <label htmlFor="balance">balance : </label>
            <input className="login-input" onChange={props.handleFormInput} type="number" id="balance"/>
              <br></br>
          <button className="form-button" onClick={props.createAccount}>Submit</button>
          </form>
        </div>
      }
      </div>
    );
}

export default LoginForm;
