import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalWrapper: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingTop: 35,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
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
    overflow: "hidden"
  },
  content: {},
  closeButton: {
    position: "absolute",
    top: 25,
    right: 0,
    padding: 15,
    zIndex: 99,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.9
  },
  descriptionWrapper: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  descriptionText: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 19,
    textShadowColor: "rgba(0, 0, 0, 0.08)",
    textAlign: "center",
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1
  },
  scanFrame: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  scanFrameImage: {
    width: "90%",
    resizeMode: "contain",
    backgroundColor: "transparent"
  },
  header: {
    position: "absolute",
    top: 45,
    left: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  barcodeEmptyWrapper: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  emptyText: {
    fontFamily: "Raleway",
    marginTop: 58,
    fontSize: 24,
    fontWeight: "200",
    textAlign: "center",
    color: "white",
    backgroundColor: "transparent"
  },
  blackButton: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 3,
    overflow: "hidden",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    height: 25
  },
  blackButtonText: {
    fontSize: 15,
    color: "white"
  },
  barcodeText: {
    fontSize: 13,
    fontWeight: "600"
  },
  text: {
    fontSize: 17
  },
  labelText: {
    fontSize: 16,
    fontWeight: "200",
    color: "black",
    marginLeft: 0,
    marginRight: 0
  },
  addingInput: {
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 17,
    borderColor: "black",
    borderBottomColor: "black",
    justifyContent: "center",
    height: 28,
    paddingLeft: 10
  },
  locationChooser: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
  location: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#464646",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 160,
    height: 25
  },
  locationText: {
    fontSize: 13,
    fontWeight: "200"
  },
  scansWrapper: {
    flex: 1
  },
  scanWrapper: {
    padding: 5,
    paddingBottom: 10,
    marginBottom: 7
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: "#e8e8e8"
  },
  scan: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 1
  },
  scanDescriptionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    overflow: "hidden",
    paddingRight: 25
  },
  scanPriceWrapper: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 17,
    backgroundColor: "black"
  },
  scanPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "white"
  },
  scanLocation: {
    fontSize: 15,
    overflow: "hidden"
  },
  scanInfo: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  infoText: {
    fontSize: 14,
    fontWeight: "200"
  },
  infoTextRed: {
    fontSize: 12,
    fontWeight: "200",
    color: "#ff3232"
  },
  chooserText: {
    fontSize: 16,
    fontWeight: "300",
    color: "white"
  },
  chooserTextActive: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    letterSpacing: -0.5
  },
  scanViewContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 17,
    padding: 5,
    paddingTop: 8,
    marginBottom: 10,
    minHeight: 70
  },
  buttonsWrapper: {
    margin: 15,
    marginTop: 30,
    flexDirection: "row"
  },
  outlineButton: {
    padding: 7,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 27,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%"
  },
  textWrapper: {
    marginLeft: 10
  },
  headerText: {
    fontFamily: "Raleway-Regular",
    fontWeight: "300",
    fontSize: 17,
    color: "white"
  },
  filter: {
    margin: 5,
    padding: 5
  },
  activeFilter: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 17
  },
  notAutorizedText: {
    fontSize: 17,
    margin: 8,
    textAlign: "center"
  },
  closeButtonBlack: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 15,
    zIndex: 100
  }
});

export default styles;
