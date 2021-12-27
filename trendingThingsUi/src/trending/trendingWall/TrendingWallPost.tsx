import * as React from "react";
import common from "./../../styles/CommonStyles";
import moment from "moment";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions
} from "react-native";
import FastImage from "react-native-fast-image";
import ScaledCachedImage from "./../../components/image/ScaledCachedImage";
import { GLOBAL_URL } from "./../../utils/Globals";
import AutoHeightImage from "react-native-auto-height-image";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {
  likeDocument,
  dislikeDocument,
  registerInteraction,
  openReactionPanel
} from "./../../actions/AppActions";
import styles from "./styles";
import { onUserPress, onPostPress } from "./../../actions/TrendingNavActions";
import {
  markEditorChoice,
  unmarkEditorChoice
} from "./../../actions/AdminActions";
import { getReactionsCount } from "./../post/postSelectors";
import { locale } from "./../../language/locale";

const width = Dimensions.get("window").width; //full width

interface ClassProps {
  document: any;
  linedStyle?: boolean;
  navigation?: any;
  pageId?: any;
  forUserId?: number;
}

interface DispatchProps {
  dispatch: any;
  openReactionPanel: (documentId: number) => void;
  markEditorChoice: (documentId: number) => void;
  unmarkEditorChoice: (documentId: number) => void;
  onUserPress: (userId: number) => void;
  onPostPress: (documentId: number, user: any) => void;
}

interface StoreProps {
  userId: any;
  currentUser: any;
  language: string;
}

type Props = ClassProps & DispatchProps & StoreProps;

class TrendingWallPost extends React.Component<Props, {}> {
  private isLiked: boolean = false;

  constructor(props: Props) {
    super(props);
    this.onLikeAction = this.onLikeAction.bind(this);
    this.onUserPress = this.onUserPress.bind(this);
    this.onPostPress = this.onPostPress.bind(this);
  }

  componentWillMount() {
    // calculate if document is liked
    this.isDocumentLiked(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    // recalculate if document is liked
    this.isDocumentLiked(nextProps);
  }

  isDocumentLiked(props: Props) {
    const { document, userId } = props;
    if (document.likeUsers && document.likeUsers[userId]) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
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

  onLikeAction() {
    const { document, pageId } = this.props;
    if (this.isLiked) {
      // dislike post if is already liked
      this.props.dispatch(dislikeDocument(document.id, pageId));
    } else {
      this.props.dispatch(likeDocument(document.id, pageId));
    }
  }

  onUserPress() {
    if (
      !this.props.forUserId ||
      this.props.forUserId !== this.props.document.user.id
    ) {
      this.props.onUserPress(this.props.document.user.id);
    }
  }

  onPostPress() {
    const { id } = this.props.document;
    if (this.props.userId !== this.props.document.userId) {
      this.props.dispatch(registerInteraction(id));
    }
    this.props.onPostPress(id, this.props.document.user);
  }

  renderAdminControls() {
    if (this.props.currentUser && this.props.currentUser.isAdmin) {
      const isCurrentlyEditorChoice = !!this.props.document.editorChoiceDate;
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            width: "100%"
          }}
        >
          <TouchableOpacity
            onPress={() =>
              isCurrentlyEditorChoice
                ? this.props.unmarkEditorChoice(this.props.document.id)
                : this.props.markEditorChoice(this.props.document.id)
            }
          >
            <View
              style={{
                borderWidth: 1,
                borderRadius: 3,
                padding: 3,
                paddingLeft: 7,
                paddingRight: 7
              }}
            >
              <Text>
                {isCurrentlyEditorChoice
                  ? "Unmark editor choice"
                  : "Mark editor choice (2 days)"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderComments() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPostPress();
        }}
      >
        <View
          style={{
            marginRight: 8,
            marginLeft: 3,
            flexDirection: "row"
          }}
        >
          <AwesomeIcon
            name="comment-o"
            size={16}
            color="#464646"
            style={{ marginTop: -1 }}
          />
          <Text style={{ fontSize: 15, marginLeft: 5 }}>{`${this.props.document
            .commentsCount || 0}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderReact() {
    const reacted = this.hasReacted(this.props.document) ? true : false;
    const color = reacted ? "#15b3ee" : "#464646";

    return (
      <TouchableOpacity
        onPress={() => {
          this.onPostPress();
          this.props.openReactionPanel(this.props.document.id);
        }}
        style={{ paddingLeft: 3 }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              marginRight: 8,
              alignItems: "center"
            }}
          >
            <Feather name="tag" size={17} color={color} />
            <Text
              style={{ fontSize: 15, color, marginLeft: 4 }}
            >{`${getReactionsCount(this.props.document) || 0}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderLikes() {
    const { document } = this.props;
    const color = this.isLiked ? "#15b3ee" : "#464646";

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={this.onLikeAction}
          style={[common.post_action_button, { paddingRight: 0 }]}
        >
          <EvilIcons name="like" size={27} color={color} />
        </TouchableOpacity>
        <Text
          style={{ fontSize: 15, marginRight: 6, color }}
        >{`${document.likeCount || 0}`}</Text>
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

  render() {
    const { document } = this.props;
    const { user } = document;

    return (
      <View style={styles.shadow}>
        <View style={common.post_wrapper}>
          <View style={common.post_content}>
            {this.renderChoise()}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity onPress={this.onUserPress} style={{ flex: 1 }}>
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
              <View style={common.post_button_wrapper}>
                <Text
                  style={{ fontSize: 14, color: "white", fontWeight: "600" }}
                >
                  {document.price
                    ? `${document.price} RON`
                    : locale[this.props.language]["no.price.yet"]}
                </Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={common.post_description}>
                {document.description}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 10,
                paddingTop: 10,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  overflow: "hidden",
                  alignItems: "center",
                  paddingRight: 20
                }}
              >
                <EvilIcons
                  name="location"
                  size={26}
                  color="black"
                  style={{
                    marginRight: 0,
                    width: 26
                  }}
                />
                <Text numberOfLines={1} style={styles.address}>
                  {document.locationDescription +
                    ", " +
                    document.formattedAddress}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginLeft: 5
                }}
              >
                {this.renderLikes()}
                {this.renderReact()}
                {this.renderComments()}
              </View>
            </View>
            {this.renderAdminControls()}
          </View>
          <TouchableHighlight
            underlayColor="transparent"
            style={{ flex: 1 }}
            onPress={this.onPostPress}
          >
            <View>
              <ScaledCachedImage
                source={{
                  uri: `${GLOBAL_URL}/document/image/${document.imageId}`,
                  priority: FastImage.priority.high
                }}
                width={width - 6}
                defaultHeight={400}
                style={common.post_image}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    openReactionPanel: (documentId: number) =>
      dispatch(openReactionPanel(documentId)),
    markEditorChoice: (documentId: number) =>
      dispatch(markEditorChoice(documentId)),
    unmarkEditorChoice: (documentId: number) =>
      dispatch(unmarkEditorChoice(documentId)),
    onUserPress: (userId: number) => dispatch(onUserPress(userId)),
    onPostPress: (documentId: number, user: any) =>
      dispatch(onPostPress(documentId))
  };
};

const mapStateToProps = (state: any) => {
  const userId = state.applicationData ? state.applicationData.userId : null;

  return {
    userId,
    currentUser:
      state.applicationData.initialData &&
      state.applicationData.initialData.currentUser,
    language: state.app.language
  };
};

export default connect<StoreProps, DispatchProps, ClassProps>(
  mapStateToProps,
  mapDispatchToProps
)(TrendingWallPost);
