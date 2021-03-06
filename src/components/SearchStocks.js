import React, { Component } from 'react'
import {connect} from 'react-redux'
import StockList from '../containers/StockList'
import Transaction from './Transaction'

import { searchSymbols, sortSymbols, filterSector, stockSearch } from '../actions'

const API_KEY = process.env.REACT_APP_IEX_API_KEY;

const mapStateToProps = (state) => {
  return {
    symbols: state.stock.symbols,
    sector: state.stock.sector,
    stockFilter: state.stock.stockFilter,
    stockSearch: state.stock.stockSearch,
    transDash: state.transaction.transDash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchSymbols: (event) => dispatch(searchSymbols(event)),
    filterSector: (sector) => dispatch(filterSector(sector)),
    sortSymbols: (sort) => dispatch(sortSymbols(sort)),
    toggleSearch: (position) => dispatch(stockSearch(position)),
  }
}

class SearchStocks extends Component {

  handleStockSector = async (e) => {
    if(e.target.value !== 'All') {
      const selectedSector = await fetch(`https://cloud.iexapis.com/stable/stock/market/collection/sector?collectionName=Technology?token=${API_KEY}`)
      .then(r => r.json())
      for(let i = 0; i < selectedSector.length; i++) {
        selectedSector[i].name = selectedSector[i].companyName
      }
      const filter = selectedSector.filter(sector => sector.marketCap > 17000000000)
      this.props.filterSector(filter)
    } else {
      this.props.filterSector(null)
    }
  }

  handleSort = (e) => {
  e.persist()
  let sortedStocks = null
  this.props.sector != null ? sortedStocks = this.props.sector.slice().map(o => ({ ...o })) : sortedStocks = this.props.symbols.slice().map(o => ({ ...o }))
  if(e.target.value === 'Z-A') {
    this.props.sortSymbols(sortedStocks.reverse())
  }
  else if(e.target.value === 'A-Z') {
    this.props.sortSymbols(sortedStocks.reverse())
  }
}

  render() {

    const showSearch = this.props.stockSearch || this.props.transDash ? "search": "null"

    return (
      <div className={`${showSearch}-container`}>
      {
        this.props.stockSearch ?
        <div >
        <button id="close-search" onClick={() => this.props.toggleSearch(false)}>Close Search</button>

          <input
          id="search-input"
          autoComplete="off"
          type="text"
          onChange={this.props.searchSymbols}
          value={this.props.stockFilter}
          placeholder='Type to Search Stocks'
          />
          Sort By :
          <select id="sort-input"
          onChange={this.handleSort}>
              <option value="A-Z">(A-Z)</option>
              <option value="Z-A">(Z-A)</option>
          </select>
          Filter By :
          <select className="select-input"
          onChange={this.handleStockSector}>
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

          <StockList />
        </div>
        :
        <Transaction />
      }
      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStocks)
