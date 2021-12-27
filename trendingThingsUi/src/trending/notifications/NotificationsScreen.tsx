import * as React from "react";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Notification from "./Notification";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import {
  fetchNotifications,
  markNotificationsAsSeen
} from "./../../actions/AppActions";
import { isEmpty, values, sortBy } from "lodash";

import styles from "./styles";
import { locale } from "./../../language/locale";

interface Props {}

interface StoreProps {
  lastTab: string;
  notifications: any;
  loadingNotifications: boolean;
  language: string;
}

interface DispatchProps {
  fetchNotifications: (cb?: () => void) => void;
  markNotificationsAsSeen: () => void;
}

type ClassProps = Props & StoreProps & DispatchProps;

interface State {
  refreshing: boolean;
}

class NotificationsScreen extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      refreshing: false
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps: ClassProps) {
    if (
      this.props.lastTab !== "Notifications" &&
      nextProps.lastTab === "Notifications"
    ) {
      this.props.fetchNotifications();
      this.props.markNotificationsAsSeen();
    }
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {locale[this.props.language]["notifications.title"]}
        </Text>
      </View>
    );
  }

  onRefresh() {
    this.setState({
      refreshing: true
    });

    this.props.fetchNotifications(() => {
      this.setState({
        refreshing: false
      });
    });
  }

  render() {
    if (this.props.lastTab !== "Notifications") {
      return null;
    }
    const notifs = sortBy(
      values(this.props.notifications),
      (notification: any) => notification.createdAt
    ).reverse();
    return (
      <View style={{ flex: 1 }}>
        {this.props.loadingNotifications && !this.state.refreshing ? (
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
            <ActivityIndicator color="white" />
          </View>
        ) : null}
        {!notifs || isEmpty(notifs) ? (
          <View style={{ flex: 1 }}>
            {this.renderHeader()}
            <View style={styles.emptyWrapper}>
              <AwesomeIcon name="bell-o" size={18} />
              <Text style={styles.emptyText}>
                {locale[this.props.language]["no.notifications"]}
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={notifs}
            ListHeaderComponent={() => this.renderHeader()}
            keyExtractor={(item: any) => item.id}
            refreshControl={
              <RefreshControl
                colors={["white"]}
                tintColor="white"
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
            renderItem={({ item, index }) => {
              return (
                <Notification
                  key={item.id}
                  notification={item}
                  isLast={notifs.length - 1 === index}
                  isFirst={index === 0}
                />
              );
            }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lastTab: state.app.lastTab,
  notifications: state.applicationData.notifications,
  loadingNotifications: state.applicationData.loadingNotifications,
  language: state.app.language
});

const mapDispatchToProps = {
  fetchNotifications,
  markNotificationsAsSeen
};

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
