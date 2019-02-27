import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    handleStock: (selectedStock) => dispatch( {type:'HANDLE_STOCK_DATA', payload:selectedStock}),
    profile: (selectedStockProfile) => dispatch( {type:'HANDLE_STOCK_PROFILE', payload:selectedStockProfile}),
    chart: (selectedChart) => dispatch( {type:'HANDLE_STOCK_CHART', payload:selectedChart}),
    handleIcon: (stockIcon) => dispatch( {type:'HANDLE_STOCK_ICON', payload:stockIcon}),
    handleFilter: (filtered) => dispatch( {type:'HANDLE_FILTER', payload:filtered}),
  }
}

const mapStateToProps = (state) => {
  return {
    stock: state.stock
  }
}

class StockProfile extends Component {


  handleSelectStock = async ({target}) => {
    const selectedStock = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/batch?types=quote,news,chart&range=1m&last=10`)
    .then(r => r.json())
    const selectedStockProfile = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/company`)
    .then(r => r.json())
    const selectedChart = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/chart/`)
    .then(r => r.json())
    const stockIcon = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/logo`)
    .then(r => r.json())
    this.props.handleFilter(null)
    this.props.handleIcon(stockIcon)
    this.props.profile(selectedStockProfile)
    this.props.chart(selectedChart)
    this.props.handleStock(selectedStock)
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
