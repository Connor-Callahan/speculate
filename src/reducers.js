
const defaultState = {
  symbols: [],
  stockFilter: '',
  filtered: [],
  stock: null,
  profile: null,
  chart: null,
  icon: null,
  newsFeed: [],
  login: false,
  loggedIn: false,
  username: null,
  password: null,
  orderSize: null,
  firstname: null,
  lastname: null,
  balance: null,
  value: null,
  portfolio: null,
  id: null,
  transactions: [],
  filtered: [],
  filter: 'all',
  sort: null
}

export default(state=defaultState, action) => {

  switch(action.type) {
    // Stock Information (SearchStocks.js, ProfileCard.js)
    case 'FETCH_SYMBOLS':
    return {...state, symbols: action.payload}
    case 'HANDLE_STOCK_FILTER':
    return {...state, stockFilter: action.payload}
    case 'FILTER_SYMBOLS':
    return {...state, filtered: action.payload}
    case 'HANDLE_STOCK_DATA':
    return {...state, stock: action.payload}
    case 'HANDLE_STOCK_PROFILE':
    return {...state, profile: action.payload}
    case 'HANDLE_STOCK_CHART':
    return {...state, chart: action.payload}
    case 'HANDLE_STOCK_ICON':
    return {...state, icon: action.payload}
    case 'HANDLE_NEWS_FEED':
    return {...state, newsFeed: action.payload}
    // User login (Login.js, LoginForm.js, UserAccount.js)
    case 'HANDLE_USER_LOGIN':
    return {...state, login: action.payload}
    case 'HANDLE_USERNAME':
    return {...state, username: action.payload}
    case 'HANDLE_PASSWORD':
    return {...state, password: action.payload}
    case 'HANDLE_FIRST_NAME':
    return {...state, firstname: action.payload}
    case 'HANDLE_LAST_NAME':
    return {...state, lastname: action.payload}
    case 'HANDLE_USER_BALANCE':
    return {...state, balance: action.payload}
    case 'HANDLE_CURRENT_VALUE':
    return {...state, value: action.payload}
    case 'HANDLE_CURRENT_PORT':
    return {...state, portfolio: action.payload}
    case 'HANDLE_USER_ID':
    return {...state, id: action.payload}
    case 'HANDLE_LOGGED_IN':
    return {...state, loggedIn: action.payload}
    // transaction (transaction.js)
    case 'HANDLE_TRANSACTION':
    return {...state, orderSize: action.payload}
    case 'ADD_TRANSACTION':
    return {...state, transactions: action.payload}
    case 'FETCH_TRANSACTIONS':
    return {...state, transactions: action.payload}
    case 'SET_SORT':
    return {...state, sort: action.payload}
    case 'HANDLE_FILTER':
    return {...state, filtered: action.payload}
    case 'SET_FILTER':
    return {...state, filter: action.payload}

    default:

    return state
  }
}
