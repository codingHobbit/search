import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {
  addStockToWishlist,
  removeStockFromWishlist
} from '../actions/actions'
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';

export default class Stocks extends Component {

  addFavorite(stock){
    return function(){
      this.props.dispatch(addStockToWishlist(stock));
    }
  }

  removeFavorite(stock){
    return function(){
      this.props.dispatch(removeStockFromWishlist(stock));
    }
  }

  getWishlistStatus(stocks, stock){
    if(stocks[stock].isFavorite === true)
      return <Button variant="default remove-fav" onClick={this.removeFavorite(stock).bind(this)}>Remove</Button>;
    return <Button variant="default add-fav" onClick={this.addFavorite(stock).bind(this)}>Add</Button>;
  }

  getRows(stocks, history, showAll){
    if(stocks == null)
      return;
    else{
    return Object.keys(stocks).sort().map(function(stock, index){

      if(showAll === false && stocks[stock].isFavorite === false)
        return null;

      var stockValue = stocks[stock].value;
      var stockPreviousValue = history == null ? 'Unknown': (history[stock] == null ? 'Unknown' : history[stock].value.toFixed(4));
      var bgColor;
      var textColor = 'darkslategrey';
      var wishlist = this.getWishlistStatus(stocks, stock);

      if(stockValue < stockPreviousValue){
        var ratio = 1 - stockValue/stockPreviousValue;
        bgColor = 'rgb(255, 0, 0, ' + ratio + ')';
        textColor = ratio < 0.4 ? 'darkslategrey' : 'white';
      }
      else if(stockValue > stockPreviousValue){
        ratio = 1 - stockPreviousValue/stockValue;
        bgColor = 'rgb(0, 128, 0, ' + ratio + ')';
        textColor = ratio < 0.4 ? 'darkslategrey' : 'white';
      }

      return <tr key={index}>
        <td>{stock}</td>
        <td style={{padding: '10px'}}>
          <Sparklines data={stocks[stock].plotPoints} limit={25} width={100} height={15}>
            <SparklinesLine style={{ stroke: "#41c3f9", strokeWidth: 0.5, fill: "none" }} />
            <SparklinesReferenceLine type="mean" />
            <SparklinesSpots size={1} />
          </Sparklines>
        </td>
        <td className='current-value'style={{backgroundColor: bgColor, color: textColor}}><p>{stockValue.toFixed(4)}</p></td>
        <td>{stockPreviousValue}</td>
        <td>{new Date(stocks[stock].updatedAt).toLocaleTimeString()}</td>
        <td>{stocks[stock].maxToday.value.toFixed(4)}</td>
        <td>{stocks[stock].minToday.value.toFixed(4)}</td>
        <td>{wishlist}</td>
      </tr>;
    }, this);
  }
  }

  render() {
    var rows = this.getRows(this.props.stocks, this.props.history, this.props.showAllStock)

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Status over 25 values</th>
            <th>Current Price</th>
            <th>Previous Value</th>
            <th>Last Updated at</th>
            <th>Maximum today</th>
            <th>Minimum today</th>
            <th>Add to Wishlist</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
}
