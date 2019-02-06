import React, { Component } from 'react';

class UserTable extends Component {

  render() {


    return (
      <div className="table-data">
      {this.props.bought.map(transaction => {
        return <tr>
        <td>{transaction.stock_symbol}</td>
        <td>${transaction.price}</td>
        <td>{transaction.num_shares}</td>
        <td>${transaction.cost}</td>
        <td>${transaction.currentStockVal}</td>
        </tr>
      })}
      <button onClick={this.props.handleCurrentVal}>refresh</button>
      </div>
    );
  }

}

export default UserTable;
