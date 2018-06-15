import { combineReducers } from "redux";
import creditCard from "./credit_card_reducer";
import newOrder from "./new_order_reducer";
import userLocation from "./user_location_reducer";
import prevOrders from "./prev_orders_reducer";

export default combineReducers({
  creditCard,
  newOrder,
  userLocation,
  prevOrders
});
