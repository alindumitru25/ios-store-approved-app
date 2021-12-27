import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export let styles = StyleSheet.create({
  input: {
    marginTop: 5,
    height: 40,
    padding: 4,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 4,
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
  inputPicker: {
    marginTop: 5,
    height: 115,
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
  inputText: {
    width: width,
    height: 38,
    color: "black",
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: "300"
  },
  text: {
    width: width,
    lineHeight: 38,
    color: "black",
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "300"
  },
  inputError: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "red",
    color: "red"
  },
  loginPanel: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  registerPanel: {
    width: "100%",
    marginTop: 15,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20
  },
  logo: {
    width: 66,
    height: 70
  },
  title: {
    fontFamily: "Raleway",
    fontSize: 31,
    color: "white",
    fontWeight: "200",
    textShadowColor: "rgba(0, 0, 0, 0.08)",
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1
  },
  button: {
    width: 120,
    height: 28,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent"
  },
  buttonText: {
    color: "white",
    fontSize: 18
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
  errorIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    fontSize: 17
  },
  textInfo: {
    fontSize: 17,
    color: "white",
    marginBottom: 2,
    marginTop: 6,
    backgroundColor: "transparent"
  },
  registerWrapper: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  logoWrapper: {
    position: "absolute",
    top: 50,
    left: "50%",
    marginLeft: -30,
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 3
  },
  logoText: {
    fontSize: 40,
    color: "white"
  },
  logoAbs: {
    position: "absolute",
    left: "50%",
    marginLeft: -30,
    top: 140,
    width: 66,
    height: 70
  },
  oneColumnCenter: {
    height: "33%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  oneColumnEnd: {
    height: "33%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  loginWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  centerView: {
    alignItems: "center"
  },
  paddedWrapper: {
    width: "90%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
