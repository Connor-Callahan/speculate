import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    filtered: state.filtered,
    sorted: state.sorted,
    userChart: state.userChart
  }
}


class TransactionChart extends Component {

  render() {
    console.log(this.props.userChart)
    return (
      <div>
        <div id="transaction-chart">
        {
          this.props.userChart.length > 0 ?
          <ColumnChart
          height="200px"
          padding="20px"
          // xtitle="Company"
          // ytitle="Number of Shares"
          data={this.props.userChart.map(transaction => [transaction.stock_symbol, transaction.cost])} />
          :
          null
        }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps  )(TransactionChart)
