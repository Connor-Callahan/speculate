import React, { Component } from 'react';

class CompanyProfile extends Component {

  render() {
    return (
      <div
      id={this.props.symbol}
      onClick={this.props.handleSelectStock}>

      {
        this.props.filterSize > 8700 || this.props.selectedStock != null?
            null
          :
        this.props.name
      }
      </div>
    );
  }

}

export default CompanyProfile;
