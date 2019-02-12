import React from 'react'

const SearchStocks = (props) => {
  return (
    <div id="app-header">
    {
      props.isLoggedIn?
      <button id="login-button" onClick={props.handleLogout}>Logout</button>
      :
      <button id="login-button" onClick={props.toggleLoginDisplay}>Login/Create Account</button>
    }
      <input id="search-input"
        autoComplete="off"
        type="text"
        onChange={props.handleStockFilter}
        placeholder='Type to Search Stocks'
      />
      Sort By :
      <select id="sort-input"
      onChange={props.handleSort}>
        <option value="A-Z">Alphabetical (A-Z)</option>
        <option value="Z-A">Alphabetical (Z-A)</option>
      </select>
      Filter By :
      <select id="select-input" onChange={props.handleStockSector}>
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
       <img id="logo" alt="logo" src={ require("../similis.png") } />
    </div>

  )
}

export default SearchStocks


//       <img id="logo" src={ require("../similis.png") } />
