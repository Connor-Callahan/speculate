import React, { Component } from 'react';
import './App.css';
import './ProfileCard.css';
import './UserAccount.css';
import StockList from './containers/StockList'
import SearchStocks from './components/SearchStocks'
import ProfileCard from './components/ProfileCard'

import {connect} from 'react-redux'


const mapStateToProps = (state) => {
  return {
    symbols: state.symbols,
    stockFilter: state.stockFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    symbols: (data) => dispatch({type:'FETCH_SYMBOLS', payload:data}),
  }
}

class App extends Component {


// initial retrieval of all stocks, --object with name and ticker symbol
  componentDidMount(){
    fetch('https://api.iextrading.com/1.0/ref-data/symbols')
    .then(r => r.json())
    .then(data => {
      this.props.symbols(data)
    })
  }


  render() {
    return (
      <div className="App">
      <SearchStocks />
      <StockList />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
