import { SAVE_CREDIT_CARD, SAVE_NEW_ORDER } from "./types";

export const saveCreditCard = creditCard => {
  return {
    type: SAVE_CREDIT_CARD,
    payload: creditCard
  };
};

export const saveOrder = order => {
  return {
    type: SAVE_NEW_ORDER,
    payload: order
  };
};
