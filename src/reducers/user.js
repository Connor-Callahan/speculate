
const defaultState = {
  login: false,
  username: null,
  password: null
}

export default(state=defaultState, action) => {
  switch(action.type) {
    case 'HANDLE_USER_LOGIN':
    return {...state, login: action.payload}
    case 'HANDLE_USERNAME':
    return {...state, username: action.payload}
    case 'HANDLE_PASSWORD':
    return {...state, password: action.payload}
    default:
    return state
  }
}
