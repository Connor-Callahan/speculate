import React, { Component } from 'react';

class CompanyProfile extends Component {

  render() {
    let value = null
    if(this.props.filterSize <= 8700 && this.props.selectedStock == null) {
      value = this.props.name
    }

    return (
      <div
      id={this.props.symbol}
      onClick={this.props.handleSelectStock}>

      {
        value
      }
      </div>
    );
  }

}

export default CompanyProfile;
