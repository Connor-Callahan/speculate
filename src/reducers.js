
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
    // Stock Data/Presentation ---->
    case 'FETCH_SYMBOLS':
    return {...state, symbols: action.payload}
    case 'ALPHA_SORT':
    return {...state, symbols: action.payload}
    case 'FILTER_SEARCH':
    return {...state, stockFilter: action.payload}
    case 'FILTER_SYMBOLS':
    return {...state, filtered: action.payload}
    case 'FILTER_SECTOR':
    return {...state, sector: action.payload}
    case 'SELECT_STOCK':
    return {...state, stock: action.payload}
    case 'STOCK_PROFILE':
    return {...state, profile: action.payload}
    case 'STOCK_CHART':
    return {...state, chart: action.payload}
    case 'STOCK_ICON':
    return {...state, icon: action.payload}
    // User login ------------>
    case 'USER_LOGIN':
    return {...state, login: action.payload}
    case 'USERNAME':
    return {...state, username: action.payload}
    case 'PASSWORD':
    return {...state, password: action.payload}
    case 'FIRST_NAME':
    return {...state, firstname: action.payload}
    case 'LAST_NAME':
    return {...state, lastname: action.payload}
    case 'USER_BALANCE':
    return {...state, balance: action.payload}
    case 'USER_ID':
    return {...state, id: action.payload}
    case 'LOGGED_IN':
    return {...state, loggedIn: action.payload}
    // Portfolio -------------->
    case 'CURRENT_PORTFOLIO':
    return {...state, portfolio: action.payload}
    case 'CURRENT_VALUE':
    return {...state, value: action.payload}
    case 'CUMULATIVE_VALUE':
    return {...state, cumulative: action.payload}
    // Transaction --------------->
    case 'CREATE_TRANSACTION':
    return {...state, orderSize: action.payload}
    case 'ADD_TRANSACTION':
    return {...state,
      transactions: [...state.transactions, action.payload]
    }
    case 'FETCH_TRANSACTIONS':
    return {...state, transactions: action.payload}
    case 'SORT_TRANSACTIONS':
    return {...state, sorted: action.payload}
    case 'SET_FILTER':
    return {...state, filtered: action.payload}
    case 'SET_INDEX':
    return {...state, index: action.payload}
    case 'USER_CHART':
    return {...state, userChart: action.payload}

    default:

    return state
  }
}
