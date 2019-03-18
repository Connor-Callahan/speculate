const defaultState = {
  portfolio: null,
  value: null,
  cumulative: null,
  orderSize: null,
  transactions: [],
  index: 10,
  filtered: null,
  sorted: null,
  userChart: []
}

export default(state=defaultState, action) => {

  switch(action.type) {
    case 'CURRENT_PORTFOLIO':
    return {...state, portfolio: action.payload}
    case 'CURRENT_VALUE':
    return {...state, value: action.payload}
    case 'CUMULATIVE_VALUE':
    return {...state, cumulative: action.payload}
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
