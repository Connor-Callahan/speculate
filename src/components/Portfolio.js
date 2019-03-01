import React, { Component } from 'react';
import {connect} from 'react-redux'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'

const mapDispatchToProps = (dispatch) => {
  return {
    handleCurrentPort : (port) => dispatch( {type:'HANDLE_CURRENT_PORT', payload:port}),
    handleCurrentVal: (value) => dispatch( {type:'HANDLE_CURRENT_VALUE', payload:value}),
    handleCumVal: (value) => dispatch( {type:'HANDLE_CUMULATIVE_VALUE', payload:value}),
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    balance: state.balance,
    value: state.value,
    portfolio: state.portfolio,
    cumulative: state.cumulative
  }
}



class Profile extends Component {

   handleCurrentVal = () => {
    let copy = this.props.transactions.slice().map(o => ({ ...o }))
    let bought = copy.filter(transaction => {
      return transaction.order_type === 'buy'
    })
    let sold = copy.filter(transaction => {
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
    this.props.handleCurrentPort(portVal)
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
      <div>
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
            data={this.props.portfolio.map(transaction => [transaction.stock_symbol, transaction.cost])}/>

          }
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
                Current Value
                </h2>
               </th>
              </tr>
              {
                  this.props.portfolio.map(transaction => {
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


              }

          </tbody>

        </table>
          </div>
        :
        <button
        className="portfolio-button"
        onClick={this.handleCurrentVal}
        >Portfolio
        </button>
      }


      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)


//
// <div className="table-data">
// <h1>All Transactions</h1>
// <h4 className='balance'>Balance : ﹩{this.props.balance}</h4>
// {
//   this.props.cumulative ?
//   <div id="all-balances">
//   <h4 className='balance'>Value : ﹩{this.props.cumulative}</h4>
//   <p3 id='value' className='balance'>Updated : {date.toString()}</p3>
//   </div>
//   :
//   null
// }
// <button className="portfolio-button" onClick={this.handleCurrentVal}>Holdings</button>
// <button id="bought" className="portfolio-button" onClick={this.filterTransactions}>Bought</button>
// <button id="sold" className="portfolio-button" onClick={this.filterTransactions}>Sold</button>
// <button id="all" className="portfolio-button" onClick={this.filterTransactions}>All</button>
// <table className="user-portfolio">
//  <tbody>
//   <tr>
//     <th>
//       <h2 id="symbol" onClick={this.sortPortfolio}>
//         Symbol ▾
//       </h2>
//     </th>
//     <th>
//       <h2 id="price" onClick={this.sortPortfolio}>
//         Price
//       </h2>
//     </th>
//     <th>
//       <h2 id="num_shares" onClick={this.sortPortfolio}>
//         # of Shares
//       </h2>
//     </th>
//     <th>
//       <h2 id="cost" onClick={this.sortPortfolio}>
//         Cost
//       </h2>
//     </th>
//     {
//       this.props.filter === 'holdings' ?
//       <th>
//       <h2 id="cost" onClick={this.sortPortfolio}>
//       Current Value
//       </h2>
//       </th>
//       :
//       <div>
//       <th>
//       <h2 id="cost" onClick={this.sortPortfolio}>
//       Order Type
//       </h2>
//       </th>
//       <th>
//       <h2 id="cost" onClick={this.sortPortfolio}>
//       Date/Time
//       </h2>
//       </th>
//       </div>
//     }
//
//     </tr>
//     {
//       this.props.filter === 'holdings' ?
//         portfolio.map(transaction => {
//           let totalVal = (transaction.currentVal * transaction.num_shares).toFixed(2)
//           let totalCost = (transaction.cost).toFixed(2)
//           return <tr>
//           <td>{transaction.stock_symbol}</td>
//           <td>{(transaction.price).toFixed(2)}</td>
//           <td>{transaction.num_shares}</td>
//           <td>${totalCost}</td>
//           <td>${totalVal}</td>
//           </tr>
//         })
//         :
//         limit.map(transaction => {
//           return <tr>
//           <td>{transaction.stock_symbol}</td>
//           <td>${transaction.price}</td>
//           <td>{transaction.num_shares}</td>
//           <td>${transaction.cost}</td>
//           <td>{transaction.order_type}</td>
//           <td>{transaction.date_time}</td>
//           </tr>
//         })
//
//     }
//
// </tbody>
//
// </table>
// </div>
