import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 15
  },
  actionContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  topActionContainer: {
    position: "absolute",
    top: 25,
    left: 0,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: "100%",
    flexGrow: 1
  },
  actionButton: {
    height: 36,
    marginLeft: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  actionButtonSmall: {
    height: 34,
    marginLeft: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    marginBottom: 10
  },
  actionButtonText: {
    fontSize: 14,
    overflow: "hidden",
    color: "white",
    fontWeight: "300"
  },
  actionButtonTextSmall: {
    fontSize: 12,
    overflow: "hidden",
    color: "white",
    fontWeight: "300"
  },
  locationIconWrapper: {
    position: "absolute",
    bottom: 10,
    right: 10
  },
  locationIcon: {
    height: 26,
    marginLeft: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#202020"
  },
  markerWrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -26,
    marginTop: -105
  },
  marker: {
    width: 55,
    resizeMode: "contain"
  },
  searchBarContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10
  },
  searchBarWrapper: {
    position: "relative",
    flexDirection: "row",
    height: "100%",
    alignItems: "center"
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    top: 12,
    left: 10
  },
  searchBar: {
    width: 280,
    height: 23,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    paddingLeft: 32,
    paddingRight: 8,
    justifyContent: "center"
  },
  searchBarText: {
    color: "#686868",
    fontSize: 14
  },
  grayWrapper: {
    backgroundColor: "#f1f1f1",
    marginLeft: 5,
    borderRadius: 4,
    minWidth: 30,
    height: 23,
    alignItems: "center",
    justifyContent: "center"
  },
  contentWrapper: {
    flexGrow: 1
  },
  searchContainer: {
    backgroundColor: "white"
  },
  textInputContainer: {
    backgroundColor: "white",
    borderWidth: 0
  },
  textInput: {
    backgroundColor: "#f1f1f1",
    height: 28,
    borderRadius: 20,
    fontSize: 13
  },
  powered: {
    opacity: 0
  },
  predefinedPlacesDescription: {
    backgroundColor: "#f1f1f1",
    height: 28,
    borderRadius: 18,
    overflow: "hidden",
    fontSize: 13,
    lineHeight: 28,
    paddingLeft: 6,
    paddingRight: 6
  },
  separator: {
    opacity: 0
  },
  locationPanel: {
    flexGrow: 1,
    padding: 10
  },
  locationPanelWrapper: {
    marginBottom: 20
  },
  bigTitle: {
    color: "black",
    fontSize: 25,
    letterSpacing: -0.5,
    fontWeight: "bold"
  },
  text: {
    fontSize: 13,
    color: "#464646",
    fontWeight: "300"
  },
  newLocationInput: {
    width: "100%",
    height: 28,
    backgroundColor: "#e5e5e5",
    borderRadius: 28,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    fontSize: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  submitButtonWrapper: {
    width: "100%",
    alignItems: "center"
  },
  submitButton: {
    width: 130,
    padding: 8,
    borderRadius: 28,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 10,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center"
  },
  submitButtonText: {
    fontSize: 13,
    color: "black",
    letterSpacing: -0.5
  },
  locationWrapper: {
    width: "100%",
    borderRadius: 28,
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 6,
    flexDirection: "row"
  },
  locationText: {
    fontSize: 13,
    color: "black"
  },
  locationList: {
    flexGrow: 1,
    width: "100%",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  locationsPanelWrapper: {
    marginBottom: 20,
    flex: 1
  },
  locationIco: {
    marginRight: 5
  },
  contentWrapperRow: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

export default styles;
