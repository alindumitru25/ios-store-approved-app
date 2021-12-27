import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  clearSearchResults,
  clearShareModal,
  setLastTab,
  toggleScanCamera
} from "./../../actions/AppActions";
import { setShareModalPhoto } from "./../../actions/ShareModalActions";
import ImageResizer from "react-native-image-resizer";
import ImagePicker from "react-native-image-picker";
import { NavigationActions } from "react-navigation";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { values, reduce, filter, isEmpty } from "lodash";
import { locale } from "./../../language/locale";

const width = Dimensions.get("window").width; //full width

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: width,
    ...ifIphoneX(
      {
        height: 67
      },
      {
        height: 45
      }
    ),
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  trendingButtonsWrapper: {
    alignItems: "flex-start",
    flex: 1,
    paddingRight: 18,
    paddingLeft: 18,
    width: "100%",
    height: "100%",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1"
  },
  trendingButtons: {
    marginTop: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  trendingButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  trendingButtonText: {
    fontFamily: "Helvetica Neue",
    fontWeight: "400",
    color: "black",
    fontSize: 16
  },
  trendingButtonTextActive: {
    color: "#3b9dff"
  },
  icon: {
    backgroundColor: "transparent"
  },
  iconActive: {},
  notificationsUpdateText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "transparent"
  },
  notificationsUpdateSelected: {
    right: -8,
    top: -8
  },
  notificationsUpdate: {
    position: "absolute",
    top: -12,
    right: -12,
    width: 20,
    height: 20,
    borderRadius: 90,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9
  },
  pageTitle: {
    fontSize: 13,
    fontWeight: "300"
  }
});

interface Props {
  dispatch: any;
}

interface StateProps {
  navigation: any;
  showFilter: boolean;
  language: string;
  filter: any;
  barCode: any;
  chats: any;
  notifications: any;
  userId: number;
  trendingListRef: any;
  showTrendingBackButton: boolean;
}

type ClassProps = Props & StateProps;

const fontColor: string = "#515151";

class BottomBar extends React.Component<ClassProps, {}> {
  constructor(props: ClassProps) {
    super(props);

    this.onTrendingWallPress = this.onTrendingWallPress.bind(this);
    this.handleScanPress = this.handleScanPress.bind(this);
    this.onNotificationsPress = this.onNotificationsPress.bind(this);
    this.onMessagesPress = this.onMessagesPress.bind(this);
    this.onSettingsPress = this.onSettingsPress.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }

  pickImage() {
    ImagePicker.showImagePicker({ noData: true }, (response: any) => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        alert(locale[this.props.language]["camera.general.error"]);
        return;
      }

      Image.getSize(
        response.uri,
        (width, height) => {
          const newWidth = width > 1024 ? 1024 : width;
          const newHeight = newWidth * height / width;
          ImageResizer.createResizedImage(
            response.uri,
            newWidth,
            newHeight,
            "JPEG",
            70
          ).then(resizedImage => {
            let photo = {
              name: response.name,
              path: resizedImage.uri
            };

            const action = NavigationActions.navigate({
              routeName: "ShareModal"
            });
            this.props.dispatch(clearSearchResults());
            this.props.dispatch(setShareModalPhoto(photo));
            this.props.navigation.navigate("Share");
            photo = null;
          });
        },
        () => {}
      );
    });
  }

  navigateTrendingListToTop() {
    if (!this.props.showTrendingBackButton) {
      setTimeout(() => {
        this.props.trendingListRef.scrollTo({
          y: 0,
          animated: true
        });
      }, 0);
    }
  }

  onTrendingWallPress() {
    this.props.dispatch(clearSearchResults());
    this.props.dispatch(clearShareModal());
    this.props.dispatch(setLastTab("Home"));
    if (this.props.navigation.state.index === 0) {
      this.navigateTrendingListToTop();
    }
    this.props.navigation.navigate("Home");
  }

  handleScanPress() {
    this.props.dispatch(clearSearchResults());
    this.props.dispatch(clearShareModal());
    if (this.props.barCode) {
      this.props.dispatch(setLastTab("Scan"));
      this.props.navigation.navigate("Scan");
    } else {
      this.props.dispatch(toggleScanCamera(true));
    }
  }

  onSettingsPress() {
    this.props.dispatch(clearSearchResults());
    this.props.dispatch(clearShareModal());
    this.props.dispatch(setLastTab("Settings"));
    this.props.navigation.navigate("Settings");
  }

  onNotificationsPress() {
    this.props.dispatch(clearSearchResults());
    this.props.dispatch(clearShareModal());
    this.props.dispatch(setLastTab("Notifications"));
    this.props.navigation.navigate("Notifications");
  }

  onMessagesPress() {
    this.props.dispatch(clearSearchResults());
    this.props.dispatch(clearShareModal());
    this.props.dispatch(setLastTab("Messages"));
    this.props.navigation.navigate("Messages");
  }

  renderMessagesUpdates() {
    const newMessages = this.props.chats
      ? reduce(
          this.props.chats,
          (newMsgs: number, chat: any) =>
            newMsgs +
            (chat.newMessages ? chat.newMessages[this.props.userId] || 0 : 0),
          0
        )
      : null;

    if (!newMessages) {
      return null;
    }

    return (
      <View style={[styles.notificationsUpdate]}>
        <Text numberOfLines={1} style={styles.notificationsUpdateText}>
          {newMessages}
        </Text>
      </View>
    );
  }

  renderMessagesIcon() {
    return (
      <TouchableOpacity
        style={{
          position: "relative"
        }}
        onPress={this.onMessagesPress}
        hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
      >
        <View
          style={[
            this.props.navigation.state.index === 3 ? styles.iconActive : null,
            styles.icon
          ]}
        >
          {this.renderMessagesUpdates()}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <SimpleLineIcons
              name="bubble"
              size={19}
              style={{ marginTop: -5 }}
              color={
                this.props.navigation.state.index === 3 ? "#3b9dff" : fontColor
              }
            />
            <Text
              style={[
                styles.pageTitle,
                {
                  color:
                    this.props.navigation.state.index === 3
                      ? "#3b9dff"
                      : fontColor
                }
              ]}
            >
              {locale[this.props.language]["page.chat.title"]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderAddIcon() {
    return (
      <TouchableOpacity
        style={{
          position: "relative"
        }}
        onPress={this.pickImage}
        hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
      >
        <View
          style={[
            this.props.navigation.state.index === 2 ? styles.iconActive : null,
            styles.icon
          ]}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <SimpleLineIcons
              name="camera"
              size={20}
              style={{ marginTop: -5 }}
              color={
                this.props.navigation.state.index === 2 ? "#3b9dff" : fontColor
              }
            />
            <Text
              style={[
                styles.pageTitle,
                {
                  color:
                    this.props.navigation.state.index === 2
                      ? "#3b9dff"
                      : fontColor
                }
              ]}
            >
              Share
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  renderNotificationsUpdates() {
    const notifications = this.props.notifications
      ? values(
          filter(this.props.notifications, notification => !notification.seen)
        )
      : null;

    if (!notifications || isEmpty(notifications)) {
      return null;
    }

    return (
      <View style={[styles.notificationsUpdate]}>
        <Text numberOfLines={1} style={styles.notificationsUpdateText}>
          {notifications.length}
        </Text>
      </View>
    );
  }

  renderNotificationsIcon() {
    return (
      <TouchableOpacity
        style={{
          position: "relative"
        }}
        onPress={this.onNotificationsPress}
      >
        <View
          style={[
            this.props.navigation.state.index === 4 ? styles.iconActive : null,
            styles.icon
          ]}
          hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
        >
          {this.renderNotificationsUpdates()}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <SimpleLineIcons
              name="bell"
              size={19}
              style={{ marginTop: -5 }}
              color={
                this.props.navigation.state.index === 4 ? "#3b9dff" : fontColor
              }
            />
            <Text
              style={[
                styles.pageTitle,
                {
                  color:
                    this.props.navigation.state.index === 4
                      ? "#3b9dff"
                      : fontColor
                }
              ]}
            >
              {locale[this.props.language]["page.alerts.title"]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSettingsIcon() {
    return (
      <TouchableOpacity onPress={this.onSettingsPress}>
        <View
          style={[
            this.props.navigation.state.index === 5 ? styles.iconActive : null,
            styles.icon
          ]}
          hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
        >
          <SimpleLineIcons
            name="menu"
            size={17}
            style={{ marginTop: -5 }}
            color={
              this.props.navigation.state.index === 5 ? "#3b9dff" : fontColor
            }
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    if (!this.props.navigation) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.trendingButtonsWrapper}>
          <View style={styles.trendingButtons}>
            <TouchableOpacity
              onPress={this.onTrendingWallPress}
              hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
            >
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <SimpleLineIcons
                  size={18}
                  name="home"
                  style={{ marginTop: -4 }}
                  color={
                    this.props.navigation.state.index === 0
                      ? "#3b9dff"
                      : fontColor
                  }
                />
                <Text
                  style={[
                    styles.pageTitle,
                    {
                      color:
                        this.props.navigation.state.index === 0
                          ? "#3b9dff"
                          : fontColor
                    }
                  ]}
                >
                  {locale[this.props.language]["page.home.title"]}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleScanPress}
              hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
            >
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <SimpleLineIcons
                  size={20}
                  style={{ marginTop: -5 }}
                  name="frame"
                  color={
                    this.props.navigation.state.index === 1
                      ? "#3b9dff"
                      : fontColor
                  }
                />
                <Text
                  style={[
                    styles.pageTitle,
                    {
                      color:
                        this.props.navigation.state.index === 1
                          ? "#3b9dff"
                          : fontColor
                    }
                  ]}
                >
                  {locale[this.props.language]["page.scan.title"]}
                </Text>
              </View>
            </TouchableOpacity>
            {this.renderAddIcon()}
            {this.renderMessagesIcon()}
            {this.renderNotificationsIcon()}
            {this.renderSettingsIcon()}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  navigation: state.trendingThingsNav.tabNavigation,
  showFilter: state.app.showFilter,
  language: state.app.language,
  barCode: state.app.barCode,
  notifications: state.applicationData.notifications,
  chats: state.applicationData.chats,
  userId: state.applicationData ? state.applicationData.userId : null,
  trendingListRef: state.app.trendingListRef,
  showTrendingBackButton: state.trendingThingsNav.showBackButton
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
