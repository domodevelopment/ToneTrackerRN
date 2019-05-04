import colors from "../colors";

export default {
  parent: {
    height: "100%",
    backgroundColor: colors.light
  },
  nameInputWrapper: {
    height: "15%",
    justifyContent: "center",
    backgroundColor: "#00f"
  },
  nameInput: {
    backgroundColor: "#ccc",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20
  },
  nameUnvalidatedInput: {
    backgroundColor: "red",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20
  },
  profileImg: {
    position: "absolute",
    top: 20,
    right: 5,
    height: "20%",
    width: "20%"
  },
  questionRow: {
    height: "7.5%",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10
  },
  lastChanged: {
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  datePickerBtn: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: "80%",
    justifyContent: "center"
  },
  unvalidatedDatePickerBtn: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 3,
    borderStyle: "solid"
  },
  coated: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  submit: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  gradient: {
    height: "75%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  text: {
    color: "white",
    fontSize: 17
  }
};
