import React, { Component } from 'react';
import './App.css';
import ProfileList from './containers/ProfileList'
import ProfileCard from './containers/ProfileCard'
import SearchStocks from './components/SearchStocks'
class App extends Component {

  state = {
    stockSymbols: [],
    stockFilter: '',
    selectedStock: null
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

  handleSelectStock = (e) => {
    fetch(`https://api.iextrading.com/1.0/stock/${e.target.id}/batch?types=quote,news,chart&range=1m&last=10`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        selectedStock: data
      })
    })
  }

  filterStockSearch = () => {
  return this.state.stockSymbols.filter(stock => stock.symbol.toLowerCase().includes(this.state.stockFilter.toLowerCase()) || stock.name.toLowerCase().includes(this.state.stockFilter.toLowerCase()))
  }


  render() {
    return (
      <div className="App">
      <SearchStocks
      handleStockFilter={this.handleStockFilter}
      stockSymbols={this.state.stockSymbols}
      />
      <ProfileList
      selectedStock={this.state.selectedStock}
      handleSelectStock={this.handleSelectStock}
      stockSymbols={this.filterStockSearch()}
      />
      <ProfileCard
      selectedStock={this.state.selectedStock}
      />
      </div>
    );
  }
}

export default App;
