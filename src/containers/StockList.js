import React from 'react';
import StockProfile from '../containers/StockProfile'
import {connect} from 'react-redux'
import ProfileCard from '../components/ProfileCard'


const mapStateToProps = (state) => {
  return {
    symbols: state.stock.symbols,
    stockFilter: state.stock.stockFilter,
    stock: state.stock.stock,
    sector: state.stock.sector
  }
}

const StockList = (props) => {
  // filter stocks by selected sector, search, -&&
  let filtered = []

  if(props.stockFilter.length > 0 && props.sector) {
    filtered = (props.sector.filter(stock => stock.symbol.toLowerCase().includes(props.stockFilter.toLowerCase()) || stock.name.toLowerCase().includes(props.stockFilter.toLowerCase()))).slice(0, 7)
  } else if(props.stockFilter.length > 0) {
    filtered = (props.symbols.filter(stock => stock.symbol.toLowerCase().includes(props.stockFilter.toLowerCase()) || stock.name.toLowerCase().includes(props.stockFilter.toLowerCase()))).slice(0, 7)
  } else if(props.sector) {
    filtered = props.sector
  } 
  return <div>
          {
            props.stock ?
            <ProfileCard fetchTransactions={props.fetchTransactions}/>
            :
            null
          }

    <div id="stock-list">
        {
          props.stock ?
          null
          :
          filtered.map(stock => {
            return <StockProfile
            key={Math.random()}
            symbol={stock.symbol}
            name={stock.name}
            />
          })
        }

        </div>
        </div>
}

export default connect(mapStateToProps)(StockList)
