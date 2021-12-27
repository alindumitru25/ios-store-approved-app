import * as React from "react";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { isEmpty, values } from "lodash";
import { GLOBAL_URL } from "./../../utils/Globals";
import { connect } from "react-redux";

import Review from "./Review";
import FastImage from "react-native-fast-image";
import common from "./../../styles/CommonStyles";
import styles from "./styles";

interface Props {
  document: any;
  showCommentBar: () => void;
}

interface StateProps {
  reviews: any;
  userId: number;
  showPostCommentBar: boolean;
}

interface DispatchProps {}

type ClassProps = Props & StateProps & DispatchProps;

const PostReviews = ({
  document,
  reviews,
  userId,
  showPostCommentBar,
  showCommentBar
}: ClassProps) => {
  if (!reviews || isEmpty(reviews)) {
    return (
      <View style={styles.emptyWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.emptyText}>Nu a fost adăugat niciun review!</Text>
          <TouchableHighlight onPress={() => showCommentBar()}>
            <Text style={styles.emptyTextActive}>Adaugă unul</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.reviewsWrapper}>
      {values(reviews).map((review: any) => (
        <Review key={review.id} review={review} />
      ))}
      {showPostCommentBar ? null : (
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
              showCommentBar();
            }}
            style={{ flexGrow: 1 }}
          >
            <View style={styles.addComment}>
              <Text style={styles.addCommentText}>
                Adaugă un review la acest articol...
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

const mapDispatchToProps = {};
const mapStateToProps = (state: any, ownProps: Props) => ({
  reviews: state.applicationData.reviews ? state.applicationData.reviews : null,
  userId: state.applicationData.userId,
  showPostCommentBar: state.app.showPostCommentBar
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(PostReviews);
