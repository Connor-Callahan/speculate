import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleSort: (transactions) => dispatch( {type:'HANDLE_SORT', payload:transactions}),
    setSort: (sort) => dispatch( {type:'SET_SORT', payload:sort}),
    handleFilter: (filtered) => dispatch( {type:'HANDLE_FILTER', payload:filtered}),
    setFilter: (filter) => dispatch( {type:'SET_FILTER', payload:filter}),
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    balance: state.balance,
    filter: state.filter,
    filtered: state.filtered,
    sort: state.sort
  }
}

class TransactionsTable extends Component {

  sortPortfolio = (e) => {
     let sortedTransactions = this.props.transactions.slice()
     switch (e.target.id) {
       case 'symbol':
       return this.props.setSort('symbol')
       case 'num_shares':
       return this.props.setSort('num_shares')
       case 'cost':
       return this.props.setSort('cost')
       case 'price':
       return this.props.setSort('price')
         break;
       default:
     }
     this.props.handleSort(sortedTransactions)
     console.log(sortedTransactions)
   }

   filterTransactions = (e) => {
     let bought = this.props.transactions.filter(transaction => {
       return transaction.order_type === 'buy'
     })
     let sold = this.props.transactions.filter(transaction => {
       return transaction.order_type === 'sell'
     })

     switch(e.target.id) {
       case 'bought' :
       return this.props.handleFilter(bought),
              this.props.setFilter('bought')
       case 'sold' :
       return this.props.handleFilter(sold),
              this.props.setFilter('sold')
       case 'all' :
       return this.props.setFilter('all')
       break;
     default:
     }
   }

  render() {

    let sorted = null

    if(this.props.filter === 'all') {
        sorted = this.props.transactions.slice()
    } else {
        sorted = this.props.filtered.slice()
      }

    switch (this.props.sort) {
      case 'symbol':
      sorted.sort(function(a, b) {
        return a.stock_symbol.localeCompare(b.stock_symbol)
      })
        break;
      case 'price':
      sorted.sort(function(a, b) {
        return b.price - a.price
      })
        break;
      case 'num_shares':
      sorted.sort(function(a, b) {
        return b.num_shares - a.num_shares
      })
        break;
      case 'cost':
      sorted.sort(function(a, b) {
        return b.cost - a.cost
      })
        break;
      default:
    }

    let limit = sorted.slice(0,20)
    return (
      <div>
      <div className="table-data">
      <h1>All Transactions</h1>
      <h4 className='balance'>Balance : ﹩{this.props.balance}</h4>
      <button className="portfolio-button">Holdings</button>
      <button id="bought" className="portfolio-button" onClick={this.filterTransactions}>Bought</button>
      <button id="sold" className="portfolio-button" onClick={this.filterTransactions}>Sold</button>
      <button id="all" className="portfolio-button" onClick={this.filterTransactions}>All</button>
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
              Price
            </h2>
          </th>
          <th>
            <h2 id="num_shares" onClick={this.sortPortfolio}>
              # of Shares
            </h2>
          </th>
          <th>
            <h2 id="cost" onClick={this.sortPortfolio}>
              Cost
            </h2>
          </th>
          <th>
            <h2 id="cost" onClick={this.sortPortfolio}>
              Order Type
            </h2>
          </th>
          <th>
            <h2 id="cost" onClick={this.sortPortfolio}>
              Date/Time
            </h2>
          </th>

          </tr>
          {

            limit.map(transaction => {
              return <tr>
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
