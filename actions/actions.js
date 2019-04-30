export function addGuitar(guitar) {
  return {
    type: "ADD_GUITAR",
    payload: guitar
  };
}

export function editGuitar(guitar) {
  return {
    type: "EDIT_GUITAR",
    payload: guitar
  };
}

export function showNotifications(show) {
  return {
    type: "SHOW_NOTIFICATIONS",
    payload: show
  };
}
