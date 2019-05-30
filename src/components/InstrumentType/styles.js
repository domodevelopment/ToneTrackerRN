import { Dimensions } from "react-native";
import colors from "../../colors";

const height = Dimensions.get("window").height;

export default {
  selectableImgRow: {
    height: "20%",
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "6%",
    marginLeft: "2%"
  },
  invalidSelectableImgRow: {
    height: "20%",
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "6%",
    marginLeft: "2%",
    borderColor: colors.rusty,
    borderWidth: 3,
    borderStyle: "solid"
  },
  imgWrapper: {
    // height: "100%",
    height: height * 0.15 - 10,
    width: height * 0.15 - 10,
    borderRadius: (height * 0.15 - 10) / 2
  },
  img: {
    height: "100%",
    width: "100%"
  }
};
