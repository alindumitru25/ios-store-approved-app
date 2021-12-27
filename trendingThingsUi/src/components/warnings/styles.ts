import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  absoluteWarning: {
    position: "absolute",
    top: 0,
    left: 0,
    ...ifIphoneX(
      {
        height: 85
      },
      {
        height: 65
      }
    ),
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "red",
    borderBottomColor: "#ca0101",
    borderBottomWidth: 4
  },
  warningText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  absoluteClose: {
    position: "absolute",
    right: 12,
    bottom: 6
  }
});
