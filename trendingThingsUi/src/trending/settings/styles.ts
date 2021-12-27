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
    borderRadius: 17,
    padding: 12,
    minHeight: 40,
    flex: 1
  },
  containerStyle: {
    margin: 4,
    backgroundColor: "white",
    borderRadius: 17,
    padding: 12,
    minHeight: 40
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
  row: {
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    marginBottom: 8
  },
  textInputBlack: {
    fontSize: 14,
    fontWeight: "300",
    color: "black",
    flexGrow: 1,
    marginLeft: 10
  },
  headerButton: {
    marginTop: 10,
    maxWidth: 150,
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
  }
});

export default styles;
