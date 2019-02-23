import React from 'react';
import StockProfile from '../containers/StockProfile'
import {connect} from 'react-redux'
import ProfileCard from '../components/ProfileCard'


const mapStateToProps = (state) => {
  return {
    symbols: state.symbols,
    stockFilter: state.stockFilter,
    stock: state.stock
  }
}

const StockList = (props) => {
  let filtered = []

  if(props.stockFilter.length > 0) {
    filtered = (props.symbols.filter(stock => stock.symbol.toLowerCase().includes(props.stockFilter.toLowerCase()) || stock.name.toLowerCase().includes(props.stockFilter.toLowerCase()))).slice(0, 7)
  }
  return <div id="stock-list">
        {
          props.stock ?
          <ProfileCard />
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
}

export default connect(mapStateToProps)(StockList)
