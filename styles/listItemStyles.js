import colors from "../colors";

export default {
  parent: {
    borderBottomStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
    backgroundColor: colors.light,
    padding: 10
  },
  imageWrapper: {
    height: 100,
    width: 100
  },
  image: {
    height: "100%",
    width: "100%"
  },
  progressCircle: {
    position: "absolute"
  },
  coatedImg: {
    position: "absolute",
    bottom: 3,
    left: "10%",
    height: "30%"
  },
  detailsWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingLeft: 10
  },
  detailsRowOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  detailsRowTwo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  editBtnWrapper: {},
  editButton: {
    padding: 5,
    borderRadius: 6
  },
  restringButton: {
    padding: 5,
    borderRadius: 6
  },
  nameText: {
    fontSize: 22,
    color: "#000",
    flex: 1
  },
  btnText: {
    fontSize: 17,
    color: "#fff"
  },
  ageTextWrapper: {
    justifyContent: "center",
    flex: 1
  },
  ageText: {
    fontSize: 15,
    color: "#000",
    textAlign: "center"
  }
};
