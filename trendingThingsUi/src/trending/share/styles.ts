import { Dimensions, StyleSheet } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  image: {
    width: width,
    flexGrow: 1
  },
  imageWrapper: {
    height: 200,
    overflow: "hidden"
  },
  informativeText: {
    padding: 20,
    paddingTop: 0,
    fontSize: 13,
    fontWeight: "300"
  },
  textInputWhite: {
    fontSize: 14,
    color: "white",
    fontWeight: "300",
    flexGrow: 1,
    marginLeft: 10
  },
  textInputBlack: {
    fontSize: 15,
    fontWeight: "300",
    color: "black",
    flexGrow: 1,
    padding: 8,
    paddingTop: 7.5,
    paddingLeft: 8,
    height: "100%",
    borderWidth: 1,
    borderRadius: 17,
    position: "relative"
  },
  textInputBlackWithIcon: {
    fontSize: 15,
    fontWeight: "300",
    color: "black",
    flexGrow: 1,
    padding: 8,
    paddingTop: 7.5,
    paddingLeft: 30,
    height: "100%",
    borderWidth: 1,
    borderRadius: 17,
    position: "relative"
  },
  tag: {
    borderRadius: 4,
    overflow: "hidden",
    color: "black",
    fontWeight: "300",
    padding: 8,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 12,
    marginLeft: 5,
    backgroundColor: "#00f6ff"
  },
  normalText: {
    marginLeft: 10,
    color: "black",
    fontSize: 14,
    fontWeight: "300"
  },
  scroll: {
    alignItems: "center",
    justifyContent: "center"
  },
  // LocationChooser
  trendinglocation_description: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -60,
    left: -90
  },
  // Trending Locations marker
  marker_trending: {
    width: 210,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    padding: 10,
    borderRadius: 18,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center"
  },
  marker_trending_description: {
    width: 210,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  marker_text: {
    fontSize: 12,
    color: "white",
    overflow: "hidden",
    marginLeft: 8
  },
  add_new_location_button: {
    position: "absolute",
    flexDirection: "row",
    bottom: 10,
    left: width / 2 - 90,
    width: 180,
    height: 35,
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    borderRadius: 18,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  add_new_location_button_text: {
    color: "white",
    fontSize: 13,
    marginLeft: 5
  },
  description_panel: {
    position: "absolute",
    left: 25,
    right: 25,
    bottom: 200,
    width: width - 50,
    height: 200,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "rgba(10, 10, 10, 0.9)",
    zIndex: 10
  },
  description_title: {
    fontSize: 14,
    color: "white"
  },
  description_text: {
    fontSize: 12,
    color: "white",
    marginTop: 10
  },
  description_input_area: {
    flex: 1,
    fontSize: 13,
    marginLeft: 15
  },
  description_section: {
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    padding: 20,
    flexDirection: "row"
  },
  section: {
    padding: 20,
    flexDirection: "row"
  },
  button_text: {
    fontSize: 12,
    color: "white",
    marginLeft: 5
  },
  headerButton: {
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center"
  },
  headerButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Raleway"
  },
  locationChooser: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
  modalWrapper: {
    flex: 1,
    width: width,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  modal: {
    position: "relative",
    width: width - 10,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 12,
    shadowOpacity: 0.2,
    borderRadius: 7,
    maxHeight: "90%",
    paddingBottom: 5,
    padding: 10,
    overflow: "hidden"
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: 0,
    padding: 0,
    height: 25
  },
  checkBoxText: {
    fontSize: 15,
    fontWeight: "200"
  },
  headerBlackText: {
    fontFamily: "Raleway",
    fontSize: 21,
    fontWeight: "200"
  },
  roundOutButton: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 3,
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12
  },
  roundOutButtonText: {
    fontSize: 17,
    color: "white",
    fontFamily: "Raleway"
  },
  disabledInput: {
    backgroundColor: "#f6f6f6",
    borderColor: "#d3d3d3",
    color: "#c2c2c2"
  },
  absoluteIcon: {
    position: "absolute",
    top: 8,
    left: 8
  },
  renderWrapper: {
    position: "relative",
    flex: 1
  },
  contentWrapper: {
    backgroundColor: "white",
    padding: 8,
    margin: 4,
    borderRadius: 17,
    marginTop: 20
  },
  loadingWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  stepWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  descriptionWrapper: { position: "relative", maxHeight: 80 },
  errorWrapper: { color: "red", marginTop: 5 },
  priceWrapper: {
    height: 30,
    marginTop: 4,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },
  locationWrapper: {
    height: 30,
    marginTop: 4,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    borderRadius: 17
  },
  categoryWrapper: {
    height: 30,
    marginTop: 4,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    borderRadius: 17
  },
  tagsWrapper: {
    marginTop: 4,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    borderRadius: 17
  },
  stretch: { flex: 1 },
  tagsHeaderWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 5
  },
  tagsHeaderText: {
    fontSize: 22,
    color: "white",
    fontFamily: "Raleway"
  },
  addTagLabelContainer: {
    marginLeft: 0,
    width: "100%",
    padding: 0
  },
  addTagLabelStyle: {
    width: "100%",
    color: "black",
    fontWeight: "300",
    marginLeft: 0,
    fontSize: 15
  },
  addTagFormContainerStyle: {
    marginLeft: 0,
    width: "100%"
  },
  addTagInputStyle: {
    paddingRight: 130
  },
  addTagActionButtonsWrapper: {
    position: "absolute",
    right: 5,
    bottom: 8,
    flexDirection: "row"
  },
  addTagActionButtons: {
    height: 21,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
    alignItems: "center"
  },
  doneButtonWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  doneButton: { padding: 4, maxWidth: 130 },
  tagsLoadingWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10
  }
});

export default styles;
