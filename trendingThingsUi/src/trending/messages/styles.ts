import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingLeft: 5
  },
  headerTitle: {
    fontFamily: "Raleway",
    fontWeight: "300",
    fontSize: 27,
    color: "white"
  },
  emptyWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  emptyText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "200"
  },
  container: {
    margin: 4,
    backgroundColor: "white",
    borderRadius: 17,
    padding: 10,
    minHeight: 60,
    flex: 1
  },
  modalWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    paddingLeft: 5,
    paddingRight: 5,
    ...ifIphoneX(
      {
        paddingTop: 30,
        paddingBottom: 30
      },
      {
        paddingTop: 20,
        paddingBottom: 10
      }
    )
  },
  modal: {
    position: "relative",
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 12,
    shadowOpacity: 0.2,
    paddingBottom: 5,
    overflow: "hidden",
    borderRadius: 17
  },
  closeButton: {
    position: "absolute",
    top: 3,
    right: 5,
    padding: 15,
    zIndex: 99
  },
  messageHeader: {
    width: "100%",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center"
  },
  messageHeaderText: {
    fontSize: 18,
    fontWeight: "400"
  },
  messageInputContainer: {
    borderWidth: 1,
    borderColor: "#3a3a3a",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center"
  },
  composerTextInput: {
    fontSize: 14,
    color: "#3a3a3a"
  },
  sendIcon: {
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 15,
    color: "#3a3a3a"
  },
  sendIconInactive: {
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 15,
    color: "#c6c6c6"
  },
  messageSubheader: {
    fontSize: 14,
    marginTop: 4
  },
  absIcon: {
    position: "absolute",
    top: 3,
    left: 5,
    padding: 15,
    zIndex: 99
  },
  receiverWrapper: {
    flex: 1,
    paddingBottom: 13,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#bdbdbd"
  },
  receiverWrapperLast: {
    flex: 1
  },
  receiverContainer: {
    width: "100%",
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  receiver: {
    marginLeft: 8,
    flex: 1
  },
  receiverName: {
    fontSize: 19
  },
  lastMessage: {
    flex: 1,
    fontSize: 15,
    marginTop: 1
  },
  date: {
    marginTop: 3,
    fontSize: 14,
    color: "#3f3f3f"
  },
  addImageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    paddingRight: 5,
    marginTop: 4,
    marginBottom: 8,
    borderRightWidth: 0.5
  },
  closeButtonBlue: {
    position: "absolute",
    top: 10,
    right: 5,
    padding: 15,
    zIndex: 99,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#0a94ff",
    alignItems: "center",
    justifyContent: "center"
  },
  sendButton: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#0a94ff",
    alignItems: "center",
    justifyContent: "center"
  },
  newMessagesWrapper: {
    minWidth: 18,
    height: 18,
    borderRadius: 90,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9,
    marginTop: 8
  },
  newMessagesText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    backgroundColor: "transparent"
  }
});

export default styles;
