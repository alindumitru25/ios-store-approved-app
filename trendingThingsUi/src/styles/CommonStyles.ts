import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

let WHITE_PAGE_BG = "#f9f9f9";

const styles = StyleSheet.create({
  pageTitle: {
    color: "black",
    fontSize: 16
  },
  tag_wrapper: {
    height: 28,
    margin: 5
  },
  tag: {
    borderRadius: 2,
    overflow: "hidden",
    color: "black",
    fontWeight: "300",
    padding: 8,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 12,
    margin: 5,
    backgroundColor: "#f6f6f6",
    maxHeight: 28
  },
  reactionTag: {
    borderRadius: 2,
    overflow: "hidden",
    padding: 4,
    paddingTop: 2,
    paddingBottom: 2,
    margin: 5,
    backgroundColor: "#f6f6f6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  reactionTagText: {
    fontSize: 15,
    color: "black",
    fontWeight: "300"
  },
  userCount: {
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginLeft: 3,
    paddingLeft: 3,
    paddingRight: 3
  },
  userCountText: {
    color: "black",
    fontSize: 12,
    fontWeight: "200"
  },

  /**
   * WHITE PAGE
   */
  white_page_container: {
    width: width,
    height: height,
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: WHITE_PAGE_BG
  },
  white_page_content: {
    flexGrow: 1,
    width: width,
    height: height - 120,
    overflow: "hidden",
    alignItems: "center"
  },
  white_page_bar: {
    width: width,
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white"
  },
  white_page_topBar: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15, // iphone info
    borderBottomWidth: 1,
    borderBottomColor: "#e9e9e9"
  },
  white_page_bottomBar: {
    borderTopWidth: 1,
    borderTopColor: "#e9e9e9"
  },
  white_page_bottomBar_action: {
    width: width * 0.333,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  white_page_box: {
    width: width - 30,
    marginBottom: 15,
    padding: 12,
    borderRadius: 6,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center"
  },
  white_page_boxWhite: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d8d8d8"
  },
  white_page_boxBlack: {
    backgroundColor: "black"
  },
  white_page_textInputBlackBg: {
    flexGrow: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "white",
    fontWeight: "300"
  },
  white_page_informative_text: {
    color: "black",
    fontSize: 13,
    fontWeight: "300"
  },
  wrapper_around: {
    width: width - 30,
    marginLeft: 15
  },
  /**
   * WHITE PAGE END
   */
  white_input_wrapper: {
    backgroundColor: "white",
    alignItems: "center",
    margin: 15,
    marginBottom: 5,
    height: 35,
    borderWidth: 1,
    borderColor: "#d8d8d8",
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
    paddingLeft: 10,
    justifyContent: "center",
    flexDirection: "row"
  },
  white_input: {
    flexGrow: 1,
    height: 26,
    marginLeft: 5,
    fontSize: 13
  },
  location_widget: {
    backgroundColor: "white",
    alignItems: "center",
    margin: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    justifyContent: "center",
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#d8d8d8",
    borderRadius: 5,
    overflow: "hidden"
  },
  location_widget_text: {
    fontSize: 13,
    color: "black"
  },
  location_widget_icon: {
    marginBottom: 5
  },
  location_widget_map: {
    width: width,
    flexGrow: 1,
    position: "relative"
  },
  location_widget_map_pos: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  location_widget_fake_search: {
    backgroundColor: "#c9cace",
    borderTopWidth: 1,
    borderTopColor: "#a4a3a6",
    borderBottomWidth: 1,
    borderBottomColor: "#a4a3a6",
    height: 45
  },
  location_widget_fake_search_input: {
    flexDirection: "row",
    borderRadius: 5,
    height: 30,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 7
  },
  marker_wrapper: {
    width: 230,
    backgroundColor: "rgba(40, 40, 40, 0.95)",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    height: 45,
    borderRadius: 15,
    overflow: "hidden",
    flexDirection: "row"
  },
  marker_press: {
    width: 25,
    height: 25,
    position: "relative"
  },
  marker_location_area_absolute: {
    position: "absolute",
    top: 3.5,
    left: 3.5
  },
  marker_location_wrapper: {
    position: "relative"
  },
  marker_screen_center: {
    position: "absolute",
    top: 210,
    left: 73,
    alignItems: "center",
    justifyContent: "center"
  },
  marker_dot: {
    marginTop: 50
  },
  white_list: {
    flexGrow: 1,
    alignSelf: "stretch",
    marginTop: 15,
    borderRadius: 3,
    overflow: "hidden"
  },
  white_list_item: {
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopColor: "#d8d8d8",
    padding: 10
  },
  white_list_item_text: {
    fontWeight: "300",
    color: "black",
    fontSize: 13
  },
  touchable: {
    padding: 20
  },
  /**
   * TAGS STYLES
   */
  tag_overlay: {
    position: "absolute",
    top: 50,
    left: 25,
    right: 25,
    bottom: 40,
    zIndex: 10,
    width: width - 50,
    height: 200,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d8d8d8",
    backgroundColor: "white"
  },
  absoluteStretch: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9
  },
  tag_header: {
    position: "relative",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  tag_tags: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  tag_close: {
    position: "absolute",
    right: 5,
    top: 3
  },
  tag_checked: {
    position: "absolute",
    right: -10,
    top: -10
  },

  /**
   * POST styles
   */
  post_wrapper: {
    flex: 1,
    margin: 3,
    paddingTop: 8,
    paddingBottom: 0,
    marginBottom: 10,
    borderRadius: 17,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "hidden"
  },
  post_content: {
    flex: 1,
    width: "100%",
    padding: 8
  },
  post_wrapper_line: {
    backgroundColor: "#f8f8f8",
    borderWidth: 0
  },
  post_description: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: "200",
    lineHeight: 18,
    color: "black"
  },
  post_image: {
    width: width - 6,
    marginTop: 5
  },
  post_price: {
    padding: 8,
    color: "black",
    fontSize: 13
  },
  post_centered: {
    marginLeft: 10,
    marginRight: 10
  },
  post_button_wrapper: {
    alignItems: "center",
    padding: 12,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    borderRadius: 17,
    justifyContent: "center",
    backgroundColor: "black",
    height: 32
  },
  post_button: {
    paddingLeft: 8,
    paddingRight: 8,
    height: 25,
    borderRadius: 4,
    overflow: "hidden",
    fontSize: 12,
    justifyContent: "center",
    lineHeight: 25,
    marginRight: 10
  },
  post_button_color_normal: {
    backgroundColor: "#f5f4f4",
    color: "black"
  },
  likeCount: {
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#12cde8",
    color: "white",
    fontSize: 12
  },
  reactButton: {
    marginLeft: 3,
    flexDirection: "row",
    backgroundColor: "#f5f4f4",
    borderRadius: 4,
    overflow: "hidden",
    padding: 3,
    paddingLeft: 6,
    paddingRight: 6
  },
  reactButtonActive: {
    backgroundColor: "#12cde8"
  },
  reactButtonText: {
    fontSize: 12,
    color: "black",
    marginRight: 5
  },
  reactButtonTextActive: {
    color: "white"
  },
  post_button_suggestion: {
    borderWidth: 1,
    borderColor: "black",
    fontSize: 12,
    fontWeight: "300"
  },
  post_button_outlined: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 3
  },
  post_content_wide: {
    flexDirection: "row",
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  post_user: {
    fontFamily: "Helvetica Neue",
    fontSize: 18,
    fontWeight: "400",
    color: "black",
    flex: 1
  },
  post_action_button: {
    padding: 8
  },
  post_avatar_wrapper: {
    width: 30,
    height: 30,
    borderRadius: 30,
    overflow: "hidden"
  },
  post_avatar: {
    width: 30,
    height: 30
  },
  post_bg: {
    width,
    height: 100,
    resizeMode: "cover"
  },
  /**
   * User Profile Styles
   */
  user_profile_image_wrapper: {
    width: 90,
    height: 90,
    borderRadius: 90,
    marginTop: 40,
    backgroundColor: "white",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 1)"
  },
  user_profile_image: {
    width: 140,
    height: 140,
    resizeMode: "contain"
  },
  user_profile_wrapper: {
    alignItems: "center",
    justifyContent: "center"
  },
  user_profile_details: {
    width,
    height: 329,
    alignItems: "center"
  },
  user_profile_name: {
    color: "white",
    fontSize: 25,
    fontWeight: "300",
    backgroundColor: "transparent"
  },
  user_profile_email: {
    fontSize: 15,
    color: "white",
    marginLeft: 5,
    textShadowColor: "#8fc1c8"
  },
  user_profile_details_wrapper: {
    marginTop: 0,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    width: width - 30,
    padding: 20,
    paddingTop: 14
  },
  user_profile_icons: {
    marginTop: 10
  },
  user_profile_posts_empty: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 7,
    padding: 15,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  user_profile_posts_title: {
    marginLeft: 10,
    alignItems: "center"
  },
  user_profile_posts_title_text: {
    fontSize: 15,
    color: "black",
    fontWeight: "300"
  },
  user_profile_action_button: {
    marginTop: 8,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 27,
    padding: 12,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: "row"
  },
  /** COMON */
  generic_white: {
    backgroundColor: "white",
    width: width - 20,
    marginLeft: 10,
    marginTop: 5,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  top_right_position: { position: "absolute", top: 10, right: 10 },
  center_box: { padding: 20, alignItems: "center", justifyContent: "center" },
  text_light: {
    fontWeight: "300"
  },
  postTitle: {
    fontSize: 15,
    color: "#202020",
    fontWeight: "200"
  },
  subTitle: {
    fontSize: 13,
    color: "#6c6c6c",
    fontWeight: "300"
  },
  text_normal: { fontSize: 14, color: "black", textAlign: "center" },
  row: { flexDirection: "row" },
  border_dark: { borderWidth: 1, borderColor: "#d8d8d8" },
  border_red: { borderWidth: 1, borderColor: "#ff0000" },
  light_shadow: {
    shadowColor: "#acacac",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  light_shadow_dispared: {
    shadowColor: "#acacac",
    shadowOffset: {
      width: 15,
      height: 15
    },
    shadowRadius: 10,
    shadowOpacity: 1.0
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  centerview: {
    alignItems: "center",
    justifyContent: "center"
  },
  spinnerWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
