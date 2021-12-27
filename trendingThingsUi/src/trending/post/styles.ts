import { StyleSheet } from "react-native";

export default StyleSheet.create({
  address: {
    flex: 1
  },
  emptyWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    padding: 5,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#efefef",
    borderRadius: 3
  },
  emptyText: {
    fontSize: 15,
    color: "black",
    fontWeight: "300",
    borderRadius: 12,
    overflow: "hidden",
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10
  },
  emptyTextActive: {
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "300"
  },
  commentBoxContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1"
  },
  commentBox: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 17,
    padding: 8,
    paddingTop: 8,
    paddingRight: 50, // make room for send button
    fontSize: 14,
    fontWeight: "300",
    color: "black"
  },
  sendIconContainer: {
    position: "absolute",
    top: "50%",
    marginTop: -15,
    right: 35,
    padding: 8
  },
  active: {
    color: "#61c2d1"
  },
  inactive: {
    color: "#464646"
  },
  commentsWrapper: {
    position: "relative",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#efefef"
  },
  repliesWrapper: {
    flex: 1
  },
  commentWrapper: {
    marginTop: 3,
    padding: 5,
    flexDirection: "column",
    borderRadius: 3
  },
  replyWrapper: {
    flexDirection: "column",
    paddingLeft: 30,
    padding: 3,
    flex: 1,
    borderRadius: 3
  },
  commentHighlighted: {
    backgroundColor: "#eeeeee"
  },
  comment: {
    position: "relative",
    flexGrow: 1,
    flex: 1,
    padding: 8,
    borderRadius: 16,
    marginLeft: 5,
    marginBottom: 0
  },
  postRatingWithComment: {
    position: "absolute",
    top: -16,
    right: 5,
    borderRadius: 17,
    padding: 3,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  postRating: {
    marginTop: 5,
    width: 90
  },
  commentText: {
    fontSize: 15,
    color: "black",
    fontWeight: "200",
    marginTop: 8
  },
  userDescription: {
    marginTop: -7,
    fontFamily: "Helvetica Neue",
    fontSize: 17,
    fontWeight: "400"
  },
  commentActionsWrapper: {
    flexGrow: 1,
    marginTop: -3,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  questionLikesWrapper: {
    width: 13,
    height: 13,
    backgroundColor: "#12cde8",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  likeCount: {
    marginLeft: 5,
    marginRight: 10,
    fontSize: 12,
    color: "#9e9e9e"
  },
  actionText: {
    marginRight: 10,
    fontSize: 15,
    color: "black"
  },
  closeButton: {
    width: 18,
    height: 18,
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginLeft: 5
  },
  postWrapper: {
    flex: 1
  },
  postWrapperWithKeyboardPadding: {},
  replyingTo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    marginTop: 5
  },
  replyingToText: {
    fontSize: 12,
    color: "#464646"
  },
  replyingToTextUsername: {
    fontWeight: "600"
  },
  touchPadding: {
    padding: 5,
    alignItems: "center"
  },
  replyUserName: {
    fontSize: 16,
    fontWeight: "600"
  },
  repliesToggleShow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  repliesToggleShowText: {
    fontWeight: "500",
    padding: 6
  },
  addCommentWrapper: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#efefef"
  },
  addComment: {
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
    alignItems: "center",
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    borderRadius: 27,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  addCommentText: {
    fontSize: 15,
    color: "black",
    marginRight: 10
  },
  reviewsWrapper: {
    position: "relative",
    paddingTop: 15,
    borderTopWidth: 0.5,
    borderTopColor: "#efefef",
    flex: 1
  },
  ratingWrapper: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  rating: {
    width: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  ratingText: {
    fontSize: 15,
    fontWeight: "200",
    marginBottom: 8
  },
  postHeader: {
    width: "100%",
    height: 230,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
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
  editPostTooltip: {
    position: "absolute",
    top: -35,
    left: 5,
    backgroundColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    padding: 8,
    paddingTop: 6,
    paddingBottom: 6
  },
  editPostTooltipText: {
    color: "white",
    fontSize: 15,
    marginLeft: 10
  },
  arrowDown: {
    position: "absolute",
    left: "50%",
    marginLeft: -6,
    bottom: -13,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgb(15, 15, 15)"
  },
  textInputBlack: {
    fontSize: 14,
    fontWeight: "300",
    color: "black",
    flexGrow: 1,
    marginLeft: 10
  }
});
