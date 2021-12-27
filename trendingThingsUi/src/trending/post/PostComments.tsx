import * as React from "react";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { values } from "lodash";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import PostComment from "./PostComment";
import FastImage from "react-native-fast-image";
import { GLOBAL_URL } from "./../../utils/Globals";
import { clearOnReply } from "./../../actions/AppActions";

import styles from "./styles";
import common from "./../../styles/CommonStyles";
import { locale } from "./../../language/locale";

interface StateProps {
  comments: any;
  userId: number;
  hideAddComment: boolean;
  language: string;
}

interface Props {
  document: any;
  scrollToPost: (posY: number, height: number) => void;
  showCommentBar: () => void;
}

interface DispatchProps {
  clearOnReply: () => void;
}

type ClassProps = StateProps & Props & DispatchProps;

const PostComments = ({
  comments,
  showCommentBar,
  scrollToPost,
  document,
  userId,
  language,
  hideAddComment,
  clearOnReply
}: ClassProps) => {
  if (!comments || isEmpty(comments)) {
    return (
      <View style={styles.emptyWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.emptyText}>
            {locale[language]["no.comments.yet"]}
          </Text>
          <TouchableHighlight onPress={() => showCommentBar()}>
            <Text style={styles.emptyTextActive}>
              {locale[language]["add.comment.one"]}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.commentsWrapper}>
      {values(comments).map((comment: any) => (
        <PostComment
          scrollToPost={scrollToPost}
          key={comment.id}
          comment={comment}
          documentId={document.id}
        />
      ))}
      {hideAddComment ? null : (
        <View style={styles.addCommentWrapper}>
          <View style={common.post_avatar_wrapper}>
            <FastImage
              source={{
                uri: `${GLOBAL_URL}/user/avatar/${userId}`,
                priority: FastImage.priority.normal
              }}
              style={common.post_avatar}
            />
          </View>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              clearOnReply();
              showCommentBar();
            }}
            style={{
              flexGrow: 1,
              margin: 5,
              borderRadius: 17,
              justifyContent: "flex-start"
            }}
          >
            <View style={styles.addComment}>
              <Text style={styles.addCommentText}>
                {locale[language]["add.comment.article"]}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

const mapDispatchToProps = {
  clearOnReply
};
const mapStateToProps = (state: any, ownProps: Props) => ({
  comments: state.applicationData.comments
    ? state.applicationData.comments
    : null,
  userId: state.applicationData.userId,
  hideAddComment:
    state.app.showPostCommentBar &&
    !state.app.replyToCommentId &&
    !state.app.replyToReplyId,
  language: state.app.language
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(PostComments);
