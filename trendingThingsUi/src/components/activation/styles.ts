import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingLeft: 5,
    paddingRight: 5
  },
  modal: {
    position: "relative",
    width: "100%",
    height: 120,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.9,
    paddingBottom: 5,
    overflow: "hidden",
    borderRadius: 5,
    padding: 15
  },
  textHeader: {
    marginTop: 8,
    fontSize: 15,
    color: "black",
    textAlign: "center"
  },
  text: {
    fontSize: 15,
    color: "black"
  },
  closeButton: {
    position: "absolute",
    top: 3,
    right: 5,
    padding: 15,
    zIndex: 99
  }
});

export default styles;
