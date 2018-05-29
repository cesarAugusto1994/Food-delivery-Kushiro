const INITIAL_STATE = {
  number: "4242424242424242",
  exp_month: "02",
  exp_year: "21",
  cvc: "999",
  name: "Billy Joe"
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
