import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  modal: {
    position: "relative",
    width: 230,
    height: 260,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 40,
    shadowOpacity: 0.4,
    borderRadius: 8
  },
  closeButton: {
    position: "absolute",
    bottom: 5,
    left: "45%",
    padding: 10,
    zIndex: 99
  },
  reaction: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  },
  reactionText: {
    fontSize: 15,
    color: "black",
    marginRight: 10,
    fontWeight: "200"
  },
  reactionTextActive: {
    fontSize: 15,
    color: "#15b3ee",
    marginRight: 10,
    fontWeight: "700"
  }
});
