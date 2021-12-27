import * as React from "react";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import {
  getChats,
  messageUser,
  subscribeToChatsUpdates,
  unsubscribeToChatsUpdates
} from "./../../actions/AppActions";
import { isEmpty } from "lodash";
import { GLOBAL_URL } from "./../../utils/Globals";
import { values, size, isEqual, difference } from "lodash";

import MessageModal from "./MessageModal";
import Chat from "./Chat";

import common from "./../../styles/CommonStyles";
import styles from "./styles";
import { locale } from "./../../language/locale";

interface Props {}

interface StoreProps {
  lastTab: string;
  chats: any;
  loadingMessages: boolean;
  userId: number;
  language: string;
}

interface DispatchProps {
  getChats: (cb?: () => void) => void;
  messageUser: (userId: number) => void;
  subscribeToChatsUpdates: (receiverId: number) => void;
  unsubscribeToChatsUpdates: (receiverId: number) => void;
}

type ClassProps = Props & StoreProps & DispatchProps;

interface State {
  refreshing: boolean;
}

class MessagesScreen extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      refreshing: false
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps: ClassProps) {
    if (this.props.lastTab !== "Messages" && nextProps.lastTab === "Messages") {
      this.props.getChats();
    }
  }

  onRefresh() {
    this.setState({
      refreshing: true
    });

    this.props.getChats(() => {
      this.setState({
        refreshing: false
      });
    });
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {locale[this.props.language]["messages.title"]}
        </Text>
      </View>
    );
  }

  renderContent() {
    if (!this.props.chats || isEmpty(this.props.chats)) {
      return (
        <View style={styles.emptyWrapper}>
          <AwesomeIcon name="comment-o" size={18} />
          <Text style={styles.emptyText}>
            {locale[this.props.language]["no.messages"]}
          </Text>
        </View>
      );
    }

    return values(this.props.chats).map((chat: any, i: number) => (
      <Chat
        key={chat.id}
        chat={chat}
        isLast={i === size(this.props.chats) - 1}
        messageUser={(id: number) => this.props.messageUser(id)}
        userId={this.props.userId}
      />
    ));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={["white"]}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              tintColor="white"
            />
          }
          style={{ flex: 1 }}
        >
          {this.renderHeader()}
          <View style={styles.container}>{this.renderContent()}</View>
        </ScrollView>
        <MessageModal />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lastTab: state.app.lastTab,
  chats: state.applicationData.chats,
  loadingMessages: state.applicationData.loadingMessages,
  userId: state.applicationData.userId,
  language: state.app.language
});

const mapDispatchToProps = {
  getChats,
  messageUser,
  subscribeToChatsUpdates,
  unsubscribeToChatsUpdates
};

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(MessagesScreen);
