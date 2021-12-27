import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingLeft: 5
  },
  container: {
    margin: 4,
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 17,
    padding: 0,
    minHeight: 60,
    flex: 1
  },
  headerTitle: {
    fontFamily: "Raleway",
    fontWeight: "300",
    fontSize: 27,
    color: "white"
  },
  emptyWrapper: {
    padding: 15,
    borderRadius: 17,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white"
  },
  emptyText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "200"
  },
  notificationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8"
  },
  notificationWrapperLast: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%"
  },
  notificationText: {
    fontSize: 16,
    marginLeft: 6
  },
  date: {
    marginTop: 3,
    fontSize: 14,
    color: "#3f3f3f"
  },
  avatarWrapper: {
    height: "100%",
    alignItems: "flex-start"
  },
  notificationUnchecked: {
    backgroundColor: "#dbe7f4"
  },
  notificationItemWrapper: {
    backgroundColor: "white",
    marginLeft: 5,
    marginRight: 5
  },
  notificationItemWrapperFirst: {
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    overflow: "hidden"
  },
  notificationItemWrapperLast: {
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    marginBottom: 10,
    overflow: "hidden"
  }
});

export default styles;
