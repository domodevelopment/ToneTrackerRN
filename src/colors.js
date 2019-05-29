import { connect } from "react-redux";
import store from "./store";
import { Alert } from "react-native";

const qualityIndicators = {
  good: "#32cd32",
  dull: "#ffa500",
  rusty: "#dc143c"
};

const normal = {
  //blue highlights
  primary: "#42a5f5",
  light: "#80d6ff",
  dark: "#0077c2",
  //whites
  white: "#fff",
  lessWhite: "#eee",
  evenLessWhite: "#ccc",
  notQuiteBlack: "#111",
  notQuiteWhite: "#eee",
  ...qualityIndicators
};

const nightShade = {
  //red highlights
  primary: "#b71c1c",
  light: "#f05545",
  dark: "#7f0000",
  //darks
  lightDark: "#263238",
  mediumDark: "#4f5b62",
  darkDark: "#1c2226",
  notQuiteBlack: "#111",
  notQuiteWhite: "#eee",
  ...qualityIndicators
};

// const mapStateToProps = state => {
//   return {
//     nightShade: state.nightShade
//   };
// };

// export default connect(
//   mapStateToProps,
//   null
// )(nightShade);
// Alert.alert("", JSON.stringify(store.getState()));
// export default nightShade;
export default (store.getState().nightShade ? nightShade : normal);
