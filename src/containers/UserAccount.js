import React, { Component } from 'react';
import NewsFeed from '../components/NewsFeed'

class UserAccount extends Component {


  render() {

    return (
      <div id="user-container">
      {
        this.props.isLoggedIn ?
        <h1>hello</h1>
        :
        <NewsFeed newsFeed={this.props.newsFeed}/>
      }
      </div>
    );
  }

}

export default UserAccount;
