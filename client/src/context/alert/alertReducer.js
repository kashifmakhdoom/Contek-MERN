import { SHOW_ALERT, HIDE_ALERT } from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch(action.type) {
    case SHOW_ALERT:
      return [...state, action.payload];
    case HIDE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default: 
      return state;
  }
}