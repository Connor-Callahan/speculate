import React from 'react'

const SearchStocks = (props) => {

  return (
    <div>
      <input id="search-input"
        type="text"
        onChange={props.handleStockFilter}
        placeholder='Type to Search Stocks'
      />
    </div>
  )
}

export default SearchStocks
