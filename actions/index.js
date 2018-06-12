import { TOTAL_COST, SAVE_CREDIT_CARD } from "./types";

export const saveTotalCost = totalCost => {
  return {
    type: TOTAL_COST,
    payload: totalCost
  };
};

export const saveCreditCard = card => {
  return {
    type: SAVE_CREDIT_CARD,
    payload: card
  };
};
