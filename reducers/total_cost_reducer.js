import { TOTAL_COST } from "../actions/types";

export default (state = 0, action) => {
  switch (action.type) {
    case TOTAL_COST:
      return action.payload;
    default:
      return state;
  }
};
