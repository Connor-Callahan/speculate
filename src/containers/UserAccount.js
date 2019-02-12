import React, { Component } from 'react';
import NewsFeed from '../components/NewsFeed'
import UserWelcome from '../components/UserWelcome'
import CurrentPortfolio from '../components/CurrentPortfolio'
import AllTransactions from '../components/AllTransactions'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'


ReactChartkick.addAdapter(Chart)

class UserAccount extends Component {

  render() {

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
        <div>
        {
          this.props.isLoggedIn ? (
            this.props.transactions.length > 0 ? (
              <div>
              {
                this.props.currentVal?
                <div>
                <PieChart
                legend={false}
                className='pie-chart'
                donut={true}
                width="450px"
                prefix="$"
                data={this.props.bought.map(transaction => [transaction.stock_symbol, transaction.cost])}/>
                <CurrentPortfolio
                balance={this.props.balance}
                bought={this.props.bought}
                sortPortfolio={this.props.sortPortfolio}
                fetchTransactions={this.props.fetchTransactions}
                handleCurrentVal={this.props.handleCurrentVal}
                cumVal={this.props.cumVal}
                currentVal={this.props.currentVal} />
                </div>
                :
                <div>
                <PieChart
                width="200px"
                legend={false}
                donut={true}
                prefix="$"
                data={this.props.transactions.map(transaction => [transaction.stock_symbol, transaction.cost])}/>
                <AllTransactions
                balance={this.props.balance}
                bought={this.props.transactions}
                sortPortfolio={this.props.sortPortfolio}
                handleCurrentVal={this.props.handleCurrentVal}
                currentVal={this.props.currentVal} />
                <div className="pie-chart">
                </div>
                </div>

              }
              </div>

            ) : <UserWelcome
            firstname={this.props.firstname}
            lastname={this.props.lastname}
            balance={this.props.balance}
            transactions={this.props.transactions}
            handleCurrentVal={this.props.handleCurrentVal}
            fetchTransactions={this.props.fetchTransactions}
            />

          ) : <NewsFeed newsFeed={this.props.newsFeed}/>
        }
</div>

      }
      </div>
    );
  }

}

export default UserAccount;
