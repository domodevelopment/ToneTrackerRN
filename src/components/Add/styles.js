import colors from "../../colors";

export default {
  parent: {
    height: "100%",
    backgroundColor: colors.lessWhite
  },
  nameInputWrapper: {
    height: "12%",
    alignItems: "center"
  },
  nameInput: {
    backgroundColor: "#ccc",
    marginTop: "5%",
    height: "60%",
    width: "95%",
    paddingLeft: "3%",
    fontSize: 20,
    color: colors.dark
  },
  nameInvalidInput: {
    backgroundColor: colors.rusty,
    marginTop: "5%",
    height: "60%",
    width: "95%",
    paddingLeft: "3%",
    fontSize: 20,
    color: colors.notQuiteBlack
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
  invalidDatePickerBtn: {
    flex: 1,
    height: "80%",
    justifyContent: "center",
    marginLeft: "3%",
    borderColor: colors.rusty,
    borderWidth: 3,
    borderStyle: "solid"
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
