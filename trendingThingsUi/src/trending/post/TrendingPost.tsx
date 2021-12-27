import * as React from "react";
import common from "./../../styles/CommonStyles";
import moment from "moment";
import Spinner from "react-native-spinkit";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { GLOBAL_URL } from "./../../utils/Globals";
import { openMap } from "./../../utils/Utils";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FastImage from "react-native-fast-image";
import ScaledCachedImage from "./../../components/image/ScaledCachedImage";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

import {
  likeDocument,
  dislikeDocument,
  requestDocument,
  openReactionPanel,
  showCommentBarOnPost,
  hideCommentBarOnPost,
  setPostComment,
  clearPostComment,
  sendComment,
  sendReply,
  sendReview,
  fetchComments,
  fetchReviews,
  subscribeToCommentsUpdates,
  unsubscribeToCommentsUpdates,
  subscribeToRepliesUpdates,
  unsubscribeToRepliesUpdates,
  clearComments,
  setActiveTab,
  clearOnReply,
  clearCommentsData,
  clearReviews
} from "./../../actions/AppActions";
import { onUserPress, onEditPost } from "./../../actions/TrendingNavActions";
import { getReactionsCount } from "./postSelectors";
import Tabs from "./../../components/tabs/Tabs";
import PostComments from "./PostComments";
import PostReviews from "./PostReviews";
import CommentBox from "./CommentBox";
import ReviewBox from "./ReviewBox";
import AutoHeightImage from "react-native-auto-height-image";
import styles from "./styles";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { includes, size } from "lodash";
import { locale } from "./../../language/locale";

const DEBOUNCE_SET_TEXT = 300;
const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

type Props = ClassProps & DispatchProps & StoreProps;

interface ClassProps {
  navigation: any;
}

interface DispatchProps {
  requestDocument: (documentId: number) => void;
  likeDocument: (documentId: number) => void;
  dislikeDocument: (documentId: number) => void;
  openReactionPanel: (documentId: number) => void;
  showCommentBarOnPost: (documentId: number) => void;
  hideCommentBarOnPost: (documentId: number) => void;
  setPostComment: (documentId: number, text: string) => void;
  clearPostComment: (documentId: number) => void;
  sendComment: (
    documentId: number,
    comment: string,
    onComplete: () => void
  ) => void;
  sendReply: (
    documentId: number,
    commentId: number,
    userId: number,
    comment: string,
    replyToReplyId: number,
    onComplete: () => void
  ) => void;
  fetchComments: (documentId: number) => void;
  subscribeToCommentsUpdates: (documentId: number) => void;
  unsubscribeToCommentsUpdates: (documentId: number) => void;
  subscribeToRepliesUpdates: (documentId: number) => void;
  unsubscribeToRepliesUpdates: (documentId: number) => void;
  clearComments: (documentId: number) => void;
  setActiveTab: (tabIndex: number) => void;
  clearOnReply: () => void;
  clearCommentsData: () => void;
  fetchReviews: (documentId: number) => void;
  sendReview: (
    documentId: number,
    review: string,
    rating: number,
    onComplete: () => void
  ) => void;
  clearReviews: () => void;
  onUserPress: (userId: number) => void;
  onEditPost: (documentId: number) => void;
}

interface StoreProps {
  userId: number;
  document: any;
  documentId: number;
  replyTo: number;
  replyToCommentId: number;
  replyToReplyId: number;
  commentsCount: number;
  activeTab: number;
  isOwnPost: boolean;
  language: string;
}

interface State {
  keyboardShowed: boolean;
  commentInputHeight: number;
  refreshing: boolean;
  keyboardHeight: number;
}

let COMMENT_SECTION_TABS: any = [
  {
    name: "Comentarii/Reviews",
    translation: "comments.review.title",
    index: 0
  }
];

class TrendingPost extends React.Component<Props, State> {
  private isLiked: boolean = false;
  private scrollView: any;
  private lastPosition: any;
  private commentContainerRef: any;
  private viewHeight: number;
  private postRef: any;
  private keyboardDidShowListener: any;
  private keyboardDidHideListener: any;
  private lastKeyboardHeight: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      keyboardShowed: false,
      commentInputHeight: 40,
      refreshing: false,
      keyboardHeight: 0
    };

    this.onLikeAction = this.onLikeAction.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.sendReview = this.sendReview.bind(this);
    this.showCommentBar = this.showCommentBar.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToPost = this.scrollToPost.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.getScrollHeight = this.getScrollHeight.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
  }

  componentWillMount() {
    // request an updated document
    this.props.requestDocument(this.props.documentId);
    this.props.fetchComments(this.props.documentId);
    this.props.fetchReviews(this.props.documentId);
    this.props.subscribeToCommentsUpdates(this.props.documentId);
    this.props.subscribeToRepliesUpdates(this.props.documentId);
    Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
    this.isDocumentLiked(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    // recalculate if document is liked
    this.isDocumentLiked(nextProps);
  }

  componentWillUnmount() {
    this.props.clearPostComment(this.props.documentId);
    this.props.hideCommentBarOnPost(this.props.documentId);
    this.props.unsubscribeToCommentsUpdates(this.props.documentId);
    this.props.unsubscribeToRepliesUpdates(this.props.documentId);
    this.props.clearOnReply();
    this.props.clearCommentsData();
    Keyboard.removeListener("keyboardDidShow", this.keyboardDidShow);
    Keyboard.removeListener("keyboardDidHide", this.keyboardDidHide);
  }

  keyboardDidShow(e: any) {
    this.lastKeyboardHeight = e.endCoordinates.height;
    this.scrollView.scrollTo({
      y: this.lastPosition + this.lastKeyboardHeight - 49
    });
  }

  keyboardDidHide() {
    if (this.scrollView) {
      this.scrollView.scrollTo({
        y: this.lastPosition
      });
    }
  }

  isDocumentLiked(props: Props) {
    if (props.document) {
      const { document, userId } = props;
      if (document.likeUsers && document.likeUsers[userId]) {
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }
    }
  }

  hasReacted(document: any) {
    return (
      (this.props.document.qualityFeedbackUsers &&
        this.props.document.qualityFeedbackUsers[this.props.userId]) ||
      (this.props.document.goodPriceFeedbackUsers &&
        this.props.document.goodPriceFeedbackUsers[this.props.userId]) ||
      (this.props.document.goodQualityPriceRatioFeedbackUsers &&
        this.props.document.goodQualityPriceRatioFeedbackUsers[
          this.props.userId
        ]) ||
      (this.props.document.worthItFeedbackUsers &&
        this.props.document.worthItFeedbackUsers[this.props.userId]) ||
      (this.props.document.expensiveFeedbackUsers &&
        this.props.document.expensiveFeedbackUsers[this.props.userId]) ||
      (this.props.document.badQualityFeedbackUsers &&
        this.props.document.badQualityFeedbackUsers[this.props.userId])
    );
  }

  hasAnyoneReacted() {
    return (
      this.props.document.qualityFeedback ||
      this.props.document.goodPriceFeedback ||
      this.props.document.goodQualityPriceRatioFeedback ||
      this.props.document.worthItFeedback ||
      this.props.document.expensiveFeedback ||
      this.props.document.badQualityFeedback
    );
  }

  onLikeAction() {
    const { document, userId } = this.props;
    if (this.isLiked) {
      // dislike post if is already liked
      this.props.dislikeDocument(document.id);
    } else {
      this.props.likeDocument(document.id);
    }
  }

  getScrollHeight() {
    return height - 150 - (this.lastKeyboardHeight || 0);
  }

  sendComment(comment: string) {
    if (!comment) {
      return;
    }

    if (this.props.replyToCommentId != null) {
      this.props.sendReply(
        this.props.document.id,
        this.props.replyToCommentId,
        this.props.replyTo,
        comment,
        this.props.replyToReplyId,
        () => {
          this.props.clearOnReply();
        }
      );
    } else {
      this.props.sendComment(this.props.document.id, comment, () => {
        this.props.clearOnReply();
        this.scrollToEnd();
      });
    }
  }

  sendReview(review: string, rating: number) {
    if (!review && !rating) {
      return;
    }

    this.props.sendReview(this.props.document.id, review, rating, () => {
      this.scrollToEnd();
    });
  }

  showCommentBar() {
    this.props.showCommentBarOnPost(this.props.document.id);
    this.scrollToEnd();
  }

  scrollToPost(posY: number, height: number) {
    this.commentContainerRef.measure((x: number, y: number) => {
      this.postRef.measure((px: number, py: number) => {
        this.props.showCommentBarOnPost(this.props.document.id);
        setTimeout(() => {
          this.scrollView.scrollTo({
            y: posY + height + y - this.viewHeight + py + 40 // 40 stands for app bar
          });
        }, 100);
      });
    });
  }

  scrollToEnd() {
    setTimeout(() => {
      this.scrollView.scrollToEnd();
    }, 500);
  }

  handleScroll(event: any) {
    this.lastPosition = event.nativeEvent.contentOffset.y;
  }

  updateSize(height: number) {
    this.setState({ commentInputHeight: height });
  }

  onRefresh() {
    this.setState({
      refreshing: true
    });

    Promise.all([
      this.props.requestDocument(this.props.documentId),
      this.props.fetchComments(this.props.documentId),
      this.props.fetchReviews(this.props.documentId)
    ]).then(() => {
      this.setState({
        refreshing: false
      });
    });
  }

  renderCommentBox() {
    if (!this.props.activeTab) {
      return (
        <CommentBox
          documentId={this.props.documentId}
          keyboardShowed={this.state.keyboardShowed}
          keyboardHidden={() => {}}
          keyboardWasShown={() => {}}
          sendComment={this.sendComment}
        />
      );
    }

    return (
      <ReviewBox
        documentId={this.props.documentId}
        keyboardShowed={this.state.keyboardShowed}
        keyboardHidden={() => {}}
        keyboardWasShown={() => {}}
        sendReview={this.sendReview}
      />
    );
  }

  renderReviewsAndCommentsSection() {
    COMMENT_SECTION_TABS[0].count = this.props.commentsCount;
    return (
      <View
        style={{
          width: "100%"
        }}
        ref={(ref: any) => (this.commentContainerRef = ref)}
      >
        <Tabs tabs={COMMENT_SECTION_TABS}>
          <PostComments
            scrollToPost={this.scrollToPost}
            document={this.props.document}
            showCommentBar={this.showCommentBar}
          />
        </Tabs>
      </View>
    );
  }

  renderActionButtons() {
    const reacted = this.hasReacted(this.props.document) ? true : false;
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={this.onLikeAction}
          style={[common.post_action_button, { paddingLeft: 0, marginLeft: 3 }]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <EvilIcons
              name="like"
              size={27}
              color={this.isLiked ? "#15b3ee" : "#464646"}
            />
            <Text
              style={{
                fontSize: 15,
                color: this.isLiked ? "#15b3ee" : "black"
              }}
            >
              {locale[this.props.language]["like.action.text"]}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.openReactionPanel(this.props.document.id)}
          style={common.post_action_button}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              name="tag"
              size={17}
              color={reacted ? "#15b3ee" : "#464646"}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 3,
                color: reacted ? "#15b3ee" : "black"
              }}
            >
              {locale[this.props.language]["react.action.text"]}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.setActiveTab(COMMENT_SECTION_TABS[0].index);
            this.showCommentBar();
            this.props.clearOnReply();
          }}
          style={common.post_action_button}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AwesomeIcon
              name="comment-o"
              size={16}
              color="#464646"
              style={{ marginTop: -1 }}
            />
            <Text style={{ fontSize: 15, marginLeft: 4, marginTop: 1 }}>
              {locale[this.props.language]["comment.text"]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderReactCount() {
    return (
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {}}>
        <Text style={{ fontSize: 14, color: "black" }}>{`${getReactionsCount(
          this.props.document
        ) || 0} ${locale[this.props.language]["reactions"]}`}</Text>
      </TouchableOpacity>
    );
  }

  renderLikesCount() {
    const { document } = this.props;

    return (
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {}}>
        <Text style={{ fontSize: 14, color: "black" }}>{`${document.likeCount ||
          0} ${locale[this.props.language]["likes"]}`}</Text>
      </TouchableOpacity>
    );
  }

  renderCommentsCount() {
    return (
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {}}>
        <Text style={{ fontSize: 14, color: "black" }}>{`${this.props
          .commentsCount || 0} ${
          locale[this.props.language]["comments.review.text"]
        }`}</Text>
      </TouchableOpacity>
    );
  }

  renderBadQualityReaction() {
    if (!this.props.document.badQualityFeedback) {
      return null;
    }

    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
      >
        <Text style={common.reactionTagText}>{`${
          locale[this.props.language]["bad.quality.react"]
        } (${this.props.document.badQualityFeedback})`}</Text>
      </View>
    );
  }

  renderExpensiveReaction() {
    if (!this.props.document.expensiveFeedback) {
      return null;
    }

    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
      >
        <Text style={common.reactionTagText}>{`${
          locale[this.props.language]["expensive.react"]
        } (${this.props.document.expensiveFeedback})`}</Text>
      </View>
    );
  }

  renderWorthItReaction() {
    if (!this.props.document.worthItFeedback) {
      return null;
    }

    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
      >
        <Text style={common.reactionTagText}>{`${
          locale[this.props.language]["worth.it.react"]
        } (${this.props.document.worthItFeedback})`}</Text>
      </View>
    );
  }

  renderGoodQualityPriceRatio() {
    if (!this.props.document.goodQualityPriceRatioFeedback) {
      return null;
    }

    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
      >
        <Text style={common.reactionTagText}>{`${
          locale[this.props.language]["good.quality.price.ratio.react"]
        } (${this.props.document.goodQualityPriceRatioFeedback})`}</Text>
      </View>
    );
  }

  renderGoodPriceReaction() {
    if (!this.props.document.goodPriceFeedback) {
      return null;
    }

    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
      >
        <Text style={common.reactionTagText}>{`${
          locale[this.props.language]["good.price.react"]
        } (${this.props.document.goodPriceFeedback})`}</Text>
      </View>
    );
  }

  renderQualityReaction() {
    if (!this.props.document.qualityFeedback) {
      return null;
    }

    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
      >
        <Text style={common.reactionTagText}>{`${
          locale[this.props.language]["quality.react"]
        } (${this.props.document.qualityFeedback})`}</Text>
      </View>
    );
  }

  renderTagsAndReactions() {
    return (
      <View
        style={[
          {
            marginTop: 8,
            padding: 10,
            overflow: "hidden",
            flexDirection: "column",
            flexWrap: "wrap",
            width: "100%"
          }
        ]}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                padding: 1,
                paddingLeft: 8,
                paddingRight: 8,
                backgroundColor: "black",
                borderRadius: 17,
                marginRight: 8
              }}
            >
              <Ionicons name="ios-more-outline" color="white" size={23} />
            </View>
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 16,
                color: "black",
                fontWeight: "300"
              }}
            >
              {locale[this.props.language]["tags.intentions.text"]}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 5,
              width: "100%",
              height: 0.5,
              backgroundColor: "#dbdbdb"
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 5,
            marginBottom: 5,
            flexWrap: "wrap"
          }}
        >
          {this.props.document.tagNames &&
            this.props.document.tagNames.map((tag: any) => {
              return (
                <Text
                  key={tag}
                  style={{
                    fontSize: 15,
                    color: "black",
                    marginRight: 8,
                    fontWeight: "600"
                  }}
                >
                  {tag}
                </Text>
              );
            })}
        </View>
        {this.hasAnyoneReacted() ? (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginTop: 5,
              flexWrap: "wrap",
              marginBottom: 5
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    padding: 1,
                    paddingLeft: 8,
                    paddingRight: 8,
                    backgroundColor: "black",
                    borderRadius: 17,
                    marginRight: 8
                  }}
                >
                  <Ionicons name="ios-more-outline" color="white" size={23} />
                </View>
                <Text
                  style={{
                    fontFamily: "Helvetica Neue",
                    fontSize: 16,
                    color: "black",
                    fontWeight: "300"
                  }}
                >
                  {locale[this.props.language]["reactions.text"]}
                </Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                  width: "100%",
                  height: 0.5,
                  backgroundColor: "#dbdbdb"
                }}
              />
            </View>
            {this.renderWorthItReaction()}
            {this.renderQualityReaction()}
            {this.renderGoodPriceReaction()}
            {this.renderGoodQualityPriceRatio()}
            {this.renderExpensiveReaction()}
            {this.renderBadQualityReaction()}
          </View>
        ) : null}
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.postHeader}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Ionicons name="ios-pin-outline" size={48} color="white" />
        </View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "Raleway",
              fontSize: 21,
              color: "white",
              fontWeight: "600"
            }}
          >
            {this.props.document.locationDescription +
              ", " +
              this.props.document.formattedAddress}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <TouchableOpacity
            onPress={() =>
              openMap(
                this.props.document.locationDescription,
                this.props.document.position[0],
                this.props.document.position[1]
              )
            }
          >
            <View style={styles.headerButton}>
              <Text style={styles.headerButtonText}>
                {locale[this.props.language]["navigate"]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderChoise() {
    if (
      this.props.document.editorChoiceDate &&
      moment(this.props.document.editorChoiceDate) >
        moment(Date.now()).subtract(2, "days")
    ) {
      return (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-start",
            paddingBottom: 8,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#dbdbdb"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("./../../../images/popular-icon.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain"
              }}
            />
            <Text style={{ marginLeft: 6, fontSize: 16, fontWeight: "200" }}>
              {locale[this.props.language]["popular.product"]}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderEditPostTooltip() {
    if (this.props.isOwnPost) {
      return (
        <TouchableOpacity
          onPress={() => this.props.onEditPost(this.props.document.id)}
          style={styles.editPostTooltip}
        >
          <View style={{ position: "relative", flexDirection: "row" }}>
            <Ionicons name="md-create" color="white" size={16} />
            <Text style={styles.editPostTooltipText}>
              {locale[this.props.language]["edit.post"]}
            </Text>
            <View style={styles.arrowDown} />
          </View>
        </TouchableOpacity>
      );
    }
  }

  renderPost() {
    const { document } = this.props;
    const { user } = document;

    return (
      <View
        style={{ position: "relative" }}
        ref={(elem: any) => (this.postRef = elem)}
      >
        <View style={common.post_wrapper}>
          <View style={common.post_content}>
            {this.renderChoise()}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.onUserPress(user.id)}
                style={{ flex: 1 }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center"
                  }}
                >
                  <View style={common.post_avatar_wrapper}>
                    <FastImage
                      source={{
                        uri: `${GLOBAL_URL}/user/avatar/${user.id}`,
                        priority: FastImage.priority.normal
                      }}
                      style={common.post_avatar}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={common.post_user}>{`${user.firstName} ${
                      user.lastName
                    }`}</Text>
                    <Text>
                      {locale[this.props.language]["found.product.text"]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={[common.post_button_wrapper]}>
                <Text
                  style={{ fontSize: 14, color: "white", fontWeight: "600" }}
                >
                  {document.price
                    ? `${document.price} RON`
                    : locale[this.props.language]["no.price.yet"]}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[common.post_description]}>
                {document.description}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginTop: 15,
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              {this.renderActionButtons()}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: "#f4f4f4",
                    borderRadius: 17,
                    flexDirection: "row",
                    padding: 5,
                    marginTop: 8,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {this.renderLikesCount()}
                  {this.renderCommentsCount()}
                  {this.renderReactCount()}
                </View>
              </View>
            </View>
          </View>
          <ScaledCachedImage
            source={{
              uri: `${GLOBAL_URL}/document/image/${document.imageId}`,
              priority: FastImage.priority.high
            }}
            width={width - 6}
            defaultHeight={400}
            style={common.post_image}
          />
          {this.renderTagsAndReactions()}
          {this.renderReviewsAndCommentsSection()}
        </View>
        {this.renderEditPostTooltip()}
      </View>
    );
  }

  render() {
    if (!this.props.document) {
      return (
        <View style={common.spinnerWrapper}>
          <Spinner isVisible size={30} type="Arc" color="white" />
        </View>
      );
    }

    return (
      <KeyboardAvoidingView
        style={styles.postWrapper}
        behavior="padding"
        keyboardVerticalOffset={ifIphoneX(80, 60)}
      >
        <View
          style={{ flex: 1 }}
          onLayout={(event: any) => {
            this.viewHeight = event.nativeEvent.layout.height;
          }}
        >
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            scrollEventThrottle={16}
            onScroll={this.handleScroll}
            refreshControl={
              <RefreshControl
                colors={["white"]}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                tintColor="white"
              />
            }
          >
            <View style={{ flex: 1 }}>
              {this.renderHeader()}
              {this.renderPost()}
            </View>
          </ScrollView>
        </View>
        {this.renderCommentBox()}
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = {
  requestDocument,
  dislikeDocument,
  likeDocument,
  openReactionPanel,
  showCommentBarOnPost,
  hideCommentBarOnPost,
  setPostComment,
  clearPostComment,
  sendComment,
  sendReply,
  sendReview,
  fetchComments,
  fetchReviews,
  subscribeToCommentsUpdates,
  unsubscribeToCommentsUpdates,
  subscribeToRepliesUpdates,
  unsubscribeToRepliesUpdates,
  clearComments,
  setActiveTab,
  clearOnReply,
  clearCommentsData,
  onUserPress,
  onEditPost
};

const mapStateToProps = (state: any, ownProps: ClassProps) => {
  const documentId: any = ownProps.navigation.state.params.documentId;
  const document =
    state.applicationData && state.applicationData.documents
      ? state.applicationData.documents[documentId]
        ? state.applicationData.documents[documentId]
        : null
      : state.applicationData && state.applicationData.updatedDocuments
        ? state.applicationData.updatedDocuments[documentId]
          ? state.applicationData.updatedDocuments[documentId]
          : null
        : null;
  const userId = state.applicationData ? state.applicationData.userId : null;

  return {
    userId,
    // search through trending documents first then through updated documents
    document,
    documentId,
    replyTo: state.app.replyTo,
    replyToCommentId: state.app.replyToCommentId,
    replyToReplyId: state.app.replyToReplyId,
    commentsCount: state.applicationData.comments
      ? size(state.applicationData.comments) +
        (state.applicationData.replies
          ? size(state.applicationData.replies)
          : 0)
      : null,
    activeTab: state.app.activeTab,
    isOwnPost: document && userId && document.userId === userId,
    language: state.app.language
  };
};

export default connect<StoreProps, DispatchProps, ClassProps>(
  mapStateToProps,
  mapDispatchToProps
)(TrendingPost);
