import React from 'react';
import {connect} from 'react-redux'
import Login from './/Login'


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
          <div>
          <h1 id="show-header">Speculate.</h1>
            <ul id="nav-list">
              <li>Home</li>
              <li>Dashboard</li>
              <li>Contact</li>
              <li>Credits</li>
            </ul>
          </div>
          :
          <div id="hide-menu">
          <h1 id="hide-header">Speculate.</h1>
            <Login id="hide-btns"/>
          </div>
        }

      </div>
    );
  }

export default connect(mapStateToProps)(Navbar)
