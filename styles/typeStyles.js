import { Dimensions } from "react-native";

export default {
  selectableImgRow: {
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 5
  },
  unvalidatedSelectableImgRow: {
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    borderColor: "red",
    borderWidth: 3,
    borderStyle: "solid"
  },
  imgWrapper: {
    height: "100%",
    width: Dimensions.get("window").height * 0.15 - 10,
    borderRadius: 50
  },
  img: {
    height: "100%",
    width: "100%"
  }
};
