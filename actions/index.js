import axios from "axios";

import {
  SAVE_CREDIT_CARD,
  SAVE_NEW_ORDER,
  SAVE_USER_LOCATION,
  CLEAR_CURRENT_ORDER,
  UPDATE_PREV_ORDERS
} from "./types";
import { GOOGLE_API_KEY } from "../config";

const API_URL = `https://maps.googleapis.com/maps/api/distancematrix/json?`;

export const saveCreditCard = creditCard => {
  return {
    type: SAVE_CREDIT_CARD,
    payload: creditCard
  };
};

export const saveOrder = order => async dispatch => {
  const {
    restaurant: { location: { lat, lng } },
    userLocation: { coords: { latitude, longitude } }
  } = order;
  let response;

  try {
    response = await axios.get(
      `${API_URL}origins=${lat},${lng}&destinations=${latitude},${longitude}&mode=driving&key=${GOOGLE_API_KEY}`
    );

    dispatch({
      type: SAVE_NEW_ORDER,
      payload: {
        ...order,
        userLocation: {
          ...order.userLocation,
          destAddress: response.data.destination_addresses[0]
        },
        orderMadeAt: new Date().getTime(),
        timeToDest:
          response.data.rows[0].elements[0].duration.value * 1000 +
          // 60 +
          new Date().getTime()
      }
    });
  } catch (e) {
    console.error(e);
  }
};

export const handleConfirmedOrder = order => dispatch => {
  dispatch({
    type: SAVE_NEW_ORDER,
    payload: {}
  });
  dispatch({
    type: UPDATE_PREV_ORDERS,
    payload: order
  });
};

export const saveUserLocation = location => {
  return {
    type: SAVE_USER_LOCATION,
    payload: location
  };
};
