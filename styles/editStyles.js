import colors from "../colors";
import { Dimensions } from "react-native";

export default {
  parent: {
    height: "100%",
    backgroundColor: colors.lessWhite
  },
  optionsWrapper: {
    position: "absolute",
    top: 0,
    right: 0
  },
  nameInputWrapper: {
    height: "12%",
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  nameInput: {
    backgroundColor: "#ccc",
    height: "60%",
    width: "70%",
    marginLeft: "5%",
    paddingLeft: "3%",
    fontSize: 20
  },
  nameInvalidInput: {
    backgroundColor: colors.rusty,
    height: "60%",
    width: "70%",
    marginLeft: "5%",
    paddingLeft: "3%",
    fontSize: 20
  },
  nameText: {
    fontSize: 25,
    color: "white",
    width: "70%",
    marginLeft: "10%"
  },
  profileImg: {
    position: "absolute",
    top: "5%",
    right: "5%",
    height: Dimensions.get("window").width * 0.25,
    width: Dimensions.get("window").width * 0.25,
    borderRadius: 50
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: (Dimensions.get("window").width * 0.25) / 2
  },
  questionRow: {
    height: "5%",
    justifyContent: "flex-end",
    width: "95%",
    marginLeft: "3%"
  },
  lastChanged: {
    height: "10%",
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "3%"
  },
  datePickerBtn: {
    flex: 1,
    marginLeft: "3%",
    height: "80%",
    justifyContent: "center"
  },
  coated: {
    height: "10%",
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "3%"
  },
  submitWrapper: {
    height: "18%",
    alignItems: "center"
  },
  submit: {
    height: "55%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: "3%"
  },
  gradient: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  text: {
    color: colors.notQuiteBlack,
    fontSize: 17
  },
  btnText: {
    color: colors.white,
    fontSize: 21
  }
};
