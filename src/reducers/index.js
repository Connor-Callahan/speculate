import { combineReducers } from 'redux'
import stocks from './stock'
import users from './user'
import transactions from './transaction'

export rootReducer = combineReducers({
  stock,
  user,
  transaction
})
