import React, { Component } from 'react';
import {connect} from 'react-redux'

import { selectStock, setProfile, setChart, setIcon } from '../actions'

const API_KEY = process.env.REACT_APP_IEX_API_KEY;

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
    const selectedStockProfile = await fetch(`https://cloud.iexapis.com/stable/stock/${target.id}/company?token=${API_KEY}`)
    .then(r => r.json())
    const selectedStock = await fetch(`https://cloud.iexapis.com/stable/stock/${target.id}/quote?token=${API_KEY}`)
    .then(r => r.json())
    const selectedChart = await fetch(`https://cloud.iexapis.com/stable/stock/${target.id}/chart?token=${API_KEY}`)
    .then(r => r.json())
    this.props.handleFilter(null)
    this.props.selectStock(selectedStock)
    this.props.setProfile(selectedStockProfile.description)
    this.props.setChart(selectedChart)
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
