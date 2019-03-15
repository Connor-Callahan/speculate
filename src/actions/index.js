
const fetchSymbols = (symbols) => {
  return {
    type:'FETCH_SYMBOLS',
    payload: symbols
  }
}

const searchSymbols = (event) => {
  {
    type:'FILTER_SEARCH',
    payload: event.target.value
  }
}

const sortSymbols = (sort) => {
  return {
    type:'ALPHA_SORT',
    payload: sort
  }
}
