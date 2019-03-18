const defaultState = {
  login: false,
  username: null,
  password: null,
  firstname: null,
  lastname: null,
  balance: null,
  id: null,
  loggedIn: false
}

export default(state=defaultState, action) => {

  switch(action.type) {
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

    default:
    
    return state
  }
}
