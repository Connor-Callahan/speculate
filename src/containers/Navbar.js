import React, { Component } from 'react'
import {connect} from 'react-redux'
import Login from './/Login'

import { stockSearch, toggleDashboard } from '../actions'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    stockSearch: state.stock.stockSearch,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSearch: (position) => dispatch(stockSearch(position)),
    toggleDashboard: (position) => dispatch(toggleDashboard(position)),
  }
}

 class Navbar extends Component {

    render() {
      const navShow = this.props.loggedIn ? 'show' : 'hide';

      return (
        <div id={`navbar-${navShow}`}>
        {
          this.props.loggedIn ?
          <div>
          <h1 id="show-header">Speculate.</h1>
          <ul id="nav-list">
          <li>Home</li>
          <li onClick={() => this.props.toggleDashboard(true)}>
            Create Transaction
          </li>
            <li onClick={() => this.props.toggleSearch(true)}>
          Stock Search
          </li>
           <a href="https://github.com/Connor-Callahan/speculate"
              target="_blank">
              <li>Source</li>
            </a>
          <li>Credits</li>
          </ul>
          </div>
          :
          <div id="hide-menu">
          <h1 id="hide-header">Speculate.</h1>
          <ul id="hide-nav-list">
          <li>About</li>
          <a href="https://github.com/Connor-Callahan/speculate"><li>Source</li></a>
          <li>Credits</li>
          </ul>
          <Login id="hide-btns"/>
          </div>
        }

        </div>
      );
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
