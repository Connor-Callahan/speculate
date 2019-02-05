import React, { Component } from 'react';
import NewsFeed from '../components/NewsFeed'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'


ReactChartkick.addAdapter(Chart)


class UserAccount extends Component {

  state = {
    currentBuyValue: []
  }

  render() {

    let sold = this.props.transactions.filter(transaction => {
      return transaction.order_type == 'sell'
    })

    let bought = this.props.transactions.filter(transaction => {
      return transaction.order_type == 'buy'
    })

    let totalBuy = bought.reduce(function(prev, cur) {
      return prev + cur.cost;
    }, 0);

    let totalSell = sold.reduce(function(prev, cur) {
      return prev + cur.cost;
    }, 0);

    let currentPortfolio = bought.map(transaction => {
      return transaction.stock_symbol
    })

    for(let i = 0; i < currentPortfolio.length; i++) {
      fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${currentPortfolio[i]}&types=quote,news,chart&range=1m&last=5`)
      .then(r => r.json())
      .then(data => {
        console.log(data.quote.symbol, data.quote.latestPrice)
      })
    }

    return (
      <div id="user-container">
      {
        this.props.isLoggedIn  ? (
        <table className="user-portfolio">
         <tbody>
          <tr>
            <th>
              <h2 id="symbol" onClick={this.props.sortPortfolio}>
                Symbol
              </h2>
            </th>
            <th>
              <h2 id="price" onClick={this.props.sortPortfolio}>
                Price
              </h2>
            </th>
            <th>
              <h2 id="num_shares" onClick={this.props.sortPortfolio}>
                # of Shares
              </h2>
            </th>
            <th>
              <h2 id="cost" onClick={this.props.sortPortfolio}>
                Cost
              </h2>
            </th>
            </tr>
          {bought.map(transaction => {
            return <tr>
            <td>{transaction.stock_symbol}</td>
            <td>${transaction.price}</td>
            <td>{transaction.num_shares}</td>
            <td>${transaction.cost}</td>
            </tr>
          })}
          </tbody>
          <PieChart
          className='pie-chart'
          donut={true}
          width="225%"
          prefix="$"
          data={this.props.transactions.map(transaction => [transaction.stock_symbol, transaction.cost])}/>
        </table>

      ) : <NewsFeed newsFeed={this.props.newsFeed}/>
      }
      </div>
    );
  }

}

export default UserAccount;
