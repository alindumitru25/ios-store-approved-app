import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  askBoxContainer: {
    position: "relative",
    width: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 78
  },
  askBoxContainerSmall: {
    position: "relative",
    width: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 45
  },
  askBox: {
    position: "relative",
    width: "95%",
    height: 40,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 99999
  },
  askBoxInput: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    height: "75%",
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 15,
    paddingRight: 50,
    backgroundColor: "#f3f2f2",
    borderRadius: 17,
    color: "black",
    fontWeight: "200"
  },
  askBoxIcon: {
    width: 32,
    height: 32,
    borderRadius: 36,
    marginLeft: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  post_avatar_wrapper: {
    width: 32,
    height: 32,
    borderRadius: 32,
    overflow: "hidden"
  },
  post_avatar: {
    width: 32,
    height: 32
  },
  askBoxIconClose: {
    width: 35,
    height: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  questionsContainer: {
    height: "100%",
    flex: 1,
    maxHeight: "100%"
  },
  questionsTitle: {
    fontSize: 15,
    backgroundColor: "transparent",
    color: "#464646",
    marginTop: 15,
    fontWeight: "300"
  },
  questionsTitleBig: {
    fontSize: 17,
    letterSpacing: -0.5,
    fontWeight: "700",
    backgroundColor: "transparent",
    color: "#464646",
    marginTop: 10
  },
  questionsTitleBigOrange: {
    fontSize: 17,
    letterSpacing: -0.5,
    fontWeight: "400",
    backgroundColor: "#464646",
    color: "white",
    marginTop: 10,
    padding: 5,
    borderRadius: 4,
    overflow: "hidden"
  },
  askForm: {
    width: "100%",
    backgroundColor: "#f4f4f4",
    paddingTop: 0
  },
  askQuestionButton: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: 10
  },
  whiteBg: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 3,
    marginTop: 10,
    minHeight: 45,
    flexDirection: "row",
    marginRight: 10
  },
  grayBg: {
    width: "100%",
    backgroundColor: "#eaeaea",
    borderRadius: 3,
    marginTop: 10,
    minHeight: 45,
    flexDirection: "row",
    marginRight: 10
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "300",
    marginRight: 15
  },
  categoryTouch: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#eaeaea",
    marginTop: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 2
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonIcon: {
    marginLeft: 5,
    marginRight: 5
  },
  activeText: {
    color: "#21beeb",
    fontWeight: "bold"
  },
  loadingContainer: {
    width: "100%",
    height: "100%"
  },
  questionLabel: {
    position: "relative",
    minHeight: 38,
    padding: 5,
    paddingRight: 30,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  questionText: {
    fontFamily: "Helvetica Neue",
    marginTop: 9,
    marginLeft: 8,
    fontSize: 13,
    letterSpacing: 0.5,
    fontWeight: "300"
  },
  commentIcon: {
    position: "absolute",
    top: "40%",
    padding: 10,
    right: 0
  },
  likeCount: {
    marginLeft: 5,
    marginRight: 10,
    fontSize: 12,
    color: "#9e9e9e"
  },
  questionRight: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingRight: 30
  },
  questionStatistic: {
    marginLeft: 8,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  questionStatisticText: {
    fontSize: 12,
    fontWeight: "300",
    color: "#464646"
  },
  questionBoldText: {
    fontFamily: "Helvetica Neue",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.5,
    color: "black"
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 8,
    paddingBottom: 15
  },
  buttonActiveText: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
    marginLeft: 5,
    backgroundColor: "transparent"
  },
  questionClose: {
    position: "absolute",
    top: -10,
    right: 0,
    zIndex: 10,
    padding: 15
  },
  questionContainer: {
    width,
    position: "absolute",
    top: 2,
    bottom: 0,
    left: 0,
    right: 0,
    height: height - 98,
    zIndex: 10,
    backgroundColor: "white"
  },
  questionContent: {
    padding: 8,
    position: "relative",
    marginTop: 0
  },
  questionTextForm: {
    position: "relative",
    width: "95%",
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
    padding: 10,
    backgroundColor: "#eaeaea",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  questionFormText: {
    fontSize: 14,
    fontWeight: "300"
  },
  questionAuthorWrapper: {
    alignItems: "center",
    marginTop: 5,
    marginLeft: 15
  },
  questionAuthorAvatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden"
  },
  questionAuthorAvatar: {
    width: 32,
    height: 32
  },
  placeHolderContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  placeHolderTitle: {
    fontSize: 12,
    color: "#464646",
    paddingBottom: 10
  },
  placeHolderText: {
    fontSize: 11,
    color: "#464646"
  },
  productWrapper: {
    padding: 5,
    paddingBottom: 8,
    paddingLeft: 0
  },
  productContainer: {
    width: "100%",
    borderRadius: 7
  },
  productDescription: {
    fontSize: 12,
    fontWeight: "300",
    backgroundColor: "#e5e6e6",
    padding: 7,
    color: "#464646",
    borderRadius: 7,
    overflow: "hidden"
  },
  productImage: {
    height: 180,
    borderRadius: 2,
    resizeMode: "cover"
  },
  topContent: {
    width: "100%",
    paddingBottom: 8
  },
  bottomContent: {
    width: "100%",
    paddingTop: 5
  },
  productAddress: {
    fontSize: 11,
    fontWeight: "300",
    paddingTop: 3,
    padding: 3,
    height: 20,
    lineHeight: 15,
    backgroundColor: "#e5e6e6",
    width: "100%",
    opacity: 1
  },
  productMatchingList: {
    width: "100%",
    flexDirection: "row"
  },
  questionImageContainer: {
    backgroundColor: "#e5e6e6",
    padding: 5,
    marginTop: 10,
    borderRadius: 10
  },
  questionImage: {
    height: 340,
    resizeMode: "cover"
  },
  questionActionBox: {
    padding: 8,
    paddingLeft: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999,
    width: "100%",
    height: 45
  },
  actionButton: {
    height: 26,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  actionButtonStretch: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  actionButtonText: {
    fontSize: 14,
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 4,
    overflow: "hidden",
    marginLeft: 5,
    color: "#464646"
  },
  actionButtonTextSmaller: {
    fontSize: 13,
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 4,
    overflow: "hidden",
    marginLeft: 5,
    color: "#464646"
  },
  actionContainer: {
    width: "100%",
    borderTopWidth: 0.5,
    borderTopColor: "#cccccc",
    backgroundColor: "white"
  },
  containerSmall: {},
  containerLarge: {
    height: 320
  },
  commentBoxContainer: {
    width: "100%",
    padding: 10
  },
  commentBox: {
    borderWidth: 1,
    borderColor: "#6d6d6d",
    borderRadius: 5,
    padding: 10,
    paddingTop: 10,
    paddingRight: 50, // make room for send button
    fontSize: 12,
    fontWeight: "300",
    color: "#464646"
  },
  sendIconContainer: {
    position: "absolute",
    top: 0,
    right: 5,
    padding: 8
  },
  active: {
    color: "#61c2d1"
  },
  inactive: {
    color: "#464646"
  },
  commentContainer: {
    flexDirection: "column"
  },
  commentWrapper: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 5
  },
  comment: {
    flexGrow: 1,
    backgroundColor: "#eaeaea",
    padding: 8,
    borderRadius: 16,
    marginLeft: 5,
    marginBottom: 5
  },
  commentRow: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#eaeaea",
    padding: 8,
    borderRadius: 16,
    marginLeft: 5,
    marginBottom: 5,
    justifyContent: "space-between"
  },
  commentText: {
    fontWeight: "300"
  },
  addLocationWrapper: {
    width: "100%",
    marginTop: 12,
    alignItems: "flex-start"
  },
  addLocationWrapperCol: {
    width: "100%",
    marginTop: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  locationChooserWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 2,
    backgroundColor: "#f1f1f1",
    zIndex: 50
  },
  closeButtonWrapper: {
    width: 18,
    height: 18,
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8d8d8d"
  },
  addressContainer: {
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  closeButtonContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  commentLocationWrapper: {
    flex: 1,
    flexDirection: "row",
    flexBasis: "80%"
  },
  commentLocationText: {
    fontSize: 12,
    fontWeight: "300",
    marginLeft: 10
  },
  col: {
    flexGrow: 1,
    flexDirection: "column"
  },
  searchIco: {
    position: "absolute",
    top: 12,
    right: 25,
    backgroundColor: "transparent"
  },
  questionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#dfdfdf",
    padding: 10,
    paddingTop: 7,
    paddingBottom: 9
  },
  user_avatar_wrapper: {
    width: 35,
    height: 35,
    borderRadius: 35,
    borderWidth: 2,
    marginTop: 4,
    borderColor: "#e8e8e8",
    overflow: "hidden"
  },
  user_avatar: {
    width: 35,
    height: 35
  },
  user_avatar_container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    position: "relative"
  },
  dot: {
    minWidth: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    justifyContent: "center"
  },
  dotText: {
    fontSize: 10,
    color: "black",
    fontWeight: "200"
  },
  questionAuthor: {
    position: "relative",
    width: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 52
  },
  authorName: {
    marginTop: 10,
    fontSize: 18,
    color: "white",
    backgroundColor: "transparent"
  },
  authorDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 26,
    marginLeft: 10,
    paddingLeft: 10,
    marginRight: 10,
    paddingRight: 10,
    backgroundColor: "#f3f2f2",
    borderRadius: 20
  },
  authorDetailsWrapper: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  messageTail: {
    position: "absolute",
    top: -18,
    left: 20,
    width: 25,
    height: 25,
    resizeMode: "cover"
  },
  flexContainer: {
    flex: 1
  },
  titleText: {
    fontSize: 21,
    color: "black",
    fontWeight: "700",
    paddingLeft: 10,
    marginBottom: 5
  },
  filterText: {
    fontSize: 19,
    color: "white",
    opacity: 0.7,
    fontWeight: "700",
    backgroundColor: "transparent",
    marginRight: 15
  },
  filterWrapper: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 20,
    marginTop: 6
  },
  filterTextSelected: {
    fontSize: 19,
    color: "white",
    fontWeight: "700",
    backgroundColor: "transparent",
    marginRight: 15
  },
  expandText: {
    fontSize: 17,
    color: "white",
    fontWeight: "500",
    backgroundColor: "transparent"
  },
  expandedTextWrapper: {
    width: "100%",
    marginTop: 10,
    paddingLeft: 20,
    alignItems: "flex-start"
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "300"
  },
  commentActionsWrapper: {
    flexGrow: 1,
    paddingRight: 25,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  actionText: {
    marginRight: 10,
    fontSize: 12,
    color: "#464646"
  },
  questionLikesWrapper: {
    width: 13,
    height: 13,
    backgroundColor: "#12cde8",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  spinnerWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  replyTextWrapper: {
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 8
  },
  replyText: {
    fontSize: 13,
    borderRadius: 4,
    overflow: "hidden",
    color: "#21beeb"
  },
  questionNotificationWrapper: {
    position: "absolute",
    top: 3,
    left: 10,
    width: "94%",
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    borderColor: "#b9b9b9",
    borderRadius: 12,
    zIndex: 999
  },
  questionNotification: {
    position: "relative",
    padding: 10,
    paddingRight: 20
  },
  questionNotificationText: {
    fontSize: 12,
    color: "#464646"
  },
  questionNotificationClose: {
    position: "absolute",
    right: 5,
    padding: 8
  },
  repliesWrapper: {
    width: "100%",
    paddingLeft: 40
  },
  repliedUsername: {
    fontWeight: "600"
  },
  productToShareWrapper: {
    width: "100%",
    marginTop: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  productChooserTextWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexBasis: "90%"
  },
  productToShareToucheable: {
    flexDirection: "row"
  },
  commentProductWrapper: {
    flexDirection: "column",
    marginLeft: 5,
    flex: 1,
    flexBasis: "80%"
  },
  commentProductDescription: {
    fontWeight: "600",
    textDecorationLine: "underline"
  },
  commentProductTitle: {
    flexGrow: 1,
    fontSize: 14,
    fontStyle: "italic"
  },
  userDescriptionWrapper: {
    width: "100%"
  },
  userDescription: {
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default styles;
