import React, { Component } from 'react';
import {connect} from 'react-redux'

import TransactionChart from '../components/TransactionChart'
import Portfolio from '../components/Portfolio'

const mapDispatchToProps = (dispatch) => {
  return {
    handleFilter: (filtered) => dispatch( {type:'HANDLE_FILTER', payload:filtered}),
    handleSorted: (transactions) => dispatch( {type:'SORT_TRANSACTIONS', payload:transactions}),
    handleChart: (data) => dispatch( {type:'HANDLE_USER_CHART', payload:data}),
    handleCurrentPort : (port) => dispatch( {type:'HANDLE_CURRENT_PORT', payload:port}),
    handleCurrentVal: (value) => dispatch( {type:'HANDLE_CURRENT_VALUE', payload:value})
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    balance: state.balance,
    filter: state.filter,
    filtered: state.filtered,
    sorted: state.sorted,
    value: state.value,
    portfolio: state.portfolio,
    cumulative: state.cumulative,
    userChart: state.userChart
  }
}


class TransactionsTable extends Component {


   filterTransactions = (e) => {
     this.props.handleSorted(null)
     this.props.handleCurrentPort(null)
     this.props.handleCurrentVal(null)
     let bought = this.props.transactions.filter(transaction => {
       return transaction.order_type === 'buy'
     })
     let sold = this.props.transactions.filter(transaction => {
       return transaction.order_type === 'sell'
     })
     let copy = this.props.transactions.slice().map(o => ({ ...o }))
     switch(e.target.id) {
       case 'bought' :
       return this.props.handleFilter(bought),
              this.filterChart(bought)
       case 'sold' :
       return this.props.handleFilter(sold),
              this.filterChart(sold)
       case 'all' :
       return this.props.handleFilter(null),
              this.filterChart(copy)
       default:
     }
   }

   filterChart = (transactions) => {
     let chart = []
     let copy = transactions.slice().map(o => ({ ...o }))
     copy.forEach(transaction => {
       let stock_symbol = transaction.stock_symbol
       let cost = transaction.cost
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
  this.props.handleSorted(sorted)
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
    // create time associated with current balance value
    let date = new Date

    return (
      <div>
      <div className="table-data">
      <h1>All Transactions</h1>
      <Portfolio />
      <h4 className='balance'>Balance : ﹩{this.props.balance}</h4>
      <p id='value' className='balance'>Updated : {date.toString()}</p>
      <TransactionChart />
      <div>
      <button id="bought" className="portfolio-button" onClick={this.filterTransactions}>Bought</button>
      <button id="sold" className="portfolio-button" onClick={this.filterTransactions}>Sold</button>
      <button id="all" className="portfolio-button" onClick={this.filterTransactions}>All</button>
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
            transactions.map(transaction => {
              return <tr key={Math.random()}>
              <td>{transaction.stock_symbol}</td>
              <td>${transaction.price}</td>
              <td>{transaction.num_shares}</td>
              <td>${transaction.cost}</td>
              <td>{transaction.order_type}</td>
              <td>{transaction.date_time}</td>
              </tr>
            })

          }

      </tbody>

    </table>
      </div>

      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTable)
