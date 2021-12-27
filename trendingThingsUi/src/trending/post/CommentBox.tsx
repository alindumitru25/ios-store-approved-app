import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from "react-native";

import {
  clearOnReply,
  setPostComment,
  hideCommentBarOnPost
} from "./../../actions/AppActions";

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import styles from "./styles";
import { locale } from "./../../language/locale";

type Props = {
  documentId: number;
  keyboardShowed: boolean;
  keyboardHidden: () => void;
  keyboardWasShown: () => void;
  sendComment: (comment: string) => void;
};

type StateProps = {
  replyTo: number;
  replyToCommentId: number;
  replyToUsername: string;
  comment: string;
  showPostCommentBar: boolean;
  language: string;
};

type DispatchProps = {
  clearOnReply: () => void;
  setPostComment: (documentId: number, comment: string) => void;
  hideCommentBarOnPost: (documentId: number) => void;
};

type ClassProps = Props & StateProps & DispatchProps;

const CommentBox = ({
  replyTo,
  replyToCommentId,
  replyToUsername,
  comment,
  documentId,
  keyboardShowed,
  language,
  showPostCommentBar,
  hideCommentBarOnPost,
  clearOnReply,
  setPostComment,
  keyboardHidden,
  keyboardWasShown,
  sendComment
}: ClassProps) => {
  if (!showPostCommentBar) {
    return null;
  }

  const renderCommentBoxReply = () => {
    if (replyTo == null || replyToCommentId == null || !showPostCommentBar) {
      return null;
    }

    return (
      <View style={styles.replyingTo}>
        <Text style={styles.replyingToText}>
          {locale[language]["respond.to"]}{" "}
          <Text style={styles.replyingToTextUsername}>{replyToUsername}</Text>
        </Text>
        <TouchableOpacity
          style={styles.touchPadding}
          onPress={() => clearOnReply()}
        >
          <View style={styles.closeButton}>
            <AwesomeIcon
              name="close"
              size={11}
              style={{ marginTop: -1 }}
              color="#f1f1f1"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const sendIconSyles = [comment ? styles.active : styles.inactive];
  return (
    <View style={styles.commentBoxContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder={locale[language]["add.comment.placeholder"]}
          placeholderTextColor="black"
          style={[styles.commentBox]}
          value={comment}
          onFocus={keyboardWasShown}
          onBlur={keyboardHidden}
          onChangeText={(value: string) => setPostComment(documentId, value)}
          blurOnSubmit
          multiline={true}
        />
        <TouchableOpacity
          style={styles.sendIconContainer}
          onPress={() => sendComment(comment)}
        >
          <Icon name="paper-plane" style={sendIconSyles} size={17} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchPadding}
          onPress={() => {
            clearOnReply();
            if (keyboardShowed) {
              keyboardHidden();
            }
            hideCommentBarOnPost(documentId);
          }}
        >
          <View style={styles.closeButton}>
            <AwesomeIcon
              name="long-arrow-down"
              size={11}
              style={{ marginTop: -1 }}
              color="#f1f1f1"
            />
          </View>
        </TouchableOpacity>
      </View>
      {renderCommentBoxReply()}
    </View>
  );
};

const mapDispatchToProps = {
  clearOnReply,
  setPostComment,
  hideCommentBarOnPost
};
const mapStateToProps = (state: any) => ({
  userId: state.applicationData.userId,
  replyTo: state.app.replyTo,
  replyToCommentId: state.app.replyToCommentId,
  replyToUsername: state.app.replyToUsername,
  comment: state.app.postComment,
  showPostCommentBar: state.app.showPostCommentBar,
  language: state.app.language
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox);
