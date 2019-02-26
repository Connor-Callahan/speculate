import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    setSort: (sort) => dispatch( {type:'SET_SORT', payload:sort}),
    handleFilter: (filtered) => dispatch( {type:'HANDLE_FILTER', payload:filtered}),
    setFilter: (filter) => dispatch( {type:'SET_FILTER', payload:filter}),
    handleCurrentPort : (port) => dispatch( {type:'HANDLE_CURRENT_PORT', payload:port}),
    handleCurrentVal: (value) => dispatch( {type:'HANDLE_CURRENT_VALUE', payload:value}),
    handleCumVal: (value) => dispatch( {type:'HANDLE_CUMULATIVE_VALUE', payload:value}),
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    balance: state.balance,
    filter: state.filter,
    filtered: state.filtered,
    sort: state.sort,
    value: state.value,
    portfolio: state.portfolio,
    cumulative: state.cumulative
  }
}

class Profile extends Component {

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
       default:
     }
     this.props.handleSort(sortedTransactions)
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
     }
   }

   handleCurrentVal = () => {
    let bought = this.props.transactions.filter(transaction => {
      return transaction.order_type === 'buy'
    })
    let sold = this.props.transactions.filter(transaction => {
      return transaction.order_type === 'sell'
    })

    let newBoughtArr = []

    let newSoldArr = []

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
    console.log('newSoldAbove', newSoldArr)

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
        foundTransaction.price = foundTransaction.price
        foundTransaction.num_shares = num_shares - foundTransaction.num_shares
        totalCurPort.push(foundTransaction)
      } else {
        totalCurPort.push(transaction)
      }
    })

    let cumVal = null

    let portVal = totalCurPort.filter(transaction => {
      return transaction.num_shares > 0
    })

    if(portVal.length > 0) {
      let curPortVal = portVal.map(transaction => {
        return transaction.stock_symbol
      })

    let multiStock = null

    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${curPortVal}&types=quote&range=1m&last=5`)
    .then(r => r.json())
    .then(data => {
      curPortVal.forEach(symbol => {
        multiStock = portVal.find(transaction => transaction.stock_symbol === symbol)
        cumVal += data[symbol].quote.latestPrice * multiStock.num_shares
      })
      this.props.handleCurrentVal(data)
      this.props.handleCumVal((cumVal).toFixed(2))
    })
    this.props.setFilter('holdings')
    console.log('after',portVal)
    this.props.handleCurrentPort(portVal)
  }
}

// ------render------------------------------
  render() {
    let currentStockVal = []

    if(this.props.value != null) {
      currentStockVal = Object.values(this.props.value)
      for(let i = 0; i < currentStockVal.length; i++) {
        this.props.portfolio[i].currentVal = (currentStockVal[i].quote.latestPrice * this.props.portfolio[i].num_shares).toFixed(2)
      }
    }

// create time associated with updated portfolio value
    let date = new Date

    return (
      <div>
      <div className="table-data">
      <h1>All Transactions</h1>
      <h4 className='balance'>Balance : ﹩{this.props.balance}</h4>
      {
        this.props.cumulative ?
        <div id="all-balances">
        <h4 className='balance'>Value : ﹩{this.props.cumulative}</h4>
        <p3 id='value' className='balance'>Updated : {date.toString()}</p3>
        </div>
        :
        null
      }
      <button className="portfolio-button" onClick={this.handleCurrentVal}>Holdings</button>
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
          {
            this.props.filter === 'holdings' ?
            <th>
            <h2 id="cost" onClick={this.sortPortfolio}>
            Current Value
            </h2>
            </th>
            :
            <div>
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
            </div>
          }

          </tr>
          {
            this.props.filter === 'holdings' ?
              portfolio.map(transaction => {
                let totalVal = (transaction.currentVal * transaction.num_shares).toFixed(2)
                let totalCost = (transaction.cost).toFixed(2)
                return <tr>
                <td>{transaction.stock_symbol}</td>
                <td>{(transaction.price).toFixed(2)}</td>
                <td>{transaction.num_shares}</td>
                <td>${totalCost}</td>
                <td>${totalVal}</td>
                </tr>
              })
              :
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


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
