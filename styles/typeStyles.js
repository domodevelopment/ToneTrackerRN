import { Dimensions } from "react-native";

export default {
  selectableImgRow: {
    height: "20%",
    width: '95%',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: '6%',
    marginLeft: '2%'
  },
  unvalidatedSelectableImgRow: {
    height: "20%",
    width: '95%',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: '6%',
    marginLeft: '2%',
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
