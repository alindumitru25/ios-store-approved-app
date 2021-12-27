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
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import {
  subscribeToMessagesUpdates,
  unsubscribeToMessagesUpdates
} from "./../../actions/AppActions";
import { GLOBAL_URL } from "./../../utils/Globals";
import { timeAgo } from "./../../utils/Utils";

import common from "./../../styles/CommonStyles";
import styles from "./styles";

interface Props {
  chat: any;
  isLast: boolean;
  userId: number;
  messageUser: (id: number) => void;
}

const Chat = ({ chat, isLast, userId, messageUser }: Props) => {
  const user =
    chat.participant1 !== userId
      ? chat.userParticipant1
      : chat.userParticipant2;
  const newMessages = chat.newMessages && chat.newMessages[userId];
  return (
    <View
      key={user.id}
      style={isLast ? styles.receiverWrapperLast : styles.receiverWrapper}
    >
      <TouchableOpacity onPress={() => messageUser(user.id)}>
        <View style={styles.receiverContainer}>
          <View
            style={{
              alignItems: "center",
              height: "100%",
              justifyContent: "flex-start"
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
            {newMessages ? (
              <View style={[styles.newMessagesWrapper]}>
                <Text numberOfLines={1} style={styles.newMessagesText}>
                  {newMessages}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.receiver}>
            <Text style={styles.receiverName}>{`${user.firstName} ${
              user.lastName
            }`}</Text>
            <Text numberOfLines={1} style={styles.lastMessage}>
              {chat.lastSender === userId
                ? `You: ${chat.lastMessage}`
                : chat.lastMessage}
            </Text>
            <Text style={styles.date}>
              {timeAgo.format(new Date(chat.updatedAt || chat.createdAt))}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
