import React, { Component } from 'react';
import NewsFeed from '../components/NewsFeed'
import CurrentPortfolio from '../components/CurrentPortfolio'
import AllTransactions from '../components/AllTransactions'
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

    return (
      <div id="user-container">
      {
        this.props.isLoggedIn ? (
          <div>
            {
              this.props.currentVal?
              <div>
              <CurrentPortfolio bought={this.props.bought}
              handleCurrentVal={this.props.handleCurrentVal}
              currentVal={this.props.currentVal} />
              <PieChart
              legend={false}
              className='pie-chart'
              donut={true}
              width="450px"
              prefix="$"
              data={this.props.bought.map(transaction => [transaction.stock_symbol, transaction.cost])}/>
              </div>
              :
              <div>
              <AllTransactions bought={this.props.transactions}
              handleCurrentVal={this.props.handleCurrentVal}
              currentVal={this.props.currentVal} />
              <PieChart
              legend={false}
              className='pie-chart'
              donut={true}
              width="450px"
              prefix="$"
              data={this.props.transactions.map(transaction => [transaction.stock_symbol, transaction.cost])}/>
              </div>

            }
            </div>



      ) : <NewsFeed newsFeed={this.props.newsFeed}/>
      }
      </div>
    );
  }

}

export default UserAccount;
