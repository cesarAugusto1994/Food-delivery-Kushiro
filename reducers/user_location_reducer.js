import { SAVE_USER_LOCATION } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_USER_LOCATION:
      return action.payload;
    default:
      return state;
  }
};
