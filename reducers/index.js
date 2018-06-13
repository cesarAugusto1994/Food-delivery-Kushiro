import { combineReducers } from "redux";
import creditCard from "./credit_card_reducer";
import newOrder from "./new_order_reducer";

export default combineReducers({
  creditCard,
  newOrder
});
