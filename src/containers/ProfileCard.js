import React, { Component } from 'react';

class ProfileCard extends Component {

  render() {
    return (
      <div>
      {
        this.props.selectedStock &&
          <div className="profile-card">
            <h1>{this.props.selectedStock.quote.companyName}</h1>
            <h3>Description: {this.props.selectedStock.quote.symbol}</h3>
            <p>Symbol: {this.props.selectedStockProfile.description}</p>
            <h3>Sector: {this.props.selectedStock.quote.sector}</h3>
            <h3>Price: {this.props.selectedStock.quote.latestPrice}</h3>
            <h3>52-Week-High: {this.props.selectedStock.quote.week52High}</h3>
            <h3>52-Week-low: {this.props.selectedStock.quote.week52Low}</h3>
            <button onClick={this.props.toggleStockDisplay}>Close-</button>
          </div>
      }
      </div>
    );
  }

}

export default ProfileCard;
