import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  receiveStocks,
  showAllStocks,
  showWishlist
} from '../actions/actions'
import Websocket from 'react-websocket'
import Stocks from '../components/stocks'
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap';
import icon from './icon.ico'

class App extends Component {

  componentDidMount() {
  }

  handleData(data) {
    const { dispatch } = this.props
    let result = JSON.parse(data);
    dispatch(receiveStocks(result));
  }

  showAllStocksFunction() {
    const { dispatch } = this.props
    dispatch(showAllStocks());
  }

  showWishlistFunction() {
    const { dispatch } = this.props
    dispatch(showWishlist());
  }

  render() {
    const { stocks, prevStocks, showAllStock } = this.props
    const { dispatch } = this.props
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img alt="" src={icon} width="30" height="30" className="d-inline-block align-top" />
            <div className='nav-text'>{'Live Stocks Dashboard'}</div>
          </Navbar.Brand>
        </Navbar>
        <br />
        <div className='toggle-buttons'>
          <Button disabled={showAllStock} variant="info btn-lg" onClick={this.showAllStocksFunction.bind(this)}>All Stocks</Button>
          <Button disabled={!showAllStock} variant="info btn-lg" onClick={this.showWishlistFunction.bind(this)}>Wishlist</Button>
        </div>
        <hr />
        <Stocks stocks={stocks.stockDictionary} history={prevStocks.stockDictionary} dispatch={dispatch} showAllStock={showAllStock}/>
        <Websocket url='ws://stocks.mnet.website'
        onMessage={this.handleData.bind(this)}/>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { allStocks } = state
  var stocks = allStocks[
    'stocks'
  ] || {
    stocks: {
      stockDictionary : {}
    }
  }

  var prevStocks = allStocks[
    'prevStocks'
  ] || {
    prevStocks: {
      stockDictionary : {}
    }
  }

  var showAllStock = allStocks.showAllStock || false

  return {
    stocks,
    prevStocks,
    showAllStock
  }
}

export default connect(mapStateToProps)(App)
