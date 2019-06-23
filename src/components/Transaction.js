import React, { Component } from 'react';
import {connect} from 'react-redux'

import { createTransaction, addTransaction, setBalance } from '../actions'

const API_KEY = process.env.REACT_APP_IEX_API_KEY;

const mapDispatchToProps = (dispatch) => {
  return {
    createTransaction: (amount) => dispatch(createTransaction(amount)),
    addTransaction: (transaction) => dispatch(addTransaction(transaction)),
    adjustBalance: (amount) => dispatch(setBalance(amount))
  }
}

const mapStateToProps = (state) => {
  return {
    orderSize: state.transaction.orderSize,
    stock: state.stock.stock,
    transactions: state.transaction.transactions,
    balance: state.user.balance,
    id: state.user.id
  }
}

class Transaction extends Component {

  handleFormInput = (e) => {
    this.props.createTransaction(e.target.value)
  }

  handleOrder = async (e) => {

    e.preventDefault()
    e.persist()
    // fetch transactions
    let transactions = await fetch('https://speculate-app-api.herokuapp.com/api/v1/transactions')
      .then(r => r.json())
    // filter to return only transactions associated with the user
    let filtered = transactions.filter(transaction => transaction.user_id === this.props.id)
    // check to make sure both input fields are filled
    if(this.props.orderSize <= 0) {
      alert('Please enter an order amount greater than 0')
    } else {
    // retrieving the current price of the selected stock to trade from iex
    let price = await fetch(`https://cloud.iexapis.com/stable/stock/${this.props.stock.symbol}/quote?token=${API_KEY}`)
      .then(r => r.json())
  console.log(price)
    let totalCost = (price.latestPrice * this.props.orderSize).toFixed(2)

    let currentStock = null

    // determine if the selected stock already has a record of pre-existing transactions
      currentStock = filtered.find(transaction => {
        return transaction.stock_symbol === this.props.stock.symbol
      })

      let numSold = []
      let numBought = []
      let boughtStock = null
      let soldStock = null
      let curStockShare = 0
      let adjustedBalance = null

      // filter through the filtered users to create a new object of aggregate bought and sold for same stocks
      if(currentStock) {
        filtered.forEach(transaction => {
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
          return transaction.stock_symbol === this.props.stock.symbol
        })

        boughtStock = numBought.find(transaction => {
         return transaction.stock_symbol === this.props.stock.symbol
       })
          if(e.target.id === 'sell' && soldStock) {
            curStockShare = boughtStock.num_shares - soldStock.num_shares
          } else {
              curStockShare = boughtStock.num_shares - 0
          }
      }

      let date = new Date()
      // distinguish between buying and selling -> create post request to transactions table
      if(e.target.id === 'buy' && Number(this.props.balance) < totalCost) {

        alert('Insufficient funds! Please check your current balance.')
      } else if (e.target.id === 'buy') {
        fetch('https://speculate-app-api.herokuapp.com/api/v1/transactions/', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify({
            user_id: this.props.id,
            stock_symbol: this.props.stock.symbol,
            num_shares: this.props.orderSize,
            price: price.latestPrice,
            cost: totalCost,
            commission: 7,
            order_type: e.target.id,
            date_time: date
          })
        })
        .then(r => r.json())
        .then(data => {
          this.props.addTransaction(data)
        })

        adjustedBalance = this.props.balance - parseInt(totalCost)
        this.props.adjustBalance(adjustedBalance)

      } else if (e.target.id === 'sell' && parseInt(this.props.orderSize, 10) <= curStockShare) {

        fetch('https://speculate-app-api.herokuapp.com/api/v1/transactions', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify({
            user_id: this.props.id,
            stock_symbol: this.props.stock.symbol,
            num_shares: this.props.orderSize,
            price: price.latestPrice,
            cost: totalCost,
            commission: 7,
            order_type: e.target.id,
            date_time: date
          })
        })
        .then(r => r.json())
        .then(data => {
          this.props.addTransaction(data)
        })

        adjustedBalance = this.props.balance + parseInt(totalCost, 10)
        this.props.adjustBalance(adjustedBalance)
      } else {
        // alert if no shares of the stock are available in the users portfolio
        alert('No shares available to trade!')
      }
    }
  }
  //
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
