import React, { Component } from 'react';
import {connect} from 'react-redux'
import Landing from './Landing'
import TransactionsTable from './TransactionsTable'

import { fetchTransactions, setUserChart } from '../actions'


const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    balance: state.user.balance,
    transactions: state.transaction.transactions,
    firstname: state.user.firstname,
    id: state.user.id,
    portfolio: state.transaction.portfolio
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
  let transactions = await fetch('https://speculate-app-api.herokuapp.com/api/v1/transactions/')
  .then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
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

    const landingShow = this.props.loggedIn ? 'user' : 'landing';

    return(
      <div className={`${landingShow}-container`}>
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
                  <h1 id="dash-header">Account Dashboard</h1>
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
                <div id="landing">
                <Landing />
                </div>
              }
            </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
