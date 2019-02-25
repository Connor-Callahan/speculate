import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleTransaction: (amount) => dispatch( {type:'HANDLE_TRANSACTION', payload:amount}),
    adjustBalance: (amount) => dispatch( {type:'HANDLE_USER_BALANCE', payload:amount})
  }
}

const mapStateToProps = (state) => {
  return {
    orderSize: state.orderSize,
    stock: state.stock,
    transactions: state.transactions,
    id: state.id
  }
}

class Transaction extends Component {

  handleFormInput = (e) => {
    this.props.handleTransaction(e.target.value)
  }

  handleOrder = async (e) => {
    e.preventDefault()
    e.persist()
    if(this.props.orderSize <= 0) {
      alert('Please enter an order amount greater than 0')
    } else {
      let price = await fetch(`https://api.iextrading.com/1.0/stock/${this.props.stock.quote.symbol}/batch?types=quote,news`)
      .then(r => r.json())

      let totalCost = (price.quote.latestPrice * this.props.orderSize).toFixed(2)

      let currentStock = null

      currentStock = this.props.transactions.find(transaction => {
        return transaction.stock_symbol === this.props.stock.quote.symbol
      })

      let numSold = []
      let numBought = []
      let boughtStock = null
      let soldStock = null
      let curStockShare = 0

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
        .then(data => {
          console.log(data)
        })
        let adjustedBalance = this.props.balance - parseInt(totalCost)
        this.props.adjustBalance(adjustedBalance)

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
        .then(data => {
          console.log(data)
        })
        this.props.fetchTransactions()
      } else {
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
