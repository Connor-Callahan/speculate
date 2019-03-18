import React, { Component } from 'react'
import {connect} from 'react-redux'

import { searchSymbols, sortSymbols, filterSector } from '../actions'

const mapStateToProps = (state) => {
  return {
    symbols: state.stock.symbols,
    stockFilter: state.stock.stockFilter,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchSymbols: (event) => dispatch(searchSymbols(event)),
    filterSector: (sector) => dispatch(filterSector(sector)),
    sortSymbols: (sort) => dispatch(sortSymbols(sort))
  }
}

class SearchStocks extends Component {

  handleStockSector = async (e) => {
    const selectedSector = await fetch(`https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=${e.target.value}`)
      .then(r => r.json())
    for(let i = 0; i < selectedSector.length; i++) {
      selectedSector[i].name = selectedSector[i].companyName
    }
    const filter = selectedSector.filter(sector => sector.marketCap > 17000000000)
    this.props.filterSector(filter)
  }

  handleSort = (e) => {
  e.persist()
  let sortedStocks = this.props.symbols.slice().map(o => ({ ...o }))
  if(e.target.value === 'Z-A') {
    this.props.sortSymbols(sortedStocks.reverse())
  }
  else if(e.target.value === 'A-Z') {
    this.props.sortSymbols(sortedStocks.reverse())
  }
}

  render() {
    return (
      <div id="search">

      <input
      id="search-input"
      autoComplete="off"
      type="text"
      onChange={this.props.searchSymbols}
      value={this.props.stockFilter}
      placeholder='Type to Search Stocks'
      />
      Sort By :
      <select className="select-input"
      onChange={this.handleSort}>
        <option value="A-Z">(A-Z)</option>
        <option value="Z-A">(Z-A)</option>
      </select>
      Filter By :
      <select className="select-input" onChange={this.handleStockSector}>
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
