import React from 'react';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const Landing = (props) => {

    return (
      <div >
        {
          props.loggedIn ?
          null
          :
          <div>
          <p id="landing-header">A simulation built to trade stocks.</p>
            <p id="landing-paragraph">Use data in real time from IEX's cloud API to create a mock portfolio of shares.</p>
          <button id="start-btn">Get Started</button>
          </div>
        }

      </div>
    );
  }

export default connect(mapStateToProps)(Landing)
