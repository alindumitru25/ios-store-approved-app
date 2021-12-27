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
  content: {
    padding: 10,
    flex: 1
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 5,
    padding: 15,
    zIndex: 99
  },
  filterHeader: {
    position: "absolute",
    top: 60,
    left: 10,
    flexDirection: "row"
  },
  filterText: {
    fontSize: 25,
    backgroundColor: "transparent",
    fontWeight: "200",
    color: "#464646"
  },
  filterIcon: {
    backgroundColor: "transparent",
    marginTop: 3,
    marginRight: 10
  },
  contentWrapper: {
    padding: 15,
    paddingTop: 0
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "300"
  },
  filterWrapper: {
    marginBottom: 20
  },
  filterContent: {
    padding: 15,
    paddingTop: 0,
    flex: 1
  },
  checkBoxText: {
    fontSize: 15,
    fontWeight: "200"
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    height: 25
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
    overflow: "hidden",
    margin: 3
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "200"
  },
  buttonOutline: {
    borderColor: "#222222",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    height: 28,
    overflow: "hidden",
    margin: 3
  },
  buttonOutlineText: {
    fontSize: 14,
    color: "#464646",
    fontWeight: "200"
  }
});

export default styles;
