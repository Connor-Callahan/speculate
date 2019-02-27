import React, { Component } from 'react';
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
    id: state.id,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleTransactions: (transactions) => dispatch( {type:'FETCH_TRANSACTIONS', payload:transactions})
  }
}




class UserAccount extends Component {

  fetchTransactions = async() => {
  let transactions = await fetch('http://localhost:3000/api/v1/transactions/')
    .then(r => r.json())
  let filtered = transactions.filter(transaction => transaction.user_id === this.props.id)
  console.log(transactions)
   this.props.handleTransactions(filtered)
  }

  render(){
    return(
      <div id="user-container">
              {
                this.props.loggedIn ?
                <div>
                {
                  this.props.transactions.length > 0 ?
                  <div>
                  <TransactionsTable />
                  </div>
                  :
                  <div>
                  <p>Welcome, {this.props.firstname}</p>
                  <button onClick={this.fetchTransactions}>View Transactions</button>
                  </div>
                }
                </div>

                :
                <div>
                <NewsFeed />
                </div>
              }
            </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
