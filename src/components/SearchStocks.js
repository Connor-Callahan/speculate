import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    symbols: state.symbols,
    stockFilter: state.stockFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleStockFilter: (event) => dispatch({type:'HANDLE_STOCK_FILTER', payload: event.target.value})
  }
}

class SearchStocks extends Component {
  render() {
    return (
      <div id="app-header">

      <input
      id="search-input"
      autoComplete="off"
      type="text"
      onChange={this.props.handleStockFilter}
      value={this.props.stockFilter}
      placeholder='Type to Search Stocks'
      />

      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStocks)
