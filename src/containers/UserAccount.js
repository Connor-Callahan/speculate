import React from 'react';
import {connect} from 'react-redux'
import NewsFeed from '../components/NewsFeed'
import TransactionsTable from './TransactionsTable'


const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    balance: state.balance,
    transactions: state.transactions
  }
}

const UserAccount = (props) => {

  return <div id="user-container">
          {
            props.loggedIn ?
            <div>
            {
              props.transactions.length > 0 ?
              <div>
              <TransactionsTable />
              </div>
              :
              <p>shit</p>
            }
            </div>

            :
            <div>
            <NewsFeed />
            </div>
          }
        </div>
}


export default connect(mapStateToProps)(UserAccount)
