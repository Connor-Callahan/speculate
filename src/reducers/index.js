// import { combineReducers } from 'redux'
// import user from './user'
// import stocks from './stocks'
//
//
// const rootReducer = combineReducers({
//   stocks,
//   user,
// })
//
// export default rootReducer



// const defaultState = {
//   symbols: [],
//   stockFilter: '',
//   filtered: [],
//   stock: null,
//   profile: null,
//   chart: null,
//   icon: null,
//   newsFeed: [],
//   login: false,
//   username: null,
//   password: null
// }
//
// export default(state=defaultState, action) => {
//
//   switch(action.type) {
//     case 'FETCH_SYMBOLS':
//     return {...state, symbols: action.payload}
//     case 'HANDLE_STOCK_FILTER':
//     return {...state, stockFilter: action.payload}
//     case 'FILTER_SYMBOLS':
//     return {...state, filtered: action.payload}
//     case 'HANDLE_STOCK_DATA':
//     return {...state, stock: action.payload}
//     case 'HANDLE_STOCK_PROFILE':
//     return {...state, profile: action.payload}
//     case 'HANDLE_STOCK_CHART':
//     return {...state, chart: action.payload}
//     case 'HANDLE_STOCK_ICON':
//     return {...state, icon: action.payload}
//     case 'HANDLE_NEWS_FEED':
//     return {...state, newsFeed: action.payload}
//     case 'HANDLE_USER_LOGIN':
//     return {...state, login: action.payload}
//     case 'HANDLE_USERNAME':
//     return {...state, username: action.payload}
//     case 'HANDLE_PASSWORD':
//     return {...state, password: action.payload}
//     default:
//
//     return state
//   }
// }
