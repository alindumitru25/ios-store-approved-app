import * as React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  findNodeHandle
} from "react-native";
import { connect } from "react-redux";
import { GLOBAL_URL } from "./../../utils/Globals";

import {
  usefulReview,
  removeUseful,
  notUsefulReview,
  removeNotUseful
} from "./../../actions/AppActions";
import FastImage from "react-native-fast-image";
import StarRating from "react-native-star-rating";
import styles from "./styles";
import common from "./../../styles/CommonStyles";

interface StateProps {
  userId: number;
}

interface Props {
  review: any;
}

interface DispatchProps {
  onReplyToReply: (commentId: number, replyId: number, userId: number) => void;
  usefulReview: (reviewId: number) => void;
  removeUseful: (reviewId: number) => void;
  notUsefulReview: (reviewId: number) => void;
  removeNotUseful: (reviewId: number) => void;
}

type ClassProps = StateProps & Props & DispatchProps;

const Review = ({
  userId,
  review,
  usefulReview,
  removeUseful,
  notUsefulReview,
  removeNotUseful
}: ClassProps) => {
  let postRef: any;
  const isUseful = review.usefulUsers && review.usefulUsers[userId];
  const notUseful = review.notUsefulUsers && review.notUsefulUsers[userId];

  return (
    <View
      style={[styles.commentWrapper, { marginTop: 6, marginBottom: 8 }]}
      ref={(ref: any) => (postRef = ref)}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={common.post_avatar_wrapper}>
          <FastImage
            source={{
              uri: `${GLOBAL_URL}/user/avatar/${review.userId}`,
              priority: FastImage.priority.normal
            }}
            style={common.post_avatar}
          />
        </View>
        <View style={[styles.comment]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.userDescription} />
            {review.rating ? (
              <View
                style={{
                  marginLeft: 8,
                  marginTop: -5,
                  backgroundColor: "#f7f7f7",
                  padding: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                  borderRadius: 17,
                  overflow: "hidden"
                }}
              >
                <Text
                  style={{
                    fontWeight: "300",
                    fontSize: 15,
                    color: "black"
                  }}
                >
                  {`a acordat ${review.rating} stele`}
                </Text>
              </View>
            ) : null}
          </View>
          {review.review ? (
            <View>
              <Text style={styles.commentText}>{review.review}</Text>
            </View>
          ) : (
            <View style={styles.postRating}>
              <StarRating
                disabled
                maxStars={5}
                starSize={13}
                rating={review.rating}
                starColor="#f1c140"
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.commentActionsWrapper}>
        <TouchableHighlight
          style={styles.touchPadding}
          underlayColor="transparent"
          onPress={() =>
            isUseful ? removeUseful(review.id) : usefulReview(review.id)
          }
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={[
                styles.actionText,
                {
                  marginLeft: 5,
                  color: isUseful ? "#12cde8" : "black"
                }
              ]}
            >
              {`De ajutor (${review.usefulCount || 0})`}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.touchPadding}
          underlayColor="transparent"
          onPress={() =>
            notUseful ? removeNotUseful(review.id) : notUsefulReview(review.id)
          }
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={[
                styles.actionText,
                {
                  marginLeft: 5,
                  color: notUseful ? "#12cde8" : "black"
                }
              ]}
            >
              {`Nu e de ajutor (${review.notUsefulCount || 0})`}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  usefulReview,
  removeUseful,
  notUsefulReview,
  removeNotUseful
};
const mapStateToProps = (state: any) => ({
  userId: state.applicationData.userId
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(Review);
