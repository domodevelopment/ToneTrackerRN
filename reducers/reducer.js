function getInitialState() {
  return {
    notifications: true
  };
}

const reducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case "ADD_GUITAR":
      return {};
    case "EDIT_GUITAR":
      return {};
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
