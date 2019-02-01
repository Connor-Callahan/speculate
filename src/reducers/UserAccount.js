
const defaultState = {
  firstname: null,
  lastname: null,
  username: null,
  password: null,
  age: null,
  income: null,
  job: null,
  balance: null
}

function reducer(state=defaultState, action){
  console.log(action)
  switch (action.type) {
    case 'SOMETHING':
    return {...state, somethingNew: 'value'}
      break;
    default:
      return state
  }
}

export default reducer;
