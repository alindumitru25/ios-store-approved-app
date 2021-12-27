import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  modal: {
    position: "relative",
    width: "100%",
    minHeight: 20,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 12,
    shadowOpacity: 0.2,
    borderRadius: 2,
    maxHeight: "90%",
    paddingBottom: 5,
    overflow: "hidden"
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 5,
    padding: 15,
    zIndex: 99
  },
  inputPicker: {
    marginTop: 5,
    height: 220,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 2,
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    overflow: "hidden"
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: "200",
    color: "black",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderWidth: 0,
    lineHeight: 50
  },
  pickerIcon: {
    position: "absolute",
    top: "50%",
    left: 10,
    fontSize: 21
  },
  button: {
    backgroundColor: "#222222",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    height: 28,
    width: 150,
    overflow: "hidden",
    margin: 3
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "200"
  },
  errorWrapper: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20
  },
  redText: {
    fontSize: 17,
    color: "red"
  },
  errorIcon: {
    fontSize: 17,
    marginRight: 5
  }
});
export default styles;
