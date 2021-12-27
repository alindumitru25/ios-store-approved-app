import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { GLOBAL_URL } from "./../../utils/Globals";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import common from "./../../styles/CommonStyles";
import ImagePicker from "react-native-image-picker";
import {
  saveAvatar,
  requestDocumentsByUserPage,
  followUser,
  unFollowUser,
  clearDocumentsByUserPage,
  messageUser,
  toggleLocationChooserModal
} from "./../../actions/AppActions";
import Posts from "./../trendingWall/Posts";
import KickStarter from "./../kickStarter/KickStarter";
import { isEmpty, sortBy, size, find } from "lodash";
import uuidv4 from "uuid/v4";

import styles from "./styles";
import { locale } from "./../../language/locale";

const SKIP = 10;

type Props = ClassProps & StoreProps & DispatchProps;

interface ClassProps {
  userId?: number;
  navigation: any;
}

interface StoreProps {
  user: any;
  documents: any;
  userId: number;
  currentUserId: number;
  followers: any;
  loading: boolean;
  language: string;
}

interface DispatchProps {
  dispatch: any;
  messageUser: (userId: number) => void;
  toggleLocationChooserModal: (show: boolean) => void;
}

interface State {
  showSettingsDropdown: boolean;
  refreshing: boolean;
  skip: number;
  loadingMore: boolean;
}

class UserProfile extends React.Component<Props, State> {
  private pageId: string;

  constructor(props: Props) {
    super(props);
    this.pickImage = this.pickImage.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unFollowUser = this.unFollowUser.bind(this);
    this.messageUser = this.messageUser.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.state = {
      showSettingsDropdown: false,
      refreshing: false,
      skip: 0,
      loadingMore: false
    };
  }

  componentWillMount() {
    this.pageId = uuidv4();
    this.props.dispatch(
      requestDocumentsByUserPage(
        this.props.userId,
        this.state.skip,
        this.pageId
      )
    );
  }

  componentWillUnmount() {
    this.props.dispatch(clearDocumentsByUserPage(this.pageId));
  }

  pickImage() {
    ImagePicker.launchImageLibrary({}, (response: any) => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        alert(locale[this.props.language]["camera.general.error"]);
        return;
      }

      const photo = {
        name: response.name,
        path: response.uri
      };

      this.props.dispatch(saveAvatar(photo));
    });
  }

  followUser() {
    this.props.dispatch(followUser(this.props.userId, this.pageId));
  }

  unFollowUser() {
    this.props.dispatch(unFollowUser(this.props.userId, this.pageId));
  }

  messageUser() {
    this.props.messageUser(this.props.userId);
  }

  handleLoadingMore() {
    this.setState(
      prevState => ({
        skip: prevState.skip + SKIP,
        loadingMore: true
      }),
      () => {
        this.props.dispatch(
          requestDocumentsByUserPage(
            this.props.userId,
            this.state.skip,
            this.pageId,
            () => {
              this.setState({
                loadingMore: false
              });
            }
          )
        );
      }
    );
  }

  onRefresh() {
    this.setState({
      refreshing: true
    });

    Promise.all([
      this.props.dispatch(
        requestDocumentsByUserPage(
          this.props.user.id,
          this.state.skip,
          this.pageId
        )
      )
    ]).then(() => {
      this.setState({
        refreshing: false
      });
    });
  }

  renderSettingsDropdown() {
    if (this.state.showSettingsDropdown) {
      return (
        <View style={styles.settingsDropdown}>
          <TouchableOpacity
            onPress={() => this.props.toggleLocationChooserModal(true)}
          >
            <Text style={styles.dropdownText}>
              {locale[this.props.language]["set.location"]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pickImage}>
            <Text style={styles.dropdownText}>
              {locale[this.props.language]["change.profile.photo"]}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderEmptyOwnPosts() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={[common.user_profile_posts_empty]}>
          <Ionicons name="ios-information-circle-outline" size={29} />
          <Text
            style={{
              fontFamily: "Raleway",
              color: "black",
              fontWeight: "400",
              fontSize: 21,
              marginTop: 8
            }}
          >
            {locale[this.props.language]["own.no.posts"]}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              textAlign: "center",
              marginTop: 6
            }}
          >
            {locale[this.props.language]["own.share.help"]}
          </Text>
        </View>
      </View>
    );
  }

  renderEmptyPosts() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={[common.user_profile_posts_empty]}>
          <Ionicons name="ios-information-circle-outline" size={29} />
          <Text
            style={{
              fontFamily: "Raleway",
              color: "black",
              fontWeight: "400",
              fontSize: 21,
              textAlign: "center",
              marginTop: 8
            }}
          >
            {locale[this.props.language]["no.product.shared"]}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              textAlign: "center",
              marginTop: 6
            }}
          >
            {locale[this.props.language]["send.message.help"]}
          </Text>
        </View>
      </View>
    );
  }

  renderMoreButton() {
    if (this.state.loadingMore) {
      return (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 25
          }}
        >
          <ActivityIndicator color="white" />
        </View>
      );
    }

    if (!this.props.documents) {
      return null;
    }
    const userDocuments = this.props.documents[this.pageId];

    if (!userDocuments) {
      return null;
    }

    if (this.state.skip + SKIP === size(userDocuments)) {
      return (
        <View
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 25,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.handleLoadingMore();
            }}
            style={styles.loadMoreButton}
          >
            <Text style={styles.loadMoreText}>
              {locale[this.props.language]["more.button.text"]}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderPosts() {
    if (
      !this.props.documents ||
      !this.props.userId ||
      !this.props.documents[this.pageId]
    ) {
      return null;
    }

    if (isEmpty(this.props.documents[this.pageId])) {
      if (this.props.userId === this.props.currentUserId) {
        return this.renderEmptyOwnPosts();
      } else {
        return this.renderEmptyPosts();
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <Posts
          documents={sortBy(
            this.props.documents[this.pageId],
            document => document.position
          )}
          pageId={this.pageId}
          forUserId={this.props.user.id}
        />
      </View>
    );
  }

  renderDetails() {
    if (this.props.userId !== this.props.currentUserId) {
      return (
        <View style={common.user_profile_details}>
          <View style={common.user_profile_image_wrapper}>
            <Image
              source={{
                uri: `${GLOBAL_URL}/user/avatar/${this.props.user.id}`
              }}
              style={common.user_profile_image}
            />
          </View>
          <View style={common.user_profile_details_wrapper}>
            <Text numberOfLines={1} style={common.user_profile_name}>{`${
              this.props.user.firstName
            } ${this.props.user.lastName}`}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
                backgroundColor: "transparent"
              }}
            >
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {!this.props.followers[this.props.userId] ? (
                    <TouchableOpacity
                      onPress={this.followUser}
                      style={common.user_profile_action_button}
                    >
                      <Text
                        style={{
                          fontFamily: "Raleway",
                          color: "white",
                          fontSize: 18,
                          fontWeight: "400"
                        }}
                      >
                        {locale[this.props.language]["follow"]}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={this.unFollowUser}
                      style={[
                        common.user_profile_action_button,
                        { maxWidth: 130 }
                      ]}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <AwesomeIcon name="check" size={14} color="white" />
                        <Text
                          style={{
                            fontFamily: "Raleway",
                            color: "white",
                            fontSize: 18,
                            fontWeight: "400",
                            marginLeft: 8
                          }}
                        >
                          {locale[this.props.language]["following"]}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={this.messageUser}
                    style={[
                      common.user_profile_action_button,
                      { marginLeft: 8 }
                    ]}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <AwesomeIcon name="comment-o" size={14} color="white" />
                      <Text
                        style={{
                          fontFamily: "Raleway",
                          color: "white",
                          fontSize: 18,
                          fontWeight: "400",
                          marginLeft: 8
                        }}
                      >
                        {locale[this.props.language]["send.message"]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center"
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name="user" size={16} color="white" />
                    <Text
                      style={{
                        fontSize: 19,
                        color: "white",
                        fontWeight: "400",
                        marginLeft: 5
                      }}
                    >{`${this.props.user.followersCount || 0} ${
                      locale[this.props.language]["people.following"]
                    }`}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={common.user_profile_details}>
          <View style={common.user_profile_image_wrapper}>
            <Image
              source={{
                uri: `${GLOBAL_URL}/user/avatar/${this.props.user.id}`
              }}
              style={common.user_profile_image}
            />
          </View>
          <View style={styles.settingsButtonWrapper}>
            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => {
                this.setState({
                  showSettingsDropdown: true
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Icon name="user" size={16} color="white" />
                <Text style={styles.buttonText}>
                  {locale[this.props.language]["profile.settings"]}
                </Text>
              </View>
            </TouchableOpacity>
            {this.renderSettingsDropdown()}
          </View>
          <View style={common.user_profile_details_wrapper}>
            <Text numberOfLines={1} style={common.user_profile_name}>{`${
              this.props.user.firstName
            } ${this.props.user.lastName}`}</Text>
            <View
              style={{
                alignItems: "center",
                marginTop: 5,
                backgroundColor: "transparent"
              }}
            >
              <View style={styles.shareButtonWrapper}>
                <KickStarter />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center"
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name="user" size={16} color="white" />
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                      fontWeight: "400",
                      marginLeft: 5
                    }}
                  >{`${this.props.user.followersCount || 0} ${
                    locale[this.props.language][
                      "number.of.people.following.you"
                    ]
                  }`}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  renderAvatar() {
    if (!this.props.user) {
      return null;
    }

    return (
      <View style={common.user_profile_image_wrapper}>
        <Image
          source={{ uri: `${GLOBAL_URL}/user/avatar/${this.props.user.id}` }}
          style={common.user_profile_image}
        />
      </View>
    );
  }

  render() {
    if (!this.props.user) {
      return (
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <ActivityIndicator color="white" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
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
            {!this.state.refreshing && this.props.loading ? (
              <View
                style={{ width: "100%", alignItems: "center", marginTop: 10 }}
              >
                <ActivityIndicator color="white" />
              </View>
            ) : (
              undefined
            )}
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  showSettingsDropdown: false
                });
              }}
            >
              <View style={{ flex: 1 }}>
                {this.renderDetails()}
                {this.renderPosts()}
                {this.renderMoreButton()}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch,
    messageUser: (userId: number) => dispatch(messageUser(userId)),
    toggleLocationChooserModal: (show: boolean) =>
      dispatch(toggleLocationChooserModal(show))
  };
}

function getUser(state: any, ownProps: ClassProps) {
  const userId = ownProps.navigation.state.params
    ? ownProps.navigation.state.params.userId
    : null;
  if (userId) {
    // get user from users based on received id
    return find(
      state.applicationData.usersByUserPage,
      user => user.id === userId
    );
  }

  return (
    state.applicationData.initialData &&
    state.applicationData.initialData.currentUser
  );
}

function mapStateToProps(state: any, ownProps: ClassProps) {
  const userId = ownProps.navigation.state.params
    ? ownProps.navigation.state.params.userId
    : null;
  return {
    user: getUser(state, ownProps),
    documents:
      state.applicationData && state.applicationData.documentsByUserPage
        ? state.applicationData.documentsByUserPage
        : null,
    userId: userId
      ? userId
      : state.applicationData ? state.applicationData.userId : null,
    currentUserId: state.applicationData ? state.applicationData.userId : null,
    followers: state.applicationData.initialData
      ? state.applicationData.initialData.followers
      : null,
    loading: state.applicationData
      ? state.applicationData.loadingUserDocuments
      : false,
    language: state.app.language
  };
}

export default connect<StoreProps, DispatchProps, ClassProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
