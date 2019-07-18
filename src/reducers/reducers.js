import { combineReducers } from "redux";
import data from "../data/mockData.json";
import { SEARCH } from "../actions/actions";

function searchData(action) {
  var result = [];
  var cardObject = {};
  var shouldAdd = false;
  var patt = new RegExp(action.term);

  data.forEach(function(card) {
    cardObject.id = card.id;
    cardObject.name = card.name;
    cardObject.address = card.address;
    cardObject.pincode = card.pincode;

    if (
      patt.test(card.id) ||
      patt.test(card.name) ||
      patt.test(card.address) ||
      patt.test(card.pincode)
    )
      shouldAdd = true;

    for (let i = 0; i < card.items.length; i++) {
      if (patt.test(card.items[i])) {
        shouldAdd = true;
        cardObject.items = action.term + " is found in items";
        break;
      }
    }

    if (shouldAdd) {
      result.push(cardObject);
    }

    cardObject = {};
    shouldAdd = false;
  });

  return result;
}

function searchState(state = {}, action) {
  switch (action.type) {
    case SEARCH:
      return Object.assign({}, state, {
        results: Object.assign([], searchData(action))
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  searchState
});

export default rootReducer;
