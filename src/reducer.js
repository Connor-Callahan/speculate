
const defaultState = {
  symbols: [],
  stockFilter: '',
  filtered: [],
  stock: null,
  profile: null,
  chart: null,
  icon: null,
}

function reducer(state=defaultState, action){

  switch(action.type) {
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
    default:

    return state
  }
}

export default reducer;
