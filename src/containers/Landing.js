import React from 'react';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const Landing = (props) => {

    return (
      <div >
        {
          props.loggedIn ?
          null
          :
          <div id="landing">
          <h1 id="landing-header">Speculate.</h1>
          <hr></hr>
          <p id="landing-paragraph">An application to simulate trading shares of companies listed on the U.S. Stock Exchange. Create an account to start adding virtual orders and tracking trades. Use the search bar to locate a company profile or browse by market sector.</p>
          </div>
        }

      </div>
    );
  }

export default connect(mapStateToProps)(Landing)
