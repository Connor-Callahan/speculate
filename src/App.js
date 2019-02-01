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
    firstname: null,
    lastname: null,
    username: 4,
    password: null,
    age: null,
    income: null,
    job: null,
    balance: null
  }

  componentDidMount(){
    fetch('https://api.iextrading.com/1.0/ref-data/symbols')
    .then(r => r.json())
    .then(data => {
        this.setState({
          stockSymbols: data
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

  render() {
    console.log(this.state.username)
    console.log(this.state.password)
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
      />
      <ProfileCard
      toggleStockDisplay={this.toggleStockDisplay}
      selectedStockProfile={this.state.selectedStockProfile}
      selectedStock={this.state.selectedStock}
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
