import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { GLOBAL_URL } from "./../../utils/Globals";

import {
  likeComment,
  dislikeComment,
  onReply
} from "./../../actions/AppActions";
import FastImage from "react-native-fast-image";
import { onUserPress } from "./../../actions/TrendingNavActions";
import PostReplies from "./PostReplies";
import styles from "./styles";
import common from "./../../styles/CommonStyles";
import { locale } from "./../../language/locale";

const commentHitSlop = { top: 5, right: 5, left: 5, bottom: 5 };

interface StateProps {
  userId: number;
  replyToCommentId: number;
  replyToReplyId: number;
  language: string;
}

interface Props {
  comment: any;
  documentId: number;
  scrollToPost: (posY: number, height: number) => void;
}

interface DispatchProps {
  onReply: (commentId: number, userId: number, userName: string) => void;
  likeComment: (commentId: number) => void;
  dislikeComment: (commentId: number) => void;
  onUserPress: (userId: number) => void;
}

type ClassProps = StateProps & Props & DispatchProps;

const PostComment = ({
  comment,
  userId,
  documentId,
  language,
  replyToCommentId,
  replyToReplyId,
  onReply,
  likeComment,
  dislikeComment,
  scrollToPost,
  onUserPress
}: ClassProps) => {
  let postRef: any;
  let commentWrapperRef: any;
  const { user } = comment;
  const isLiked = comment.likesUsers && comment.likesUsers[userId];
  const replying = !replyToReplyId && replyToCommentId === comment.id;

  return (
    <View
      style={[
        styles.commentWrapper,
        replying ? styles.commentHighlighted : null
      ]}
      ref={(ref: any) => (postRef = ref)}
    >
      <View ref={(ref: any) => (commentWrapperRef = ref)} style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            hitSlop={commentHitSlop}
            onPress={() => {
              onUserPress(comment.userId);
            }}
          >
            <View style={common.post_avatar_wrapper}>
              <FastImage
                source={{
                  uri: `${GLOBAL_URL}/user/avatar/${comment.userId}`,
                  priority: FastImage.priority.normal
                }}
                style={common.post_avatar}
              />
            </View>
          </TouchableOpacity>
          <View style={[styles.comment]}>
            <TouchableOpacity
              hitSlop={commentHitSlop}
              onPress={() => {
                onUserPress(comment.userId);
              }}
            >
              <Text style={styles.userDescription}>
                {user.firstName + " " + user.lastName}
              </Text>
            </TouchableOpacity>
            <Text style={styles.commentText}>{comment.comment}</Text>
          </View>
        </View>
        <View style={styles.commentActionsWrapper}>
          <TouchableOpacity style={styles.touchPadding} onPress={() => {}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.likeCount}>
                {`${comment.likesCount ? comment.likesCount : 0} ${
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
                  scrollToPost(frameOffsetY, h);
                  onReply(
                    comment.id,
                    comment.userId,
                    user.firstName + " " + user.lastName
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
              isLiked ? dislikeComment(comment.id) : likeComment(comment.id)
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
      {comment.replies ? (
        <PostReplies
          documentId={documentId}
          comment={comment}
          scrollToReply={(posY, h) => {
            const thatRef = commentWrapperRef;
            postRef.measure((frameOffsetX: number, frameOffsetY: any) => {
              thatRef.measure((a: number, b: number, c: number, ch: number) => {
                scrollToPost(posY + frameOffsetY, h + ch + 5);
              });
            });
          }}
        />
      ) : null}
    </View>
  );
};

const mapDispatchToProps = {
  likeComment,
  dislikeComment,
  onReply,
  onUserPress
};
const mapStateToProps = (state: any) => ({
  userId: state.applicationData.userId,
  replyToCommentId: state.app.replyToCommentId,
  replyToReplyId: state.app.replyToReplyId,
  language: state.app.language
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(PostComment);
