import React, { Component } from 'react';
import './css/App.css';
import './css/ProfileCard.css';
import './css/UserAccount.css';
import './css/SearchStocks.css';
import StockList from './containers/StockList'
import Login from './containers/Login'
import UserAccount from './containers/UserAccount'
import SearchStocks from './components/SearchStocks'

import {connect} from 'react-redux'

import { fetchSymbols } from './actions'


const mapStateToProps = (state) => {
  return {
    symbols: state.stock.symbols,
    stockFilter: state.stock.stockFilter  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSymbols: (symbols) => dispatch(fetchSymbols(symbols))
  }
}

class App extends Component {


// initial retrieval of all stocks, --object with name and ticker symbol
  componentDidMount(){
    fetch('https://api.iextrading.com/1.0/ref-data/symbols')
    .then(r => r.json())
    .then(data => {
      console.log(data)
      this.props.fetchSymbols(data)
    })
  }


  render() {
    return (
      <div className="App">
      <UserAccount />
      <SearchStocks />
      <StockList />
      <Login />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
