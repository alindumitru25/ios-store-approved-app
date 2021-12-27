import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Spinner from "react-native-spinkit";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { values, find, without, includes, debounce } from "lodash";

import {
  getMessages,
  clearMessageModal,
  sendMessage,
  subscribeToMessagesUpdates,
  unsubscribeToMessagesUpdates,
  showSendPhotoModal
} from "./../../actions/AppActions";
import { onUserPress } from "./../../actions/TrendingNavActions";
import { getMessagesByChatId, getChat } from "./messagesSelector";
import MessageInput from "./MessageInput";
import ImagePicker from "react-native-image-picker";
import SendPhotoModal from "./SendPhotoModal";

import styles from "./styles";
import { locale } from "./../../language/locale";

interface StateProps {
  showMessageModal: boolean;
  senderId: number;
  receiverId: number;
  messages: any;
  chat: any;
  receiverUser: any;
  loadingChats: boolean;
  loadingMessages: boolean;
  language: string;
}

interface Props {}

interface DispatchProps {
  getMessages: (receiverUserId: number, userId: number) => void;
  clearMessageModal: () => void;
  sendMessage: (message: any, receiverId: number) => void;
  subscribeToMessagesUpdates: (receiverId: number) => void;
  unsubscribeToMessagesUpdates: (receiverId: number) => void;
  showSendPhotoModal: (photo: any) => void;
  onUserPress: (userId: number) => void;
}

type ClassProps = StateProps & DispatchProps & Props;

interface State {
  photo: any;
}

class ReactionsModal extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.onSend = this.onSend.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);
    this.pickImage = debounce(this.pickImage.bind(this), 1000, {
      leading: true
    });
    this.state = {
      photo: null
    };
  }

  onSend(messages: any) {
    this.props.sendMessage(messages[0].text, this.props.receiverId);
  }

  componentWillReceiveProps(nextProps: ClassProps) {
    if (
      !this.props.showMessageModal &&
      nextProps.showMessageModal &&
      nextProps.receiverId
    ) {
      this.props.getMessages(nextProps.receiverId, nextProps.senderId);
      this.props.subscribeToMessagesUpdates(nextProps.senderId);
    } else if (this.props.showMessageModal && !nextProps.showMessageModal) {
      this.props.unsubscribeToMessagesUpdates(nextProps.senderId);
    }
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

      let photo = {
        name: response.name,
        path: response.uri
      };

      this.props.showSendPhotoModal(photo);
      photo = null;
    });
  }

  renderActions(props: any) {
    return (
      <View style={styles.addImageWrapper}>
        <TouchableOpacity onPress={this.pickImage} style={{ padding: 5 }}>
          <Ionicons name="md-images" size={22} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  renderBubble(props: any) {
    return (
      <Bubble
        {...props}
        textProps={{
          style: {
            fontSize: 16
          }
        }}
      />
    );
  }

  renderInputToolbar(props: any) {
    return <MessageInput {...props} />;
  }

  renderHeader() {
    return (
      <View style={styles.messageHeader}>
        <TouchableOpacity
          onPress={() => this.props.clearMessageModal()}
          style={styles.closeButton}
        >
          <Ionicons name="md-close" size={22} color="black" />
        </TouchableOpacity>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.clearMessageModal();
              this.props.onUserPress(this.props.receiverId);
            }}
          >
            <Text style={styles.messageHeaderText}>
              {this.props.receiverUser
                ? this.props.receiverUser.firstName +
                  " " +
                  this.props.receiverUser.lastName
                : ""}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.messageSubheader]}>
            {`${this.props.chat ? this.props.chat.totalMessages || 0 : 0} ${
              locale[this.props.language]["messages.text"]
            }`}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    if (!this.props.showMessageModal) {
      return null;
    }

    let content;
    if (this.props.loadingChats || this.props.loadingMessages) {
      content = (
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Spinner isVisible size={30} type="Arc" color="#464646" />
        </View>
      );
    } else {
      content = (
        <GiftedChat
          messages={this.props.messages || []}
          onSend={this.onSend}
          renderInputToolbar={this.renderInputToolbar}
          renderBubble={this.renderBubble}
          minInputToolbarHeight={60}
          renderActions={(props: any) => this.renderActions(props)}
          onPressActionButton={this.pickImage}
          onPressAvatar={(user: any) => {
            this.props.clearMessageModal();
            this.props.onUserPress(user.id);
          }}
          renderLoading={() => (
            <View
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spinner isVisible size={30} type="Arc" color="#464646" />
            </View>
          )}
        />
      );
    }

    return (
      <Modal
        visible={this.props.showMessageModal}
        animationType="slide"
        transparent
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modal}>
            {this.renderHeader()}
            {content}
          </View>
        </View>
        <SendPhotoModal />
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  getMessages,
  clearMessageModal,
  sendMessage,
  subscribeToMessagesUpdates,
  unsubscribeToMessagesUpdates,
  showSendPhotoModal,
  onUserPress
};

const mapStateToProps = (state: any) => {
  const senderId = state.applicationData.userId;
  const receiverId = state.app.messageModalReceiverId;

  return {
    showMessageModal: state.app.showMessageModal,
    senderId: state.applicationData.userId,
    receiverId: state.app.messageModalReceiverId,
    messages: getMessagesByChatId(state, senderId, receiverId),
    chat: getChat(state, senderId, receiverId),
    receiverUser: state.applicationData.receiverUser,
    loadingChats: state.applicationData.loadingChats,
    loadingMessages: state.applicationData.loadingMessages,
    language: state.app.language
  };
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ReactionsModal);
