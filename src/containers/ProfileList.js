import React from 'react';
import CompanyProfile from '../components/CompanyProfile'

const ProfileList = (props) => {

  return <div>
          {
            props.stockSymbols.map( stock => {
            return <CompanyProfile handleSelectStock={props.handleSelectStock}
                    symbol={stock.symbol}
                    name={stock.name}
                    selectedStock={props.selectedStock}
                    filterSize={props.stockSymbols.length}/>
            })

          }
        </div>
}

export default ProfileList
