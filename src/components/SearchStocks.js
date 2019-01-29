import React from 'react'

const SearchStocks = (props) => {

  return (
    <div>
      <input id="search-input"
        type="text"
        onChange={props.handleStockFilter}
        placeholder='Type to Search Stocks'
      />
      <select className="select-input" onChange={props.handleSort}>
        <option value="A-Z">Alphabetical(A-Z)</option>
        <option value="Z-A">Alphabetical(Z-A)</option>
      </select>
      <select className="select-input" onChange={props.handleStockSector}>
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

export default SearchStocks
