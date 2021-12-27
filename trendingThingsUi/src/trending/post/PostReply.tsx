import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  findNodeHandle
} from "react-native";
import { connect } from "react-redux";
import { GLOBAL_URL } from "./../../utils/Globals";

import {
  likeReply,
  dislikeReply,
  onReplyToReply
} from "./../../actions/AppActions";
import { onUserPress } from "./../../actions/TrendingNavActions";
import styles from "./styles";
import common from "./../../styles/CommonStyles";
import FastImage from "react-native-fast-image";
import { locale } from "./../../language/locale";

const commentHitSlop = { top: 5, right: 5, left: 5, bottom: 5 };

interface StateProps {
  userId: number;
  replyToReplyId: number;
  language: string;
}

interface Props {
  reply: any;
  commentId: number;
  scrollToReply: (posY: number, height: number) => void;
}

interface DispatchProps {
  onReplyToReply: (
    commentId: number,
    replyId: number,
    userId: number,
    userName: string
  ) => void;
  likeReply: (replyId: number) => void;
  dislikeReply: (replyId: number) => void;
  onUserPress: (userId: number) => void;
}

type ClassProps = StateProps & Props & DispatchProps;

const PostReply = ({
  reply,
  userId,
  language,
  replyToReplyId,
  commentId,
  onReplyToReply,
  likeReply,
  dislikeReply,
  scrollToReply,
  onUserPress
}: ClassProps) => {
  if (!reply) {
    return null;
  }

  let postRef: any;
  const { user } = reply;
  const isLiked = reply.likesUsers && reply.likesUsers[userId];
  const replying = replyToReplyId === reply.id;
  return (
    <View
      style={[styles.replyWrapper, replying ? styles.commentHighlighted : null]}
      ref={(ref: any) => (postRef = ref)}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <TouchableOpacity
          hitSlop={commentHitSlop}
          onPress={() => {
            onUserPress(reply.userId);
          }}
        >
          <View style={common.post_avatar_wrapper}>
            <FastImage
              source={{
                uri: `${GLOBAL_URL}/user/avatar/${reply.userId}`,
                priority: FastImage.priority.normal
              }}
              style={common.post_avatar}
            />
          </View>
        </TouchableOpacity>
        <View style={[styles.comment]}>
          <TouchableOpacity
            onPress={() => {
              onUserPress(reply.userId);
            }}
          >
            <Text style={styles.userDescription}>
              {user.firstName + " " + user.lastName}
            </Text>
          </TouchableOpacity>
          <Text style={styles.commentText}>
            <Text style={styles.replyUserName}>
              {"@" + reply.repliedUserName + " "}
            </Text>
            {reply.comment}
          </Text>
        </View>
      </View>
      <View style={styles.commentActionsWrapper}>
        <TouchableOpacity style={styles.touchPadding} onPress={() => {}}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.likeCount}>
              {`${reply.likesCount ? reply.likesCount : 0} ${
                locale[language]["likes"]
              }`}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchPadding}
          onPress={() => {
            postRef.measure(
              (
                frameOffsetX: number,
                frameOffsetY: number,
                w: number,
                h: number
              ) => {
                scrollToReply(frameOffsetY, h);
                onReplyToReply(
                  commentId,
                  reply.id,
                  reply.userId,
                  `${user.firstName} ${user.lastName}`
                );
              }
            );
          }}
        >
          <Text style={styles.actionText}>{locale[language]["respond"]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchPadding}
          onPress={() =>
            isLiked ? dislikeReply(reply.id) : likeReply(reply.id)
          }
        >
          <Text
            style={[
              styles.actionText,
              {
                color: isLiked ? "#12cde8" : "black"
              }
            ]}
          >
            {locale[language]["like.action.text"]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  likeReply,
  dislikeReply,
  onReplyToReply,
  onUserPress
};
const mapStateToProps = (state: any) => ({
  userId: state.applicationData.userId,
  replyToReplyId: state.app.replyToReplyId,
  language: state.app.language
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(PostReply);
