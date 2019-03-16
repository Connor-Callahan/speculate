
// Login.js -------->
export const fetchSymbols = (symbols) => {
  return {
    type:'FETCH_SYMBOLS',
    payload: symbols
  }
}

// SearchStocks.js ------>

export const searchSymbols = (event) => {
  return {
    type:'FILTER_SEARCH',
    payload: event.target.value
  }
}

export const sortSymbols = (sort) => {
  return {
    type:'ALPHA_SORT',
    payload: sort
  }
}

export const filterSector = (sector) => {
  return {
    type:'FILTER_SECTOR',
    payload: sector
  }
}

// StockProfile.js ---------->

export const selectStock = (stock) => {
  return {
    type:'SELECT_STOCK',
    payload: stock
  }
}

export const setProfile = (description) => {
  return {
    type:'STOCK_PROFILE',
    payload: description
  }
}

export const setChart = (chart) => {
  return {
    type:'STOCK_CHART',
    payload: chart
  }
}

export const setIcon = (icon) => {
  return {
    type:'STOCK_ICON',
    payload: icon
  }
}

// LoginForm.js ------------------------->

export const loginUser = (user) => {
  return {
    type:'USER_LOGIN',
    payload: user
  }
}

export const setUsername = (username) => {
  return {
    type: 'USERNAME',
    payload:username
  }
}

export const setPassword = (password) => {
  return {
    type: 'PASSWORD',
    payload:password
  }
}

export const setFirstname = (firstname) => {
  return {
    type: 'FIRST_NAME',
    payload: firstname
  }
}

export const setLastname = (lastname) => {
  return {
    type: 'LAST_NAME',
    payload: lastname
  }
}

export const setUserID = (id) => {
  return {
    type: 'USER_ID',
    payload: id
  }
}

export const setBalance = (balance) => {
  return {
    type: 'USER_BALANCE',
    payload: balance
  }
}

export const loggedIn = (login) => {
  return {
    type: 'LOGGED_IN',
    payload:login
  }
}
