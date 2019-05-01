import constants from "../constants";
import uuidv1 from "uuid";
import { Alert } from "react-native";

function getInitialState() {
  return {
    guitars: [],
    notifications: true
  };
}

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case constants.addGuitar:
      let newGuitarArr = [action.payload];
      let concatenatedArray = newGuitarArr.concat(state.guitars);
      return {
        ...state,
        guitars: concatenatedArray
      };
    case constants.editGuitar:
      return {
        ...state,
        guitars: action.payload
      };
    case constants.showNotifications:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
