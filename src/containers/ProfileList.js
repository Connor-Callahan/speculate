import React from 'react';
import CompanyProfile from '../components/CompanyProfile'

const ProfileList = (props) => {
  let refinedStockList = props.stockSymbols
  if(!props.stockCategory) {
    refinedStockList = refinedStockList.slice(0, 7)
  }
  return <div id="stock-list">
          {
            refinedStockList.map( stock => {
            return <CompanyProfile
                    key={Math.random()}
                    handleSelectStock={props.handleSelectStock}
                    symbol={stock.symbol}
                    name={stock.name}
                    selectedStock={props.selectedStock}
                    filterSize={props.stockSymbols.length}/>
            })

          }
        </div>
}

export default ProfileList
