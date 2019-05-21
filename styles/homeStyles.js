import colors from "../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    height: "100%",
    backgroundColor: colors.lessWhite
  },
  fab: {
    position: "absolute",
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    bottom: "6%",
    right: "7%",
    borderRadius: (width * 0.2) / 2,
    elevation: 10
  }
};
