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
    user_id: null,
    firstname: 'joe',
    lastname: null,
    username: null,
    password: null,
    balance: 150,
    orderSize: null,
    transactions: [],
    bought: [],
    sold: [],
    filterToggle: null,
    currentVal: null,
    cumVal: null,
    newsFeed: [],
    portDisplay: false
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

// select dropdown to filter stocks by category they represent ****determine method for ALL stocks(too many, too slow)
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

// toggle chart between YTD, 5Yr, 3yr, 1yr
  toggleSelectedChart = async () => {
    const selectedChart = await fetch(`https://api.iextrading.com/1.0/stock/${this.state.selectedStock.quote.symbol}/chart/${this.state.selectedChartRange}`)
    .then(r => r.json())
    this.setState({
      selectedChart: selectedChart
    })
  }

// closes stock display sets selectedStock to null
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

  toggleLoginDisplay = (e) => {
    e.preventDefault()
    if(this.state.loginContainer === false) {
      this.setState({
        loginContainer: true,
        selectedStock: null,
        blurOn: true
      })
    } else {
      this.setState({
        loginContainer: false,
        blurOn: false
      })
    }
  }

  loginAccount = async (e) => {
    e.preventDefault()
    const allUsernames = await fetch(`http://localhost:3000/api/v1/users/`)
    .then(r => r.json())

    const currentUser = allUsernames.find(user => {
      return user.username === this.state.username
    })

    if(currentUser) {
      this.setState({
        isLoggedIn: true,
        firstname: currentUser.first_name,
        lastname: currentUser.last_name,
        username: currentUser.username,
        balance: currentUser.balance,
        user_id: currentUser.id,
        loginContainer: false,
      })
    } else {
      alert('Username /or login incorrect, please try again.')
    }
    this.fetchTransactions()
  }

  handleLogout = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        balance: this.state.balance
      })
    })
    this.setState({
      isLoggedIn: false,
      loginContainer: false,
      user_id: null,
      firstname: 'joe',
      lastname: null,
      username: null,
      password: null,
      balance: null,
      orderSize: null,
      transactions: [],
      bought: [],
      currentVal: null,
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
        balance: this.state.balance
      })
    }, this.setState({
      isLoggedIn: true,
      loginContainer: false
    }))
    .then(r => r.json())
    .then(data => {
      this.setState({
        user_id: data.id
      })
    })
  }

  handleTransaction = async (e) => {
    e.preventDefault()
    e.persist()
    let price = await fetch(`https://api.iextrading.com/1.0/stock/${this.state.selectedStock.quote.symbol}/batch?types=quote,news`)
    .then(r => r.json())

    let totalCost = (price.quote.latestPrice * this.state.orderSize).toFixed(2)

    let currentStock = null

    currentStock = this.state.transactions.find(transaction => {
      return transaction.stock_symbol === this.state.selectedStock.quote.symbol
    })

    let numSold = []
    let numBought = []
    let boughtStock = null
    let soldStock = null
    let curStockShare = 0

    if(currentStock) {
      this.state.transactions.forEach(transaction => {
        if(transaction.order_type === 'sell') {
          let stock_symbol = transaction.stock_symbol
          let num_shares = transaction.num_shares
          let foundTransaction = numSold.find(transaction => {
            return transaction.stock_symbol === stock_symbol
          })
          if(foundTransaction) {
            foundTransaction.num_shares += num_shares
          } else {
            numSold.push(transaction)
          }
        } else {
          let stock_symbol = transaction.stock_symbol
          let num_shares = transaction.num_shares
          let foundTransaction = numBought.find(transaction => {
            return transaction.stock_symbol === stock_symbol
          })
          if(foundTransaction) {
            foundTransaction.num_shares += num_shares
          } else {
            numBought.push(transaction)
          }
        }
      })

      soldStock = numSold.find(transaction => {
        return transaction.stock_symbol === this.state.selectedStock.quote.symbol
      })

      boughtStock = numBought.find(transaction => {
       return transaction.stock_symbol === this.state.selectedStock.quote.symbol
     })
      if(soldStock) {
        if(e.target.id === 'sell' && soldStock) {
          curStockShare = boughtStock.num_shares - soldStock.num_shares
        }
        } else {
            curStockShare = boughtStock.num_shares - 0
          }
        }

    if(e.target.id === 'buy' && Number(this.state.balance) < totalCost) {
      alert('Insufficient funds! Please check your current balance.')
    } else if (e.target.id === 'buy') {
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
      })
      .then(r => r.json())
      .then(data => {
        this.setState({
          transactions: [...this.state.transactions, data],
        })
      })
      let adjustedBalance = this.state.balance - parseInt(totalCost)
      this.setState({
        balance: adjustedBalance
      })
    } else if (e.target.id === 'sell' && parseInt(this.state.orderSize, 10) <= curStockShare) {
      let adjustedBalance = this.state.balance + parseInt(totalCost, 10)
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
      })
      .then(r => r.json())
      .then(data => {
        this.setState({
          transactions: [...this.state.transactions, data],
          balance: adjustedBalance
        })
      })
    } else {
      alert('No shares available to trade!')
    }
    this.fetchTransactions()
  }

  portValue = () => {

  }

  fetchTransactions = () => {
    console.log('here')
        fetch('http://localhost:3000/api/v1/transactions/')
        .then(r => r.json())
        .then(data => {
          let userTransactions = data.filter(transaction => transaction.user_id === this.state.user_id)
          this.setState({
            transactions: userTransactions,
            currentVal: null,
            portDisplay: false,
            filterToggle: null
          })
        })
      }

// return the users portfolio (calculated on current purchased shares)
  handleCurrentVal = () => {
    this.fetchTransactions()
    let bought = this.state.transactions.filter(transaction => {
      return transaction.order_type === 'buy'
    })
    let sold = this.state.transactions.filter(transaction => {
      return transaction.order_type === 'sell'
    })

    let newBoughtArr = []
    let newSoldArr = []

    bought.forEach(transaction => {
      let stock_symbol = transaction.stock_symbol
      let num_shares = transaction.num_shares
      let price = transaction.price
      let cost = transaction.cost
      let foundTransaction = newBoughtArr.find(transaction => {
        return transaction.stock_symbol === stock_symbol
      })
        if(foundTransaction) {
          foundTransaction.cost += cost
          foundTransaction.price = price
          foundTransaction.num_shares += num_shares
        } else {
          newBoughtArr.push(transaction)
        }
      return newBoughtArr
    })

    sold.forEach(transaction => {
      let stock_symbol = transaction.stock_symbol
      let num_shares = transaction.num_shares
      let price = transaction.price
      let cost = transaction.cost
      let foundTransaction = newSoldArr.find(transaction => {
        return transaction.stock_symbol === stock_symbol
      })
        if(foundTransaction) {
          foundTransaction.cost += cost
          foundTransaction.price = price
          foundTransaction.num_shares += num_shares
        } else {
          newSoldArr.push(transaction)
        }
      return newSoldArr
    })

    let totalCurPort = []

    newBoughtArr.forEach(transaction => {
      let stock_symbol = transaction.stock_symbol
      let num_shares = transaction.num_shares
      let price = transaction.price
      let cost = transaction.cost
      let foundTransaction = newSoldArr.find(transaction => {
        return transaction.stock_symbol === stock_symbol
      })
      if(foundTransaction) {
        foundTransaction.cost =+ (cost - foundTransaction.cost).toFixed(2)
        foundTransaction.price = price
        foundTransaction.num_shares = num_shares - foundTransaction.num_shares
        totalCurPort.push(foundTransaction)
      } else {
        totalCurPort.push(transaction)
      }
    })

    let cumVal = null

    let portVal = totalCurPort.filter(transaction => {
      return transaction.num_shares > 0
    })

    let curPortVal = portVal.map(transaction => {
      return transaction.stock_symbol
    })
    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${curPortVal}&types=quote&range=1m&last=5`)
    .then(r => r.json())
    .then(data => {
      curPortVal.forEach(symbol => {
        cumVal += data[symbol].quote.latestPrice
      })
      this.setState({
        currentVal: data,
        cumVal: (cumVal).toFixed(2),
        bought: portVal,
        portDisplay: true,
        filterToggle: null
      })
    })
  }

  // for user account (sorts the tables --click event on the header) ****work to fix so the pie chart does not change color
    sortPortfolio = (e) => {
      let sortedTransactions = []
      if(this.state.portDisplay === true) {
         sortedTransactions = this.state.bought.slice()
      } else {
         sortedTransactions = this.state.transactions.slice()
      }
      switch (e.target.id) {
        case 'symbol':
        sortedTransactions.sort(function(a, b) {
          return a.stock_symbol.localeCompare(b.stock_symbol)
        })
          break;
        case 'price':
        sortedTransactions.sort(function(a, b) {
          return b.price - a.price
        })
          break;
        case 'num_shares':
        sortedTransactions.sort(function(a, b) {
          return b.num_shares - a.num_shares
        })
          break;
        case 'cost':
        sortedTransactions.sort(function(a, b) {
          return b.cost - a.cost
        })
          break;
        default:
      }
      this.setState({
        transactions: sortedTransactions,
        bought: sortedTransactions
      })
    }

    AllTransactions = () => {
      this.fetchTransactions()
    }

// filter bought and sold transactions on user portfolio (conditional rendering of buttons)
    filterBought = async () => {
      let bought = this.state.transactions.filter(transaction => {
        return transaction.order_type === 'buy'
      })
      this.setState({
        transactions: bought,
        filterToggle: 'bought'
      })
    }

    filterSold = () => {
      let sold = this.state.transactions.filter(transaction => {
        return transaction.order_type === 'sell'
      })
      this.setState({
        transactions: sold,
        filterToggle: 'sold'
      })
    }


  render() {
    return (
      <div className="App">
      <SearchStocks
      toggleLoginDisplay={this.toggleLoginDisplay}
      handleLogout={this.handleLogout}
      handleSort={this.handleSort}
      handleStockSector={this.handleStockSector}
      handleStockFilter={this.handleStockFilter}
      stockSymbols={this.state.stockSymbols}
      isLoggedIn={this.state.isLoggedIn}
      />
      <UserAccount
      firstname={this.state.firstname}
      lastname={this.state.lastname}
      balance={this.state.balance}
      bought={this.state.bought}
      sortPortfolio={this.sortPortfolio}
      filterBought={this.filterBought}
      filterSold={this.filterSold}
      filterToggle={this.state.filterToggle}
      AllTransactions={this.AllTransactions}
      newsFeed={this.state.newsFeed}
      isLoggedIn={this.state.isLoggedIn}
      transactions={this.state.transactions}
      handleCurrentVal={this.handleCurrentVal}
      currentVal={this.state.currentVal}
      cumVal={this.state.cumVal}
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
      <ProfileList
      stockCategory={this.state.stockCategory}
      selectedStock={this.state.selectedStock}
      handleSelectStock={this.handleSelectStock}
      stockSymbols={this.filterStockSearch()}
      />
      <LoginForm
      loginAccount={this.loginAccount}
      createAccount={this.createAccount}
      handleFormInput={this.handleFormInput}
      loginContainer={this.state.loginContainer}
      toggleLoginDisplay={this.toggleLoginDisplay}
      />
    </div>
    );
  }
}

export default App;
