import React, { Component } from 'react';
import './App.css';
import './ProfileCard.css';
import './UserAccount.css';
import StockList from './containers/StockList'
import Login from './containers/Login'
import UserAccount from './containers/UserAccount'
import SearchStocks from './components/SearchStocks'

import {connect} from 'react-redux'


const mapStateToProps = (state) => {
  return {
    symbols: state.symbols,
    stockFilter: state.stockFilter,
    id: state.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    symbols: (data) => dispatch({type:'FETCH_SYMBOLS', payload:data}),
    handleNewsFeed: (newsFeed) => dispatch( {type:'HANDLE_NEWS_FEED', payload:newsFeed}),
    handleUserTransactions: (transactions) => dispatch( {type:'FETCH_TRANSACTIONS', payload:transactions})
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
    fetch('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=v7lE9QjGViDovQFmJUTfCbfD1vUaeA4w')
      .then(r => r.json())
      .then(data => {
        this.props.handleNewsFeed(data.results)
    })
  }

  fetchTransactions = () => {
    let transactions = []
    fetch('http://localhost:3000/api/v1/transactions/')
    .then(r => r.json())
    .then(data => {
      console.log(data)
      transactions = data.filter(transaction => transaction.user_id === this.props.id)
      this.props.handleUserTransactions(transactions)
    })
  }


  render() {
    return (
      <div className="App">
      <SearchStocks />
      <StockList fetchTransactions={this.fetchTransactions}/>
      <UserAccount />
      <Login fetchTransactions={this.fetchTransactions}/>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
