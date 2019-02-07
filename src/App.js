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
    user_id: 1,
    firstname: 'joe',
    lastname: null,
    username: null,
    password: null,
    age: null,
    income: null,
    job: null,
    balance: 15000,
    orderSize: null,
    transactions: [],
    bought: [],
    currentVal: null,
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

// sorting stocks alphabetically
  handleSort = (e) => {
    e.persist()
    let sortedStocks = this.state.stockSymbols.slice()
    if(e.target.value === 'Z-A') {
      this.setState({
        stockSymbols: sortedStocks.reverse()
      })
    }
    else if(e.target.value === 'A-Z') {
      this.setState({
        stockSymbols: sortedStocks.reverse()
      })
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
    console.log('yay')
    if(e.target.value === "All") {
      this.componentDidMount()
      this.setState({
        stockCategory: e.target.value
      })
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
    console.log('here')
      this.setState({
        loginContainer: true
      })
  }

  loginAccount = (e) => {
    e.preventDefault()

  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    })
  }

// sets state for all form inputs **user login and buy/sell transactions
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
    }, this.setState({
      isLoggedIn: true,
      loginContainer: false
    }), this.fetchTransactions())
    .then(r => r.json())
    .then(data => {
      this.setState({
        user_id: data.id
      })
    }, this.fetchTransactions())
  }


  handleTransaction = async (e) => {
    e.preventDefault()
    e.persist()
    let price = await fetch(`https://api.iextrading.com/1.0/stock/${this.state.selectedStock.quote.symbol}/batch?types=quote,news`)
    .then(r => r.json())

    let totalCost = (price.quote.latestPrice * this.state.orderSize).toFixed(2)

    e.target.id === 'buy' && this.state.balance < totalCost ?
      console.log('out of moneyy')
    :
      fetch('http://localhost:3000/api/v1/transactions/', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          stock_symbol: this.state.selectedStock.quote.symbol,
          num_shares: this.state.orderSize,
          price: price.quote.latestPrice,
          cost: totalCost,
          commission: 7,
          order_type: e.target.id,
          date_time: price.quote.latestTime
        })
      }, this.fetchTransactions())
    }



    fetchTransactions = () => {
        fetch('http://localhost:3000/api/v1/transactions/')
        .then(r => r.json())
        .then(data => {
          let userTransactions = data.filter(transaction => transaction.user_id === this.state.user_id)
          this.setState({
            transactions: userTransactions,
            currentVal: null
          })
        })
      }

  sortPortfolio = (e) => {
    let sortedTransactions = this.state.transactions.slice()
    switch (e.target.id) {
      case 'symbol':
      sortedTransactions = sortedTransactions.sort(function(a, b) {
        return a.stock_symbol.localeCompare(b.stock_symbol)
      })
        break;
      case 'price':
      sortedTransactions = sortedTransactions.sort(function(a, b) {
        return b.price - a.price
      })
        break;
      case 'num_shares':
      sortedTransactions = sortedTransactions.sort(function(a, b) {
        return b.num_shares - a.num_shares
      })
        break;
      case 'cost':
      sortedTransactions = sortedTransactions.sort(function(a, b) {
        return b.cost - a.cost
      })
        break;
      default:
    }
  }

  handleCurrentVal = () => {
    let bought = this.state.transactions.filter(transaction => {
      return transaction.order_type === 'buy'
    })

    let duplicate = null

    for(let i = 0; i < bought.length; i++) {
      if(duplicate == null) {
        duplicate = bought[i].stock_symbol
      } else if (duplicate == bought[i].stock_symbol)
        duplicate = bought[i]
    }

    let nonDuplicates = bought.filter(transaction => {
      return transaction != duplicate
    })

    nonDuplicates.map(transaction => {
      if(transaction.stock_symbol === duplicate.stock_symbol){
        transaction.num_shares = transaction.num_shares + duplicate.num_shares
        transaction.cost = transaction.cost + duplicate.cost
      }
    })

    console.log('here', nonDuplicates)


    let currentPort = nonDuplicates.map(transaction => {
      return transaction.stock_symbol
    })
    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${currentPort}&types=quote&range=1m&last=5`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        currentVal: data,
        bought: nonDuplicates
      })
    })
  }

  render() {
    console.log(this.state.user_id)
    return (
      <div className="App">
      <SearchStocks
      toggleLoginDisplay={this.toggleLoginDisplay}
      handleLogout={this.toggleLoginDisplay}
      handleSort={this.handleSort}
      handleStockSector={this.handleStockSector}
      handleStockFilter={this.handleStockFilter}
      stockSymbols={this.state.stockSymbols}
      isLoggedIn={this.state.isLoggedIn}
      />
      <UserAccount
      bought={this.state.bought}
      sortPortfolio={this.sortPortfolio}
      newsFeed={this.state.newsFeed}
      isLoggedIn={this.state.isLoggedIn}
      transactions={this.state.transactions}
      handleCurrentVal={this.handleCurrentVal}
      currentVal={this.state.currentVal}
      fetchTransactions={this.fetchTransactions}
      />
      <ProfileCard
      toggleStockDisplay={this.toggleStockDisplay}
      isLoggedIn={this.state.isLoggedIn}
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
