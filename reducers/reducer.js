import constants from "../constants";

function getInitialState() {
  return {
    guitars: [
      {
        name: "Stratocaster",
        type: "BASS",
        use: "DAILY",
        coated: true
      }
    ],
    notifications: true
  };
}

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case constants.addGuitar:
      return {
        ...state,
        guitars: state.guitars.push(action.payload)
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
