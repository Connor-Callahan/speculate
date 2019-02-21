import React, { Component } from 'react';

class CurrentPortfolio extends Component {

  render() {


    return (
      <div className="table-data">
      <h1>Portfolio</h1>
      <h4>Balance : ﹩{this.props.balance}</h4>
      <h4>Portfolio Value : ﹩{this.props.cumVal}</h4>
      <button className="portfolio-button" onClick={this.props.fetchTransactions}>All Transactions</button>
      <table className="user-portfolio">
       <tbody>
        <tr>
          <th>
            <h2 id="symbol" onClick={this.props.sortPortfolio}>
              Symbol
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

      {this.props.bought.map(transaction => {
        let totalVal = transaction.currentStockVal
        let totalCost = (transaction.cost).toFixed(2)
        return <tr>
        <td>{transaction.stock_symbol}</td>
        <td>{transaction.num_shares}</td>
        <td>${totalCost}</td>
        <td>${totalVal}</td>
        </tr>
      })}
      </tbody>

    </table>
      </div>
    );
  }

}

export default CurrentPortfolio;
