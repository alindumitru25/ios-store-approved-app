import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    paddingTop: 40,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
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
    borderRadius: 4,
    overflow: "hidden"
  },
  content: {
    padding: 10,
    paddingTop: 0,
    flex: 1
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 5,
    padding: 15,
    zIndex: 99
  },
  header: {
    width: "100%",
    paddingTop: 2,
    paddingBottom: 14
  },
  title: {
    fontSize: 25,
    backgroundColor: "transparent",
    fontWeight: "200",
    color: "#464646"
  },
  emptyWrapper: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  emptyText: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center"
  },
  productsWrapper: {
    flex: 1
  },
  productWrapper: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 3,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2"
  },
  productHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "200",
    color: "#464646",
    flexBasis: "80%"
  },
  productImageWrapper: {},
  productImage: {
    width: "100%",
    height: 370
  },
  selectIcon: {
    flexDirection: "row",
    justifyContent: "center"
  },
  selectIconText: {
    marginLeft: 3,
    fontWeight: "200"
  },
  flexContainer: {
    flex: 1
  },
  productBottom: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  postAvatarWrapper: {
    width: 20,
    height: 20,
    borderRadius: 20,
    overflow: "hidden"
  },
  postAvatar: {
    width: 20,
    height: 20
  },
  bottomText: {
    fontSize: 12,
    fontWeight: "200",
    color: "#464646",
    marginLeft: 8
  },
  headerContent: {
    position: "absolute",
    top: 60,
    left: 10,
    flexDirection: "row"
  },
  headerIcon: {
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 10
  }
});

export default styles;
