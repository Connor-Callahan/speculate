import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleSort: (transactions) => dispatch( {type:'HANDLE_SORT', payload:transactions})
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    balance: state.balance
  }
}

class TransactionsTable extends Component {

  sortPortfolio = (e) => {
     let sortedTransactions = this.props.transactions
     switch (e.target.id) {
       case 'symbol':
       sortedTransactions.sort(function(a, b) {
         return a.stock_symbol.localeCompare(b.stock_symbol)
       })
         break;
       case 'price':
       sortedTransactions.sort(function(a, b) {
         return b.price - a.price
       })
         break;
       case 'num_shares':
       sortedTransactions.sort(function(a, b) {
         return b.num_shares - a.num_shares
       })
         break;
       case 'cost':
       sortedTransactions.sort(function(a, b) {
         return b.cost - a.cost
       })
         break;
       default:
     }
     this.props.handleSort(sortedTransactions)
     this.render()
   }

  render() {
    return (
      <div>
      <div className="table-data">
      <h1>All Transactions</h1>
      <h4 className='balance'>Balance : ﹩{this.props.balance}</h4>

      <table className="user-portfolio">
       <tbody>
        <tr>
          <th>
            <h2 id="symbol" onClick={this.sortPortfolio}>
              Symbol
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
      {this.props.transactions.map(transaction => {
        return <tr>
        <td>{transaction.stock_symbol}</td>
        <td>${transaction.price}</td>
        <td>{transaction.num_shares}</td>
        <td>${transaction.cost}</td>
        <td>{transaction.order_type}</td>
        <td>{transaction.date_time}</td>
        </tr>
      })}
      </tbody>

    </table>
      </div>

      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTable)
