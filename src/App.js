import React, { Component } from 'react';
import './css/App.css';
import './css/ProfileCard.css';
import './css/UserAccount.css';
import './css/SearchStocks.css';
import './css/Navigation.css';
import StockList from './containers/StockList'
import LoginForm from './components/LoginForm'
import Navbar from './containers/Navbar'
import UserAccount from './containers/UserAccount'
import SearchStocks from './components/SearchStocks'
import Landing from './containers/Landing'


import {connect} from 'react-redux'

import { fetchSymbols } from './actions'


const mapStateToProps = (state) => {
  return {
    symbols: state.stock.symbols,
    stockFilter: state.stock.stockFilter,
    login: state.user.login,
    loggedIn: state.user.loggedIn
  }
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
      this.props.fetchSymbols(data)
    })
  }


  render() {
    return (
      <div className="App">
      <Navbar/>
      {
        this.props.login && this.props.loggedIn === false ?
        <LoginForm />
        :
        <UserAccount />
      }
      
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
