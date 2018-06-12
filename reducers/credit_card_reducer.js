import { PERSIST_HYDRATE } from "redux-persist/lib/constants";

const INITIAL_STATE = {
  number: "4242424242424242",
  exp_month: "02",
  exp_year: "21",
  cvc: "999",
  name: "Billy Joe"
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_HYDRATE:
      return action.payload.creditCard || state;
    default:
      return state;
  }
}
