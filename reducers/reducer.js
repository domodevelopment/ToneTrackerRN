import constants from "../constants";
import uuidv1 from "uuid";
import { Alert } from "react-native";

function getInitialState() {
  return {
    guitars: [],
    notifications: true,
    selectedForEditing: null
  };
}

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    //This is the guitar selected for editing
    case constants.selectedGuitar:
      return {
        ...state,
        selectedForEditing: action.payload
      };
    //Pushing newly created guitar to the guitars list
    case constants.addGuitar:
      let newGuitarArr = [action.payload];
      let concatenatedArray = newGuitarArr.concat(state.guitars);
      return {
        ...state,
        guitars: concatenatedArray
      };
    //Updating value(s) of an existing guitar
    case constants.editGuitar:
      let AnotherNewGuitarArr = [action.payload];
      let updatedArr = state.guitars;
      for (let i in updatedArr) {
        if (updatedArr[i].key === action.payload.key) {
          updatedArr.splice(i, 1);
          break;
        }
      }
      let AnotherConcatenatedArray = AnotherNewGuitarArr.concat(updatedArr);
      return {
        ...state,
        guitars: AnotherConcatenatedArray
      };
    //Boolean indicating whether or not to inform the user to get new strings
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
