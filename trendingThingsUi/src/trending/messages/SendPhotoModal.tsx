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
  ActivityIndicator
} from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { closeSendPhotoModal, sendMessage } from "./../../actions/AppActions";
import { getChat } from "./messagesSelector";

import styles from "./styles";

interface StateProps {
  showSendPhotoModal: boolean;
  senderId: number;
  receiverId: number;
  chat: any;
  photo: any;
  loading: boolean;
}

interface Props {}

interface DispatchProps {
  closeSendPhotoModal: () => void;
  sendMessage: (message: any, receiverId: number, photo: any) => void;
}

type ClassProps = StateProps & DispatchProps & Props;

class ReactionsModal extends React.Component<ClassProps, {}> {
  constructor(props: ClassProps) {
    super(props);
  }

  render() {
    if (!this.props.showSendPhotoModal) {
      return null;
    }

    return (
      <Modal
        visible={this.props.showSendPhotoModal}
        animationType="slide"
        transparent
      >
        <View style={styles.modalWrapper}>
          <View
            style={[
              styles.modal,
              { paddingBottom: 0, backgroundColor: "black", borderRadius: 0 }
            ]}
          >
            <TouchableOpacity
              onPress={() => this.props.closeSendPhotoModal()}
              style={styles.closeButtonBlue}
            >
              <Ionicons name="md-close" size={17} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: this.props.photo.path }}
              style={{ resizeMode: "center", height: "100%" }}
            />
            <TouchableOpacity
              onPress={() => {
                if (!this.props.loading) {
                  this.props.sendMessage(
                    "",
                    this.props.receiverId,
                    this.props.photo
                  );
                }
              }}
              style={styles.sendButton}
            >
              {this.props.loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Icon name="paper-plane" size={17} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  closeSendPhotoModal,
  sendMessage
};

const mapStateToProps = (state: any) => {
  const senderId = state.applicationData.userId;
  const receiverId = state.app.messageModalReceiverId;

  return {
    showSendPhotoModal: state.app.showSendPhotoModal,
    senderId: state.applicationData.userId,
    receiverId: state.app.messageModalReceiverId,
    chat: getChat(state, senderId, receiverId),
    photo: state.app.sendPhoto,
    loading: state.app.loadingSendMessage
  };
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ReactionsModal);
