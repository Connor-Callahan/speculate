import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

const mapStateToProps = (state) => {
  return {
    transactions: state.transaction.transactions,
    filtered: state.transaction.filtered,
    sorted: state.transaction.sorted,
    userChart: state.transaction.userChart
  }
}


class TransactionChart extends Component {

  render() {
    return (
      <div>
        <div>
        {
          this.props.userChart.length > 0 ?
          <ColumnChart
          height="175px"
          padding="20px"
          colors={["#f6ab02"]}
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
