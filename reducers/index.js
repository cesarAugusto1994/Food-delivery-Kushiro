import { combineReducers } from "redux";
import creditCard from "./credit_card_reducer";
import totalCost from "./total_cost_reducer";

export default combineReducers({
  creditCard,
  totalCost
});
