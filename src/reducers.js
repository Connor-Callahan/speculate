
const defaultState = {
  symbols: [],
  stockFilter: '',
  stock: null,
  profile: null,
  chart: null,
  userChart: [],
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
  cumulative: null,
  portfolio: null,
  id: null,
  transactions: [],
  index: 10,
  filtered: null,
  sector: null,
  sorted: null,
  alphaSort: null
}

export default(state=defaultState, action) => {

  switch(action.type) {
    case 'FETCH_SYMBOLS':
    return {...state, symbols: action.payload}
    case 'HANDLE_ALPHA_SORT':
    return {...state, symbols: action.payload}
    case 'HANDLE_STOCK_FILTER':
    return {...state, stockFilter: action.payload}
    case 'FILTER_SYMBOLS':
    return {...state, filtered: action.payload}
    case 'HANDLE_STOCK_SECTOR':
    return {...state, sector: action.payload}
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
    // User login ------------>
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
    // Portfolio -------------->
    case 'HANDLE_CURRENT_VALUE':
    return {...state, value: action.payload}
    case 'HANDLE_CUMULATIVE_VALUE':
    return {...state, cumulative: action.payload}
    case 'HANDLE_CURRENT_PORT':
    return {...state, portfolio: action.payload}
    case 'HANDLE_USER_ID':
    return {...state, id: action.payload}
    case 'HANDLE_LOGGED_IN':
    return {...state, loggedIn: action.payload}
    // transaction
    case 'FETCH_TRANSACTIONS':
    return {...state, transactions: action.payload}
    case 'HANDLE_TRANSACTION':
    return {...state, orderSize: action.payload}
    case 'ADD_TRANSACTION':
    return {...state,
      transactions: [...state.transactions, action.payload]
    }
    case 'SORT_TRANSACTIONS':
    return {...state, sorted: action.payload}
    case 'HANDLE_FILTER':
    return {...state, filtered: action.payload}
    case 'HANDLE_INDEX':
    return {...state, index: action.payload}
    case 'HANDLE_USER_CHART':
    return {...state, userChart: action.payload}

    default:

    return state
  }
}
