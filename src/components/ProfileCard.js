import React, { Component } from 'react';
import {connect} from 'react-redux'
import Transaction from './Transaction'

import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

const mapStateToProps = (state) => {
  return {
    stock: state.stock.stock,
    profile: state.stock.profile,
    chart: state.stock.chart,
    icon: state.stock.icon,
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStock: (selectedStock) => dispatch( {type:'SELECT_STOCK', payload:null}),
    setChart: (selectChart) => dispatch( {type: 'STOCK_CHART', payload:selectChart})
  }
}

class ProfileCard extends Component {
  handleClose = () => {
    this.props.setStock(null)
  }

  handleChart = async ({target}) => {
    const selectChart = await fetch(`https://cloud.iexapis.com/stable/stock/${this.props.stock.symbol}/chart/${target.id}?token=pk_f0958c731c62430c85edfd3a28f51053`)
    .then(r => r.json())
    this.props.setChart(selectChart)
  }

  render() {
    return (
        <div className="profile-card">
          <h1 className="company-name">{this.props.stock.companyName}</h1>
          {
            this.props.loggedIn?
            <Transaction handleFormInput={this.props.handleFormInput}
            fetchTransactions={this.props.fetchTransactions}/>
            :
            <p></p>
          }
            <button className="close-button" onClick={this.handleClose}>𝖷</button>
            <h3 className="symbol">Ticker : {this.props.stock.symbol}</h3>
            <h3 className="symbol">Sector : {this.props.stock.sector}</h3>
            <p className="profile-description">{this.props.profile}</p>
            <div className="header-container">
            <h3 className="profile-header">Price : {this.props.stock.latestPrice}</h3>
            <h3 className="profile-header">Time : {this.props.stock.latestTime}</h3>
            <h3 className="profile-header">P/E Ratio : {this.props.stock.peRatio}</h3>
            {
              this.props.stock.marketCap?
              <h3 className="profile-header">MarketCap :﹩{this.props.stock.marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
              :
              <h3 className="profile-header">MarketCap : N/A</h3>
            }
            <h3 className="profile-header">52-Week-High : {this.props.stock.week52High}</h3>
            <h3 className="profile-header">52-Week-low : {this.props.stock.week52Low}</h3>
            </div>
            <div id="chart-container">
           <button className="chart-button" id="ytd" onClick={this.handleChart}>YTD</button>
           <button className="chart-button" id="1m" onClick={this.handleChart}>1 Month</button>
           <button className="chart-button" id="1y" onClick={this.handleChart}>1 Year</button>
           <button className="chart-button" id="5y" onClick={this.handleChart}>5 Year</button>
           </div>
           {
             this.props.chart?
             <LineChart
               className="stock-chart"
               id="stock-chart"
               width="auto"
               height="250px"
               prefix="$"
               colors={["black"]}
               points={false}
               curve={false}
               data={this.props.chart.reduce(function(collector,value){
                 collector[value.date] = value.close
                 return collector
                 } ,{})
               }
             />
             :
             null
           }

        </div>


    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
