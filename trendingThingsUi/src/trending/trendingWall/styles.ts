import { Dimensions, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  address: {
    fontSize: 14
  },
  trendingWallTitle: {
    fontFamily: "Raleway",
    fontWeight: "300",
    fontSize: 27,
    color: "white"
  },
  shadow: {
    flex: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 7,
      height: 7
    },
    shadowRadius: 8,
    shadowOpacity: 0.5
  },
  emptyPostsWrapper: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 27
  },
  emptyPosts: {
    fontFamily: "Raleway",
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "400",
    lineHeight: 29,
    marginLeft: 8
  },
  loadMoreWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 25
  },
  loadMoreButton: {
    padding: 5,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  loadMoreText: {
    fontFamily: "Raleway",
    color: "white",
    fontSize: 16,
    marginLeft: 8,
    marginTop: -1
  },
  shareButtonWrapper: {
    margin: 15,
    marginTop: 30
  }
});

export default styles;
