import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick'
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
            <img className="profile-icon" src={this.props.stockIcon}/>
            <button className="close-button" onClick={this.props.toggleStockDisplay}>Close</button>
            <h3 className="symbol">Symbol: {this.props.selectedStock.quote.symbol}</h3>
            <p className="profile-description">{this.props.selectedStockProfile.description}</p>
            <h3 className="profile-header">Sector : {this.props.selectedStock.quote.sector}</h3>
            <h3 className="profile-header">Price : {this.props.selectedStock.quote.latestPrice}</h3>
            <h3 className="profile-header">Time : {this.props.selectedStock.quote.latestTime}</h3>
            <h3 className="profile-header">P/E Ratio : {this.props.selectedStock.quote.peRatio}</h3>
            <h3 className="profile-header">MarketCap :﹩{this.props.selectedStock.quote.marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
            <h3 className="profile-header">52-Week-High : {this.props.selectedStock.quote.week52High}</h3>
            <h3 className="profile-header">52-Week-low : {this.props.selectedStock.quote.week52Low}</h3>
            <button className="chart-button" id="ytd" onClick={this.props.handleSelectChart}>YTD</button>
            <button className="chart-button" id="1m" onClick={this.props.handleSelectChart}>1 Month</button>
            <button className="chart-button" id="1y" onClick={this.props.handleSelectChart}>1 Year</button>
            <button className="chart-button" id="5y" onClick={this.props.handleSelectChart}>5 Year</button>
            <LineChart id="stock-chart" width="650px" height="250px" prefix="$" curve={false}
              data={this.props.selectedChart.reduce(function(collector,value){
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
