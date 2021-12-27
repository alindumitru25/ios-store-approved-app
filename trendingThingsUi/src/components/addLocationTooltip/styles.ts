import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tooltipWrapper: {
    position: "absolute",
    top: 75,
    right: 5,
    width: "97%",
    borderRadius: 5,
    backgroundColor: "rgba(10, 10, 10, 0.94)",
    flexDirection: "row"
  },
  container: {
    flex: 1,
    padding: 18,
    position: "relative"
  },
  textArea: {
    marginLeft: 8,
    paddingRight: 15
  },
  textHeader: {
    color: "white",
    fontSize: 19,
    fontWeight: "500"
  },
  text: {
    marginTop: 8,
    color: "white",
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "200"
  },
  arrowUp: {
    position: "absolute",
    left: "50%",
    marginLeft: -6,
    top: -13,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgb(15, 15, 15)"
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    zIndex: 9
  },
  outlineButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 3,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 8
  },
  buttonText: {
    color: "white",
    fontSize: 16
  }
});

export default styles;
