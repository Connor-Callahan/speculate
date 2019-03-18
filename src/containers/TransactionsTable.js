import React, { Component } from 'react';
import {connect} from 'react-redux'
import Portfolio from '../components/Portfolio'

import TransactionChart from '../components/TransactionChart'

import { setFilter, sortTransactions, setUserChart, setCurrentValue, setPortfolio, setIndex } from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter) => dispatch(setFilter(filter)),
    sortTransactions: (transactions) => dispatch(sortTransactions(transactions)),
    handleChart: (chart) => dispatch(setUserChart(chart)),
    currentPortfolio : (portfolio) => dispatch(setPortfolio(portfolio)),
    currentValue: (value) => dispatch(setCurrentValue(value)),
    setIndex: (index) => dispatch(setIndex(index))
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transaction.transactions,
    balance: state.user.balance,
    filtered: state.transaction.filtered,
    sorted: state.transaction.sorted,
    value: state.transaction.value,
    portfolio: state.transaction.portfolio,
    cumulative: state.transaction.cumulative,
    userChart: state.transaction.userChart,
    index: state.transaction.index
  }
}


class TransactionsTable extends Component {

// filter bought/sold and all - bought/sold states as 'filtered'
  filterTransactions = (e) => {
     this.props.sortTransactions(null)
     this.props.currentPortfolio(null)
     this.props.currentValue(null)
     let bought = this.props.transactions.filter(transaction => {
       return transaction.order_type === 'buy'
     })
     let sold = this.props.transactions.filter(transaction => {
       return transaction.order_type === 'sell'
     })
     let copy = this.props.transactions.slice().map(o => ({ ...o }))
     switch(e.target.id) {
       case 'bought' :
       return this.props.setFilter(bought),
              this.filterChart(bought)
       case 'sold' :
       return this.props.setFilter(sold),
              this.filterChart(sold)
       case 'all' :
       return this.props.setFilter(null),
              this.filterChart(copy)
       default:
     }
   }

// filter transactions for bar graph (aggregate object of same stocks and their cost)
  filterChart = (transactions) => {
     let chart = []
     let copy = transactions.slice().map(o => ({ ...o }))
     copy.forEach(transaction => {
       let stock_symbol = transaction.stock_symbol
       let duplicate = chart.find(transaction => {
         return transaction.stock_symbol === stock_symbol
       })
       if(duplicate) {
         duplicate.cost += transaction.cost
         chart.push(duplicate)
       } else {
         chart.push(transaction)
       }
     })
     this.props.handleChart(chart)
   }

  sortPortfolio = (e) => {
     let copy = null
     let sorted = null

     if(this.props.filtered ) {
       copy = this.props.filtered.slice()
     } else {
       copy = this.props.transactions.slice()
     }

  switch (e.target.id) {
    case 'symbol':
    sorted = copy.sort(function(a, b) {
      return a.stock_symbol.localeCompare(b.stock_symbol)
    })
    break;
    case 'price':
    sorted = copy.sort(function(a, b) {
      return b.price - a.price
    })
    break;
    case 'num_shares':
    sorted = copy.sort(function(a, b) {
      return b.num_shares - a.num_shares
    })
    break;
    case 'cost':
    sorted = copy.sort(function(a, b) {
      return b.cost - a.cost
    })
    break;
    default:
  }
  this.props.sortTransactions(sorted)
}

  handleIndex = (e) => {
    if(e.target.id === 'next' && this.props.transactions.length > this.props.index) {
      let next = this.props.index + 10
      this.props.setIndex(next)
    } else if(e.target.id === 'previous' && this.props.transactions.length < this.props.index) {
      let previous = this.props.index - 10
      this.props.handleIndex(previous)
    }
  }
// ------render------------------------------
  render() {

    let transactions = []
    if(this.props.sorted) {
      transactions = this.props.sorted
    } else if (this.props.filtered) {
      transactions = this.props.filtered
    } else {
      transactions = this.props.transactions
    }

    let start = null
    if(this.props.index > 10) {
      start = this.props.index - 10
    }

    let limit = transactions.slice(start, this.props.index)
    // create time associated with current balance value
    let date = new Date

    return (
      <div>
      <div id="table-data">
      {
        this.props.portfolio ?
        <button id="all" id="all-button" onClick={this.filterTransactions}>All Transactions</button>
        :
        <div>
        <h1>All Transactions</h1>
        <h4 className='balance'>Balance : ﹩{this.props.balance}</h4>
        <p id='value' className='balance'>Updated : {date.toString()}</p>
        </div>
      }
      <Portfolio />
      {
        this.props.portfolio ?
        null
        :
        <div>
        <div>
        <button id="bought" className="transaction-button" onClick={this.filterTransactions}>Bought</button>
        <button id="sold" className="transaction-button" onClick={this.filterTransactions}>Sold</button>
        <button id="all" className="transaction-button" onClick={this.filterTransactions}>All</button>
        </div>
        <TransactionChart />

        <div className="transition-arrows">
        <button id="previous" className="index-button" onClick={this.handleIndex}>&#8249;</button>
        <button id="next" className="index-button" onClick={this.handleIndex}>&#8250;</button>
        </div>
        <table className="user-portfolio">
        <tbody>
        <tr>
        <th>
        <h2 id="symbol" onClick={this.sortPortfolio}>
        Symbol ▾
        </h2>
        </th>
        <th>
        <h2 id="price" onClick={this.sortPortfolio}>
        Price ▾
        </h2>
        </th>
        <th>
        <h2 id="num_shares" onClick={this.sortPortfolio}>
        # of Shares ▾
        </h2>
        </th>
        <th>
        <h2 id="cost" onClick={this.sortPortfolio}>
        Cost ▾
        </h2>
        </th>
        <th>
        <h2 id="cost" >
        Order Type
        </h2>
        </th>
        <th>
        <h2 id="cost" >
        Date/Time
        </h2>
        </th>
        </tr>
        {
          limit.map(transaction => {
            let date = new Date(transaction.date_time)
            return <tr key={Math.random()}>
            <td>{transaction.stock_symbol}</td>
            <td>${transaction.price}</td>
            <td>{transaction.num_shares}</td>
            <td>${transaction.cost}</td>
            <td>{transaction.order_type}</td>
            <td>{date.toDateString()}</td>
            </tr>
          })

        }

        </tbody>

        </table>
      </div>
      }
      </div>
    </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTable)
