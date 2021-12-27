import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tabs: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  tab: {
    marginRight: 8
  },
  tabActive: {
    borderRadius: 12,
    padding: 4,
    paddingLeft: 13,
    paddingRight: 13,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "black"
  },
  tabText: {
    fontFamily: "Helvetica Neue",
    fontSize: 15,
    color: "#464646",
    fontWeight: "400"
  },
  tabTextActive: {
    color: "white",
    fontWeight: "400"
  }
});
