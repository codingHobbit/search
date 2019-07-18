import { combineReducers } from 'redux'
import {
  RECEIVE_STOCKS,
  ADD_STOCK_TO_WISHLIST,
  REMOVE_STOCK_FROM_WISHLIST,
  SHOW_ALL_STOCKS,
  SHOW_WISHLIST
} from '../actions/actions'

function stocks(state = { stockDictionary : {} }, action) {
  var stockDictionary = {};
  switch (action.type) {
    case REMOVE_STOCK_FROM_WISHLIST:
      stockDictionary = {};
      Object.keys(state.stockDictionary).map(function(stock, index){
        return stockDictionary[stock] = Object.assign({}, state.stockDictionary[stock])
      });
      stockDictionary[action.stock].isFavorite = false;

      return Object.assign({}, state, {
        stockDictionary
      })

    case ADD_STOCK_TO_WISHLIST:
      stockDictionary = {};
      Object.keys(state.stockDictionary).map(function(stock, index){
        return stockDictionary[stock] = Object.assign({}, state.stockDictionary[stock])
      });
      stockDictionary[action.stock].isFavorite = true;

      return Object.assign({}, state, {
        stockDictionary
      })

    case RECEIVE_STOCKS:
      stockDictionary = {};
      Object.keys(state.stockDictionary).map(function(stock, index){
        return stockDictionary[stock] = Object.assign({}, state.stockDictionary[stock])
      });

      action.stocks.forEach(
        function(stock){
          var plotPoints = [];
          var max = {
            value: stock[1],
            date: Date.now()
          };
          var min = {
            value: stock[1],
            date: Date.now()
          };
          var isFavorite = false;


          if(stockDictionary[stock[0]] != null && stockDictionary[stock[0]].maxToday != null){
            var date1 = new Date(action.receivedAt);
            var date2 = new Date(stockDictionary[stock[0]].maxToday.date);

            if(date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()){
              max = stock[1] < stockDictionary[stock[0]].maxToday.value ? stockDictionary[stock[0]].maxToday : {value: stock[1], date: date1};
              min = stock[1] > stockDictionary[stock[0]].minToday.value ? stockDictionary[stock[0]].minToday : {value: stock[1], date: date1};
            }
          }

          if(stockDictionary[stock[0]] != null){
            isFavorite = stockDictionary[stock[0]].isFavorite;
            plotPoints = stockDictionary[stock[0]].plotPoints.slice();
            if(plotPoints.length >= 25)
              plotPoints.shift();
          }
          plotPoints.push(stock[1]);

          stockDictionary[stock[0]] = {
            'value' : stock[1],
            'updatedAt' : action.receivedAt,
            'plotPoints' : plotPoints,
            'maxToday' : max,
            'minToday' : min,
            'isFavorite': isFavorite
          }
      });

      return Object.assign({}, state, {
        stockDictionary
      })
    default:
      return state
  }
}

function allStocks(state = {
    showAllStock: true
  }, action) {
  switch (action.type) {
    case RECEIVE_STOCKS:
      return Object.assign({}, state, {
        'prevStocks' : Object.assign({}, state.stocks),
        'stocks' : stocks(state['stocks'], action),
        'showAllStock' : Boolean(state.showAllStock).valueOf()
      })
    case ADD_STOCK_TO_WISHLIST:
      return Object.assign({}, state, {
        'stocks' : stocks(state['stocks'], action)
      })
    case REMOVE_STOCK_FROM_WISHLIST:
      return Object.assign({}, state, {
        'stocks' : stocks(state['stocks'], action)
      })
    case SHOW_ALL_STOCKS:
      return Object.assign({}, state, {
        'showAllStock' : true
      })
    case SHOW_WISHLIST:
      return Object.assign({}, state, {
        'showAllStock' : false
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  allStocks
})

export default rootReducer
