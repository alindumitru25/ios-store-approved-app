import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import FastImage from "react-native-fast-image";
import { GLOBAL_URL } from "./../../utils/Globals";
import { connect } from "react-redux";

import { onPostPress, onUserPress } from "./../../actions/TrendingNavActions";
import { markNotificationAsChecked } from "./../../actions/AppActions";
import { timeAgo } from "./../../utils/Utils";
import { locale } from "./../../language/locale";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// styles
import common from "./../../styles/CommonStyles";
import styles from "./styles";

interface StoreProps {
  tabNavigation: any;
  language: string;
}

interface DispatchProps {
  onPostPress: (documentId: number) => void;
  onUserPress: (userId: any) => void;
  markNotificationAsChecked: (notificationId: number) => void;
}

interface Props {
  notification: any;
  isLast: boolean;
  isFirst: boolean;
}

type ClassProps = StoreProps & DispatchProps & Props;

class Notification extends React.Component<ClassProps, {}> {
  renderTypeIcon() {
    switch (this.props.notification.notificationType) {
      case "userLike":
        return <FontAwesome name="thumbs-o-up" size={15} color="black" />;
      case "comment":
        return <FontAwesome name="comment-o" size={15} color="black" />;
      case "follow":
        return <FontAwesome name="user-o" size={15} color="black" />;
      case "reaction":
        return <FontAwesome name="smile-o" size={15} color="black" />;
      default:
        return <FontAwesome name="thumbs-o-up" size={15} color="black" />;
    }
  }

  render() {
    const {
      notification,
      isLast,
      tabNavigation,
      onPostPress,
      onUserPress
    } = this.props;

    return (
      <View
        style={[
          styles.notificationItemWrapper,
          this.props.isFirst ? styles.notificationItemWrapperFirst : null,
          this.props.isLast ? styles.notificationItemWrapperLast : null
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.markNotificationAsChecked(notification.id);
            if (this.props.notification.notificationType !== "follow") {
              onPostPress(notification.documentId);
            } else {
              onUserPress(notification.triggerUserId);
            }
          }}
        >
          <View
            style={[
              isLast
                ? styles.notificationWrapperLast
                : styles.notificationWrapper,
              !notification.checked ? styles.notificationUnchecked : null
            ]}
          >
            <View style={styles.avatarWrapper}>
              <TouchableOpacity
                onPress={() => {
                  onUserPress(notification.triggerUserId);
                }}
              >
                <View style={common.post_avatar_wrapper}>
                  <FastImage
                    source={{
                      uri: `${GLOBAL_URL}/user/avatar/${
                        notification.triggerUserId
                      }`,
                      priority: FastImage.priority.normal
                    }}
                    style={common.post_avatar}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginLeft: 10,
                flex: 1,
                marginRight: 10
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                {this.renderTypeIcon()}
                <Text style={styles.notificationText}>
                  {`${notification.triggerUsername || ""} ${locale[
                    this.props.language
                  ][notification.description] || notification.description}`}
                </Text>
              </View>
              <Text style={styles.date}>
                {timeAgo.format(new Date(notification.createdAt))}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  tabNavigation: state.trendingThingsNav.tabNavigation,
  language: state.app.language
});

const mapDispatchToProps = {
  onPostPress,
  onUserPress,
  markNotificationAsChecked
};

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
