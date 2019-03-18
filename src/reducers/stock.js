const defaultState = {
  symbols: [],
  stockFilter: '',
  stock: null,
  sector: null,
  profile: null,
  chart: null,
  icon: null
}

export default(state=defaultState, action) => {

  switch(action.type) {
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

    default:

    return state
  }
}
