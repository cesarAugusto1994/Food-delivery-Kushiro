import { SAVE_NEW_ORDER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_NEW_ORDER:
      return action.payload;
    default:
      return state;
  }
};
