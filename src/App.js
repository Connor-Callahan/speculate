import React, { Component } from 'react';
import './App.css';
import './ProfileCard.css';
import './UserAccount.css';

import ProfileList from './containers/ProfileList'
import ProfileCard from './containers/ProfileCard'
import UserAccount from './containers/UserAccount'

import SearchStocks from './components/SearchStocks'
import LoginForm from './components/LoginForm'

class App extends Component {

  state = {
    stockSymbols: [],
    stockFilter: '',
    sortBy: '',
    stockCategory: null,
    selectedStock: null,
    selectedStockProfile: null,
    selectedChartRange: '1m',
    selectedChart: null,
    stockIcon: null,
    loginContainer: false,
    isLoggedIn: false,
    user_id: 4,
    firstname: 'joe',
    lastname: null,
    username: null,
    password: null,
    age: null,
    income: null,
    job: null,
    balance: null,
    buyOrder: null,
    sellOrder: null,
    transactions: [],
    newsFeed: []
  }

// initial retrieval of all stocks, --object with name and ticker symbol
  componentDidMount(){
    fetch('https://api.iextrading.com/1.0/ref-data/symbols')
    .then(r => r.json())
    .then(data => {
        this.setState({
          stockSymbols: data
        })
    })
    fetch('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=v7lE9QjGViDovQFmJUTfCbfD1vUaeA4w')
    .then(r => r.json())
    .then(data => {
      this.setState({
        newsFeed: data.results
      })
    })
  }

  handleStockFilter = (e) => {
    this.setState({
      stockFilter: e.target.value,
      selectedStock: null
    })
  }

  handleSort = (e) => {
    this.setState({
      sortBy: e.target.value
    })
    this.sortStockList()
  }

  sortStockList = () => {
    let sortedStocks = this.state.stockSymbols.slice()
    if(this.state.sortBy === 'Z-A') {
      this.setState({
        stockSymbols: sortedStocks.reverse()
      })
    }
    else if(this.state.sortBy === 'A-Z') {
      console.log('do nothing')
    }
  }

// retrieving individual stock info (few different endpoints for headerinfo/description,graph/chart,logo)
  handleSelectStock = async ({target}) => {
    const selectedStock = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/batch?types=quote,news,chart&range=1m&last=10`)
    .then(r => r.json())
    const selectedStockProfile = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/company`)
    .then(r => r.json())
    const selectedChart = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/chart/`)
    .then(r => r.json())
    const stockIcon = await fetch(`https://api.iextrading.com/1.0/stock/${target.id}/logo`)
    .then(r => r.json())
    this.setState({
      selectedStock,
      selectedStockProfile,
      selectedChart,
      stockIcon: stockIcon.url
    })
  }

// for changing YTD, 1yr, 2yr chart etc. (set by id in ProfileCard button)
  handleSelectChart = (e) => {
    this.setState({
      selectedChartRange: e.target.id
    }, this.toggleSelectedChart)
  }

  toggleSelectedChart = async () => {
    const selectedChart = await fetch(`https://api.iextrading.com/1.0/stock/${this.state.selectedStock.quote.symbol}/chart/${this.state.selectedChartRange}`)
    .then(r => r.json())
    this.setState({
      selectedChart: selectedChart
    })
  }

  toggleStockDisplay = () => {
    this.setState({
      selectedStock: null
    })
  }

  filterStockSearch = () => {
    return this.state.stockSymbols.filter(stock => stock.symbol.toLowerCase().includes(this.state.stockFilter.toLowerCase()) || stock.name.toLowerCase().includes(this.state.stockFilter.toLowerCase()))
  }

  handleStockSector = (e) => {
    if(e.target.value === "All") {
      console.log("handle all")
    } else {
      this.setState({
        stockCategory: e.target.value
      },() => this.toggleStockCategory())
    }
  }

  toggleStockCategory = async () => {
    const selectedSector = await fetch(`https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=${this.state.stockCategory}`)
      .then(r => r.json())
    for(let i = 0; i < selectedSector.length; i++) {
      selectedSector[i].name = selectedSector[i].companyName
    }
    const sectorFilter = selectedSector.filter(sector => sector.marketCap > 17000000000)
    this.setState({
      stockSymbols: sectorFilter
    })
  }

  toggleLoginDisplay = () => {
    if(this.state.loginContainer === false) {
      this.setState({
        loginContainer: true
      })
    } else {
      this.setState({
        loginContainer: false
      })
    }
  }

  loginAccount = (e) => {
    e.preventDefault()

  }

  handleFormInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })

  }

  createAccount = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        username: this.state.username,
        password: this.state.password,
        age: this.state.age,
        income: this.state.income,
        job: this.state.job,
        balance: this.state.balance
      })
    })
  }

  handleTransaction = async (e) => {
    e.preventDefault()
    console.log('transact')
    let price = await fetch(`https://api.iextrading.com/1.0/stock/${this.state.selectedStock.quote.symbol}/batch?types=quote,news`)
    .then(r => r.json())

    let totalCost = (price.quote.latestPrice * this.state.buyOrder).toFixed(2)

    console.log(totalCost)
    fetch('http://localhost:3000/api/v1/transactions/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.username,
        num_shares: this.state.buyOrder,
        price: price.quote.latestPrice,
        cost: totalCost,
        commission: 7,
        order_type: 'buy',
        date_time: price.quote.latestTime
      })
    })
  }

// retrieve top business articles from nytimes api ---passed down to NewsFeed component in UserAccount container

    // retrieve top business articles from nytimes api ---passed down to NewsFeed component in UserAccount container





  render() {
    return (
      <div className="App">
      <SearchStocks
      toggleLoginDisplay={this.toggleLoginDisplay}
      handleSort={this.handleSort}
      handleStockSector={this.handleStockSector}
      handleStockFilter={this.handleStockFilter}
      stockSymbols={this.state.stockSymbols}
      />
      <UserAccount
      newsFeed={this.state.newsFeed}
      isLoggedIn={this.state.isLoggedIn}
      transactions={this.state.transactions}
      />
      <ProfileCard
      toggleStockDisplay={this.toggleStockDisplay}
      selectedStockProfile={this.state.selectedStockProfile}
      selectedStock={this.state.selectedStock}
      handleFormInput={this.handleFormInput}
      handleTransaction={this.handleTransaction}
      handleSelectChart={this.handleSelectChart}
      selectedChart={this.state.selectedChart}
      stockIcon={this.state.stockIcon}
      />
      <LoginForm
      loginAccount={this.loginAccount}
      createAccount={this.createAccount}
      handleFormInput={this.handleFormInput}
      loginContainer={this.state.loginContainer}
      toggleLoginDisplay={this.toggleLoginDisplay}
      />
      <ProfileList
      stockCategory={this.state.stockCategory}
      selectedStock={this.state.selectedStock}
      handleSelectStock={this.handleSelectStock}
      stockSymbols={this.filterStockSearch()}
      />
      </div>
    );
  }
}

export default App;
