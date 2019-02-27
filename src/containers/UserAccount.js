import React from 'react';
import {connect} from 'react-redux'
import NewsFeed from '../components/NewsFeed'
import TransactionsTable from './TransactionsTable'


const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    balance: state.balance,
    transactions: state.transactions,
    transactions: state.transactions,
    firstname: state.firstname,
    }
}


fetchTransactions = () => {
  console.log('here')
  let transactions = []
    fetch('http://localhost:3000/api/v1/transactions/')
    .then(r => r.json())
    .then(data => {
      transactions = data.filter(transaction => transaction.user_id === this.props.id)
      this.props.handleTransactions(transactions)
    })
}


const UserAccount = (props) => {
  handleTransactions: (transactions) => dispatch( {type:'HANDLE_TRANSACTIONS', payload:transactions})


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
              <div>
              <p>Welcome, {props.firstname}</p>
              <button>View Transactions</button>
              </div>
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
