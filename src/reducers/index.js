import { combineReducers } from 'redux'
import stock from './stock'
import user from './user'
import transaction from './transaction'

const rootReducer = combineReducers({
  stock,
  user,
  transaction
})

export default rootReducer
