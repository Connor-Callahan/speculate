import React, { Component } from 'react';
import {connect} from 'react-redux'

import { selectStock, setProfile, setChart, setIcon } from '../actions'


const mapDispatchToProps = (dispatch) => {
  return {
    selectStock: (stock) => dispatch(selectStock(stock)),
    setProfile: (description) => dispatch(setProfile(description)),
    setChart: (chart) => dispatch(setChart(chart)),
    handleFilter: (filtered) => dispatch( {type:'HANDLE_FILTER', payload:filtered}),
  }
}

const mapStateToProps = (state) => {
  return {
    stock: state.stock.stock
  }
}

class StockProfile extends Component {


  handleSelectStock = async ({target}) => {
    console.log('here')
    const selectedStock = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/batch?types=quote,news,chart&range=1m&last=10`)
    .then(r => r.json())
    const selectedStockProfile = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/company`)
    .then(r => r.json())
    const selectedChart = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/chart/`)
    .then(r => r.json())
    console.log(selectedStock, selectedStockProfile, selectedChart)
    this.props.handleFilter(null)
    this.props.setProfile(selectedStockProfile)
    this.props.setChart(selectedChart)
    this.props.selectStock(selectedStock)
  }

  render() {

    return (
      <div
      onClick={this.handleSelectStock}>
      <h1 id={this.props.symbol}>{this.props.name}</h1>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(StockProfile)
