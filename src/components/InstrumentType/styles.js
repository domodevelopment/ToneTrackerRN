import { Dimensions } from "react-native";
import colors from "../../colors";

const height = Dimensions.get("window").height;

export default {
  selectableImgRow: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  invalidSelectableImgRow: {
    height: "16%",
    width: "96%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: "2%",
    margin: "2%",
    borderColor: colors.rusty,
    borderWidth: 3,
    borderStyle: "solid"
  },
  imgWrapper: {
    height: height * 0.12,
    width: height * 0.12,
    borderRadius: (height * 0.12) / 2
  },
  img: {
    height: "100%",
    width: "100%"
  }
};
