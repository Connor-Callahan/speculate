import React, { Component } from 'react';
import NewsFeed from '../components/NewsFeed'

class UserAccount extends Component {


  render() {

    return (
      <div id="user-container">
      {
        this.props.isLoggedIn  ?
        
        this.props.transactions.map(transaction => {
          return <tr>
          <td>{transaction.stock_symbol}</td>
          </tr>
        })
        :
        <NewsFeed newsFeed={this.props.newsFeed}/>
      }
      </div>
    );
  }

}

export default UserAccount;
