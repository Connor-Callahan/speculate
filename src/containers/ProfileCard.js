import React, { Component } from 'react';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class ProfileCard extends Component {
  render() {



    return (
      <div>
      {
        this.props.selectedStock &&
          <div className="profile-card">
            <h1 className="company-name">{this.props.selectedStock.quote.companyName}</h1>
            <h3 className="symbol">Symbol: {this.props.selectedStock.quote.symbol}</h3>
            <p>Description: {this.props.selectedStockProfile.description}</p>
            <h3>Sector: {this.props.selectedStock.quote.sector}</h3>
            <h3>Price: {this.props.selectedStock.quote.latestPrice}</h3>
            <h3>Time: {this.props.selectedStock.quote.latestTime}</h3>
            <h3>P/E Ratio: {this.props.selectedStock.quote.peRatio}</h3>
            <h3>MarketCap: {this.props.selectedStock.quote.marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
            <h3>52-Week-High: {this.props.selectedStock.quote.week52High}</h3>
            <h3>52-Week-low: {this.props.selectedStock.quote.week52Low}</h3>
            <button onClick={this.props.toggleStockDisplay}>Close-</button>
            <p onClick={this.props.handleSelectChart}>YTD</p>
            <p onClick={this.props.handleSelectChart}>1 Month</p>
            <p onClick={this.props.handleSelectChart}>1 Year</p>
            <p onClick={this.props.handleSelectChart}>5 Year</p>
            <LineChart data={this.props.selectedChart.reduce(function(collector,value){
              collector[value.date] = value.close
              return collector
            } ,{})} />
          </div>
      }
      </div>

    );
  }

}

export default ProfileCard;
