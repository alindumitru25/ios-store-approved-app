import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flexDirection: "column"
  },
  settingsButton: {
    flexDirection: "row",
    backgroundColor: "rgba(10, 10, 10, 0.90)",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    fontWeight: "300",
    marginLeft: 5
  },
  settingsButtonWrapper: {
    position: "relative",
    zIndex: 9
  },
  settingsDropdown: {
    position: "absolute",
    width: 190,
    top: 15,
    marginLeft: -20,
    backgroundColor: "rgba(10, 10, 10, 0.99)",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    zIndex: 9
  },
  dropdownText: {
    fontSize: 17,
    color: "white",
    fontWeight: "300",
    marginBottom: 8
  },
  shareButtonWrapper: { marginTop: 10, width: 230 },
  loadMoreButton: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "white",
    width: 110,
    alignItems: "center",
    justifyContent: "center"
  },
  loadMoreText: {
    fontSize: 16,
    color: "white"
  }
});

export default styles;
