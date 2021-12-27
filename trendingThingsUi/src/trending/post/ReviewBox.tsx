import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import StarRating from "react-native-star-rating";
import {
  clearOnReply,
  setPostReview,
  hideCommentBarOnPost,
  setRating
} from "./../../actions/AppActions";

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import styles from "./styles";

type Props = {
  documentId: number;
  keyboardShowed: boolean;
  keyboardHidden: () => void;
  keyboardWasShown: () => void;
  sendReview: (comment: string, rating: number) => void;
};

type StateProps = {
  review: string;
  showPostCommentBar: boolean;
  rating: number;
};

type DispatchProps = {
  setPostReview: (review: string) => void;
  hideCommentBarOnPost: (documentId: number) => void;
  setRating: (rating: number) => void;
};

type ClassProps = Props & StateProps & DispatchProps;

const CommentBox = ({
  review,
  documentId,
  keyboardShowed,
  rating,
  showPostCommentBar,
  hideCommentBarOnPost,
  setPostReview,
  keyboardHidden,
  keyboardWasShown,
  sendReview,
  setRating
}: ClassProps) => {
  if (!showPostCommentBar) {
    return null;
  }

  const sendIconSyles = [review || rating ? styles.active : styles.inactive];
  return (
    <View style={styles.commentBoxContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder="Scrie un review aici..."
          placeholderTextColor="black"
          style={[styles.commentBox]}
          value={review}
          onFocus={keyboardWasShown}
          onBlur={keyboardHidden}
          autoCorrect={false}
          onChangeText={(value: string) => setPostReview(value)}
          blurOnSubmit
          multiline={true}
        />
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.sendIconContainer}
          onPress={() => sendReview(review, rating)}
        >
          <Icon name="paper-plane" style={sendIconSyles} size={17} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.touchPadding}
          underlayColor="transparent"
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
        </TouchableHighlight>
      </View>
      <View style={styles.ratingWrapper}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>Acordă rating</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            starSize={19}
            rating={rating}
            starStyle={{ marginLeft: 14 }}
            selectedStar={(value: any) => setRating(value)}
            starColor="#f1c140"
          />
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  setPostReview,
  hideCommentBarOnPost,
  setRating
};
const mapStateToProps = (state: any) => ({
  userId: state.applicationData.userId,
  review: state.app.postReview,
  showPostCommentBar: state.app.showPostCommentBar,
  rating: state.app.rating
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox);
