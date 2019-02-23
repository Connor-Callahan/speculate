import React, { Component } from 'react';
import {connect} from 'react-redux'

import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

const mapStateToProps = (state) => {
  return {
    stock: state.stock,
    profile: state.profile,
    chart: state.chart,
    icon: state.icon
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleStock: (selectedStock) => dispatch( {type:'HANDLE_STOCK_DATA', payload:null}),
    handleChart: (selectChart) => dispatch( {type: 'HANDLE_STOCK_CHART', payload:selectChart})
  }
}

class ProfileCard extends Component {
  handleClose = () => {
    this.props.handleStock(null)
  }

  handleChart = async ({target}) => {
    const selectChart = await fetch(`https://api.iextrading.com/1.0/stock/${this.props.stock.quote.symbol}/chart/${target.id}`)
    .then(r => r.json())
    this.props.handleChart(selectChart)
  }
  render() {
    console.log(this.props.icon)
    return (
        <div className="profile-card">
          <h1 className="company-name">{this.props.stock.quote.companyName}</h1>
            <img className="profile-icon" src={this.props.icon.url} alt="" width="100" height="120"/>
            <button className="close-button" onClick={this.handleClose}>𝖷</button>
            <h3 className="symbol">Ticker : {this.props.stock.quote.symbol}</h3>
            <h3 className="symbol">Sector : {this.props.stock.quote.sector}</h3>
            <p className="profile-description">{this.props.profile.description}</p>
            <div className="header-container">
            <h3 className="profile-header">Price : {this.props.stock.quote.latestPrice}</h3>
            <h3 className="profile-header">Time : {this.props.stock.quote.latestTime}</h3>
            <h3 className="profile-header">P/E Ratio : {this.props.stock.quote.peRatio}</h3>
            {
              this.props.stock.quote.marketCap?
              <h3 className="profile-header">MarketCap :﹩{this.props.stock.quote.marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
              :
              <h3 className="profile-header">MarketCap : N/A</h3>
            }
            <h3 className="profile-header">52-Week-High : {this.props.stock.quote.week52High}</h3>
            <h3 className="profile-header">52-Week-low : {this.props.stock.quote.week52Low}</h3>
            </div>
            <div id="chart-container">
           <button className="chart-button" id="ytd" onClick={this.handleChart}>YTD</button>
           <button className="chart-button" id="1m" onClick={this.handleChart}>1 Month</button>
           <button className="chart-button" id="1y" onClick={this.handleChart}>1 Year</button>
           <button className="chart-button" id="5y" onClick={this.handleChart}>5 Year</button>
           </div>
            <LineChart
              className="stock-chart"
              id="stock-chart"
              width="auto"
              height="250px"
              prefix="$"
              points={false}
              curve={false}
              data={this.props.chart.reduce(function(collector,value){
                collector[value.date] = value.close
                return collector
                } ,{})
              }
            />
        </div>


    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)