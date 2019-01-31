import React from 'react';

const LoginForm = (props) => {
    return (
      <div>
      {
        props.loginContainer &&
        <form id="login-container">
          <label for="user_ame">username : </label>
          <input onChange={props.handleFormInput} type="text" id="username"/>
          <br></br>
          <label for="password">password : </label>
          <input onChange={props.handleFormInput} type="text" id="password"/>
          <br></br>
          <button>Login</button>
          <button className="close-button" onClick={props.toggleLoginDisplay}>close</button>
        </form>
      }
      </div>
    );
}

export default LoginForm;
