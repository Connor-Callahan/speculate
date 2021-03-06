import React, { Component } from 'react';
import {connect} from 'react-redux'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'

import { setPortfolio, setCurrentValue, setTotalValue } from '../actions'

const API_KEY = process.env.REACT_APP_IEX_API_KEY;

const mapDispatchToProps = (dispatch) => {
  return {
    setPortfolio : (portfolio) => dispatch(setPortfolio(portfolio)),
    setCurrentValue: (value) => dispatch(setCurrentValue(value)),
    setTotalValue: (total) => dispatch(setTotalValue(total)),
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transaction.transactions,
    balance: state.user.balance,
    value: state.transaction.value,
    portfolio: state.transaction.portfolio,
    cumulative: state.transaction.cumulative
  }
}

class Profile extends Component {

   handleValue = () => {
     // create a copy of all transactions in state
    let copy = this.props.transactions.slice().map(o => ({ ...o }))

    // filter bought and sold
    let bought = copy.filter(transaction => {
      return transaction.order_type === 'buy'
    })
    let sold = copy.filter(transaction => {
      return transaction.order_type === 'sell'
    })

    let newBoughtArr = []
    let newSoldArr = []

    // iterate over bought/sold stocks to push a new aggregate object(if same stock found) of the entires stocks value into the new empty arrays
    bought.forEach(transaction => {
      let stock_symbol = transaction.stock_symbol
      let num_shares = transaction.num_shares
      let price = transaction.price
      let cost = transaction.cost
      let foundTransaction = newBoughtArr.find(transaction => {
        return transaction.stock_symbol === stock_symbol
      })
        if(foundTransaction) {
          foundTransaction.cost += cost
          foundTransaction.price = price
          foundTransaction.num_shares += num_shares
        } else {
          newBoughtArr.push(transaction)
        }
      return newBoughtArr
    })

    sold.forEach(transaction => {
      let stock_symbol = transaction.stock_symbol
      let num_shares = transaction.num_shares
      let price = transaction.price
      let cost = transaction.cost
      let foundTransaction = newSoldArr.find(transaction => {
        return transaction.stock_symbol === stock_symbol
      })
        if(foundTransaction) {
          foundTransaction.cost += cost
          foundTransaction.price = price
          foundTransaction.num_shares += num_shares
        } else {
          newSoldArr.push(transaction)
        }
      return newSoldArr
    })

    let totalCurPort = []

    // iterate through the new arrays as before the combine the cost of any duplicate stocks
    newBoughtArr.forEach(transaction => {
      let stock_symbol = transaction.stock_symbol
      let num_shares = transaction.num_shares
      let price = transaction.price
      let cost = transaction.cost
      let foundTransaction = newSoldArr.find(transaction => {
        return transaction.stock_symbol === stock_symbol
      })
      if(foundTransaction) {
        foundTransaction.cost = cost - foundTransaction.cost
        foundTransaction.price = price
        foundTransaction.num_shares = num_shares - foundTransaction.num_shares
        totalCurPort.push(foundTransaction)
      } else {
        totalCurPort.push(transaction)
      }
    })

    let cumVal = null
    // filter any transactions of companies with equal number of bough/sold shares
    let portVal = totalCurPort.filter(transaction => {
      return transaction.num_shares > 0
    })

    // if an equal amount of shares have been bough/sold of each stock, there should be no stocks in the portfolio
    if(portVal.length > 0) {
      let curPortVal = portVal.map(transaction => {
        return transaction.stock_symbol
      })

    let multiStock = null

    // retrieve current value for the price of each stock in portfolio
    fetch(`https://cloud.iexapis.com/v1/stock/market/batch?types=quote&symbols=${curPortVal}&range=5y%20&token=${API_KEY}`)
    .then(r => r.json())
    .then(data => {
      curPortVal.forEach(symbol => {
        multiStock = portVal.find(transaction => transaction.stock_symbol === symbol)
        cumVal += data[symbol].quote.latestPrice * multiStock.num_shares
      })
      this.props.setCurrentValue(data)
      this.props.setTotalValue((cumVal).toFixed(2))
    })
    this.props.setPortfolio(portVal)
  }
}





// ------render------------------------------
  render() {
    let currentStockVal = []

    if(this.props.value != null) {
      currentStockVal = Object.values(this.props.value)
      for(let i = 0; i < currentStockVal.length; i++) {
        this.props.portfolio[i].currentVal = (currentStockVal[i].quote.latestPrice)
      }
    }

    // create time associated with updated portfolio value
    let date = new Date

    return (
      <div id="portfolio">
      {
        this.props.portfolio ?
        <div className="table-data">
          <h1>Portfolio</h1>
          {
            this.props.cumulative ?
            <div id="all-balances">
            <h4 className='balance'>Value : ﹩{this.props.cumulative}</h4>
            <p id='value' className='balance'>Updated : {date.toString()}</p>
            </div>
            :
            <p>Loading...</p>
          }
          {
            <PieChart
            width="200px"
            legend={false}
            donut={true}
            prefix="$"
            data={this.props.portfolio.map(transaction => [transaction.stock_symbol, (transaction.currentVal * transaction.num_shares).toFixed(2)])}/>

          }
          <table className="user-portfolio">
           <tbody>
            <tr>
              <th>
                <h2 id="symbol" >
                  Symbol ▾
                </h2>
              </th>
              <th>
                <h2 id="price" >
                  Price
                </h2>
              </th>
              <th>
                <h2 id="num_shares" >
                  # of Shares
                </h2>
              </th>
              <th>
                <h2 id="cost" >
                  Cost
                </h2>
              </th>
               <th>
                <h2 id="cost">
                Current Value
                </h2>
               </th>
              </tr>
              {
                  this.props.portfolio.map(transaction => {
                    let totalVal = (transaction.currentVal * transaction.num_shares).toFixed(2)
                    let totalCost = (transaction.cost).toFixed(2)
                    return <tr key={Math.random(10)}>
                    <td>{transaction.stock_symbol}</td>
                    <td>{(transaction.price).toFixed(2)}</td>
                    <td>{transaction.num_shares}</td>
                    <td>${totalCost}</td>
                    <td>${totalVal}</td>
                    </tr>
                  })
              }

          </tbody>

        </table>
          </div>
        :
        <button
        className="portfolio-btn"
        onClick={this.handleValue}
        >
        View Holdings
        </button>
      }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
