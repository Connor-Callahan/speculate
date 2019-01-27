import React, { Component } from 'react';

class ProfileCard extends Component {

  render() {
    return (
      <div>
      {
        this.props.selectedStock == null ?
          null
          :
          <div className="profile-card">
            <h1>{this.props.selectedStock.quote.companyName}</h1>
            <h3>Symbol:{this.props.selectedStock.quote.symbol}</h3>
            <h3>Price:{this.props.selectedStock.quote.latestPrice}</h3>
          </div>
      }
      </div>
    );
  }

}

export default ProfileCard;
