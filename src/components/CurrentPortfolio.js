import React, { Component } from 'react';

class CurrentPortfolio extends Component {

  render() {


    return (
      <div className="table-data">
      <h1>Portfolio</h1>
      {
        this.props.currentVal?
        <p>hi</p>
        :
        <p>poop</p>
      }
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

      {this.props.bought.map(transaction => {
        return <tr>
        <td>{transaction.stock_symbol}</td>
        <td>${transaction.price}</td>
        <td>{transaction.num_shares}</td>
        <td>${transaction.cost}</td>
        <td>${transaction.currentStockVal}</td>
        </tr>
      })}
      </tbody>

    </table>
      <button onClick={this.props.handleCurrentVal}>refresh</button>
      </div>
    );
  }

}

export default CurrentPortfolio;
