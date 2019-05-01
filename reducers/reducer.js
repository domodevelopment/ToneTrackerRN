function getInitialState() {
  return {
    guitar: {
      name: "Stratocaster",
      type: "BASS",
      use: "DAILY",
      coated: true
    },
    notifications: true
  };
}

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_GUITAR":
      return {};
    case "EDIT_GUITAR":
      return {
        ...state,
        guitar: action.payload
      };
    case "SHOW_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
