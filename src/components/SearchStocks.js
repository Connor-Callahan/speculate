import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    symbols: state.symbols,
    stockFilter: state.stockFilter,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleStockFilter: (event) => dispatch({type:'HANDLE_STOCK_FILTER', payload: event.target.value}),
    handleSector: (data) => dispatch({type:'HANDLE_STOCK_SECTOR', payload: data}),
    handleSymbols: (alphaSort) => dispatch({type:'HANDLE_ALPHA_SORT', payload: alphaSort})
  }
}

class SearchStocks extends Component {

  handleStockSector = async (e) => {
    const selectedSector = await fetch(`https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=${e.target.value}`)
      .then(r => r.json())
    for(let i = 0; i < selectedSector.length; i++) {
      selectedSector[i].name = selectedSector[i].companyName
    }
    const sectorFilter = selectedSector.filter(sector => sector.marketCap > 17000000000)
    this.props.handleSector(sectorFilter)
  }

  handleSort = (e) => {
  e.persist()
  let sortedStocks = this.props.symbols.slice().map(o => ({ ...o }))
  if(e.target.value === 'Z-A') {
    this.props.handleSymbols(sortedStocks.reverse())
  }
  else if(e.target.value === 'A-Z') {
    this.props.handleSymbols(sortedStocks.reverse())
  }
}

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
      Sort By :
      <select id="sort-input"
      onChange={this.handleSort}>
        <option value="A-Z">Alphabetical (A-Z)</option>
        <option value="Z-A">Alphabetical (Z-A)</option>
      </select>
      Filter By :
      <select id="select-input" onChange={this.handleStockSector}>
        <option  value="All">All</option>
        <option  value="Communication%20Services">Communication Services</option>
        <option  value="Consumer%20Discretionary">Consumer Discretionary</option>
        <option  value="Consumer%20Staples">Consumer Staples</option>
        <option  value="Energy">Energy</option>
        <option  value="Financials">Financials</option>
        <option  value="Health%20Care">Healthcare</option>
        <option  value="Materials">Materials</option>
        <option  value="Technology">Technology</option>
      </select>

      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStocks)
