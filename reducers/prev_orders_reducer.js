import { UPDATE_PREV_ORDERS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_PREV_ORDERS:
      if (state.length === 3) {
        state.shift();
        [...state, action.payload];
      }
      return [...state, action.payload];
    default:
      return state;
  }
};
