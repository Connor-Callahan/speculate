import React from 'react';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const Navbar = (props) => {

    const navShow = props.loggedIn ? 'show' : 'hide';
    return (
      <div id={`navbar-${navShow}`}>
        {
          props.loggedIn ?
          <h1 >Speculate.</h1>
          :
          <div id="hide-menu">
          <h1 id="hide-header">Speculate.</h1>
            <div id="hide-btns">
              <button className="login-btn">Login</button>
              <button className="login-btn" id="hide-create">Create Account</button>
            </div>
          </div>
        }

      </div>
    );
  }

export default connect(mapStateToProps)(Navbar)
