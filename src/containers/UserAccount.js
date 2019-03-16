import React, { Component } from 'react';
import {connect} from 'react-redux'
import Landing from './Landing'
import TransactionsTable from './TransactionsTable'
import Portfolio from '../components/Portfolio'

import { fetchTransactions, setUserChart } from '../actions'


const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    balance: state.balance,
    transactions: state.transactions,
    firstname: state.firstname,
    id: state.id,
    portfolio: state.portfolio
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransactions: (transactions) => dispatch(fetchTransactions(transactions)),
    setUserChart: (chart) => dispatch(setUserChart(chart))
  }
}


class UserAccount extends Component {

  handleTransactions = async() => {
  let transactions = await fetch('http://localhost:3000/api/v1/transactions/')
    .then(r => r.json())
  let filtered = transactions.filter(transaction => transaction.user_id === this.props.id)
   this.props.fetchTransactions(filtered)
   this.handleChart()
  }

  handleChart = () => {
    let chart = []
    let copy = this.props.transactions.slice().map(o => ({ ...o }))
    copy.forEach(transaction => {
      let stock_symbol = transaction.stock_symbol
      let cost = transaction.cost
      let duplicate = chart.find(transaction => {
        return transaction.stock_symbol === stock_symbol
      })
      if(duplicate) {
        duplicate.cost += cost
        chart.push(duplicate)
      } else {
        chart.push(transaction)
      }

    })
    this.props.setUserChart(chart)
  }

  render(){
    return(
      <div id="user-container">
              {
                this.props.loggedIn ?
                <div>
                {
                  this.props.transactions.length > 0?
                  <div>
                  <TransactionsTable />
                  </div>
                  :
                  <div id="user-welcome">
                  <h1>Welcome, {this.props.firstname}</h1>
                  <h4 className='balance'>Balance : ﹩{this.props.balance}</h4>
                  <p>Proceed to view past transactions and current holdings. Search or browse company files to exchange shares.</p>
                  <button className="transaction-button"
                  onClick={this.handleTransactions}>
                  View Account
                  </button>
                  </div>
                }
                </div>

                :
                <div>
                <Landing />
                </div>
              }
            </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
