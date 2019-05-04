import colors from "../colors";

export default {
  parent: {
    borderBottomStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
    backgroundColor: colors.light,
    padding: 10,
    height: 100
  },
  imageWrapper: {
    height: "100%",
    width: "20%"
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
    width: "80%",
    justifyContent: "space-between",
    paddingLeft: 10
  },
  detailsRowOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  detailsRowTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  editButton: {
    padding: 5,
    borderRadius: 6
  },
  restringButton: {
    padding: 5,
    borderRadius: 6
  },
  nameText: {
    fontSize: 30,
    color: "#000"
  },
  btnText: {
    fontSize: 17,
    color: "#fff"
  },
  text: {
    fontSize: 17,
    color: "#000"
  }
};
