import React from 'react';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const Navbar = (props) => {

    return (
      <div id="navbar">
        {
          props.loggedIn ?
          <h1 id="nav-header">Speculate.</h1>
          :
          <h1>Butthole</h1>
        }

      </div>
    );
  }

export default connect(mapStateToProps)(Navbar)
