import React, { Component } from 'react';
import NewsFeed from '../components/NewsFeed'
import UserTable from '../components/UserTable'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'


ReactChartkick.addAdapter(Chart)

class UserAccount extends Component {

  render() {

    let sold = this.props.transactions.filter(transaction => {
      return transaction.order_type === 'sell'
    })

    let totalBuy = this.props.bought.reduce(function(prev, cur) {
      return prev + cur.cost;
    }, 0);

    let totalSell = sold.reduce(function(prev, cur) {
      return prev + cur.cost;
    }, 0);

    let currentStockVal = []

    if(this.props.currentVal != null) {
      currentStockVal = Object.values(this.props.currentVal)
    }

    for(let i = 0; i < currentStockVal.length; i++) {
      this.props.bought[i].currentStockVal = (currentStockVal[i].quote.latestPrice * this.props.bought[i].num_shares).toFixed(2)
    }

    console.log(this.props.currentVal)

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
            <th>
              <h2 id="current-value" onClick={this.props.sortPortfolio}>
                Current Value
              </h2>
            </th>
            </tr>
          <UserTable bought={this.props.bought}
          handleCurrentVal={this.props.handleCurrentVal}
          currentVal={this.props.currentVal} />
          </tbody>
          <PieChart
          className='pie-chart'
          donut={true}
          width="225%"
          prefix="$"
          data={this.props.bought.map(transaction => [transaction.stock_symbol, transaction.cost])}/>
        </table>

      ) : <NewsFeed newsFeed={this.props.newsFeed}/>
      }
      </div>
    );
  }

}

export default UserAccount;
