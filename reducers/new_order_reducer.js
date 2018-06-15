import { PERSIST_HYDRATE } from "redux-persist/lib/constants";
import { SAVE_NEW_ORDER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case PERSIST_HYDRATE:
      return action.payload.newOrder;
    case SAVE_NEW_ORDER:
      return action.payload;
    default:
      return state;
  }
};
