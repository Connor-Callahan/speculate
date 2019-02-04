import React, { Component } from 'react';
import NewsFeed from '../components/NewsFeed'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'


ReactChartkick.addAdapter(Chart)


class UserAccount extends Component {


  render() {
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
          {this.props.transactions.map(transaction => {
            return <tr>
            <td>{transaction.stock_symbol}</td>
            <td>${transaction.price}</td>
            <td>{transaction.num_shares}</td>
            <td>${transaction.cost}</td>
            </tr>
          })}
          </tbody>
          <PieChart
          donut={true}
          width="800px" height="auto"
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
