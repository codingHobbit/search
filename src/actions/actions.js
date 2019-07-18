export const RECEIVE_STOCKS = 'RECEIVE_STOCKS'

export function receiveStocks(json) {
  return {
    type: RECEIVE_STOCKS,
    stocks: json,
    receivedAt: Date.now()
  }
}

export const ADD_STOCK_TO_WISHLIST = 'ADD_STOCK_TO_WISHLIST'

export function addStockToWishlist(ticker) {
  return {
    type: ADD_STOCK_TO_WISHLIST,
    stock: ticker
  }
}

export const REMOVE_STOCK_FROM_WISHLIST = 'REMOVE_STOCK_FROM_WISHLIST'

export function removeStockFromWishlist(ticker) {
  return {
    type: REMOVE_STOCK_FROM_WISHLIST,
    stock: ticker
  }
}

export const SHOW_ALL_STOCKS = 'SHOW_ALL_STOCKS'

export function showAllStocks(){
  return {
    type: SHOW_ALL_STOCKS
  }
}

export const SHOW_WISHLIST = 'SHOW_WISHLIST'

export function showWishlist(){
  return {
    type: SHOW_WISHLIST
  }
}
