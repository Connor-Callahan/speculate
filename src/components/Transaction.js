import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleTransaction: (amount) => dispatch( {type:'HANDLE_TRANSACTION', payload:amount}),
    adjustBalance: (amount) => dispatch( {type:'HANDLE_USER_BALANCE', payload:amount}),
    addTransaction: (transaction) => dispatch( {type:'ADD_TRANSACTION', payload:transaction}),
  }
}

const mapStateToProps = (state) => {
  return {
    orderSize: state.orderSize,
    stock: state.stock,
    transactions: state.transactions,
    balance: state.balance,
    id: state.id
  }
}

class Transaction extends Component {

  handleFormInput = (e) => {
    this.props.handleTransaction(e.target.value)
  }

  filterTransactions = () => {

  }

  handleOrder = async (e) => {
    e.preventDefault()
    e.persist()
    // conditional check for input
    if(this.props.orderSize <= 0) {
      alert('Please enter an order amount greater than 0')
    } else {
    // retrieving the current price from iex
    let price = await fetch(`https://api.iextrading.com/1.0/stock/${this.props.stock.quote.symbol}/batch?types=quote,news`)
      .then(r => r.json())

    let totalCost = (price.quote.latestPrice * this.props.orderSize).toFixed(2)

    let currentStock = null

    // determine if the selected stock already has a record of pre-existing transactions
      currentStock = this.props.transactions.find(transaction => {
        return transaction.stock_symbol === this.props.stock.quote.symbol
      })

      let numSold = []
      let numBought = []
      let boughtStock = null
      let soldStock = null
      let curStockShare = 0

      // filter through the transactions to create a new object of aggregate bought and sold for same stocks
      if(currentStock) {
        this.props.transactions.forEach(transaction => {
          if(transaction.order_type === 'sell') {
            let stock_symbol = transaction.stock_symbol
            let num_shares = transaction.num_shares
            let foundTransaction = numSold.find(transaction => {
              return transaction.stock_symbol === stock_symbol
            })
            if(foundTransaction) {
              foundTransaction.num_shares += num_shares
            } else {
              numSold.push(transaction)
            }
          } else {
            let stock_symbol = transaction.stock_symbol
            let num_shares = transaction.num_shares
            let foundTransaction = numBought.find(transaction => {
              return transaction.stock_symbol === stock_symbol
            })
            if(foundTransaction) {
              foundTransaction.num_shares += num_shares
            } else {
              numBought.push(transaction)
            }
          }
        })

        soldStock = numSold.find(transaction => {
          return transaction.stock_symbol === this.props.stock.quote.symbol
        })

        boughtStock = numBought.find(transaction => {
         return transaction.stock_symbol === this.props.stock.quote.symbol
       })
        if(soldStock) {
          if(e.target.id === 'sell' && soldStock) {
            curStockShare = boughtStock.num_shares - soldStock.num_shares
          }
          } else {
              curStockShare = boughtStock.num_shares - 0
            }
          }

      // distinguish between buying and selling -> create post request to transactions table
      if(e.target.id === 'buy' && Number(this.props.balance) < totalCost) {
        alert('Insufficient funds! Please check your current balance.')
      } else if (e.target.id === 'buy') {
        fetch('http://localhost:3000/api/v1/transactions/', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify({
            user_id: this.props.id,
            stock_symbol: this.props.stock.quote.symbol,
            num_shares: this.props.orderSize,
            price: price.quote.latestPrice,
            cost: totalCost,
            commission: 7,
            order_type: e.target.id,
            date_time: price.quote.latestTime
          })
        })
        .then(r => r.json())

        let adjustedBalance = this.props.balance - parseInt(totalCost)
        console.log('totalCost', totalCost)
        console.log('adjustedBalance', adjustedBalance)
        console.log('balance', this.props.balance)
        this.props.adjustBalance(adjustedBalance)
        this.props.fetchTransactions()
      } else if (e.target.id === 'sell' && parseInt(this.props.orderSize, 10) <= curStockShare) {
        let adjustedBalance = this.props.balance + parseInt(totalCost, 10)
        fetch('http://localhost:3000/api/v1/transactions/', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify({
            user_id: this.props.id,
            stock_symbol: this.props.stock.quote.symbol,
            num_shares: this.props.orderSize,
            price: price.quote.latestPrice,
            cost: totalCost,
            commission: 7,
            order_type: e.target.id,
            date_time: price.quote.latestTime
          })
        })
        .then(r => r.json())

        this.props.fetchTransactions()
        console.log('here')
      } else {
        // alert if no shares of the stock are available in the users portfolio
        alert('No shares available to trade!')
      }
    }

  }

  render() {
    return (
      <div className="create-transaction">
        <form >
        <label htmlFor="Amount"></label>
        <input className="input-field" onChange={this.handleFormInput} type="number" id="orderSize" placeholder="# of shares"/>
        <button className="purchase-button" onClick={this.handleOrder} id="buy" >Buy</button>
        <br></br>
        <label htmlFor="Amount"></label>
        <input className="input-field" onChange={this.handleFormInput} type="number" id="orderSize" placeholder="# of shares"/>
        <button className="purchase-button" onClick={this.handleOrder} id="sell">Sell</button>
        <br></br>
        <label htmlFor="Amount"></label>
        <input className="input-field" onChange={this.handleFormInput} type="number" id="orderSize" placeholder="commission"/>
        </form>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
