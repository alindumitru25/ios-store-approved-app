import * as React from "react";
import { connect } from "react-redux";
import { Text, View, Image, TouchableHighlight } from "react-native";

import { GLOBAL_URL } from "./../../../utils/Globals";

import Reply from "./Reply";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { likeComment, dislikeComment } from "./../../../actions/WhereActions";
import { navigateToTrendingPost } from "./../../../actions/TrendingNavActions";

// styles
import styles from "./styles";
import common from "./../../../styles/CommonStyles";

interface Props {
  comment: any;
  onReply: (comment: any, userId: number, name: string) => void;
}

interface DispatchProps {
  likeComment: (id: number) => void;
  dislikeComment: (id: number) => void;
  navigateToTrendingPost: (params: any) => void;
}

interface StateProps {
  tabNavigation: any;
  userId: number;
}

type ClassProps = Props & DispatchProps & StateProps;

const Replies = ({ replies, comment, onReply }: any) => {
  if (replies && replies.length) {
    return (
      <View style={styles.repliesWrapper}>
        {replies.map((reply: any) => (
          <Reply
            key={reply.id}
            reply={reply}
            comment={comment}
            onReply={onReply}
          />
        ))}
      </View>
    );
  }

  return null;
};

const Comment = ({
  comment,
  likeComment,
  dislikeComment,
  onReply,
  navigateToTrendingPost,
  tabNavigation,
  userId
}: ClassProps) => {
  const { user } = comment;
  const isLiked = comment.likesUsers && comment.likesUsers[userId];
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentWrapper}>
        <View style={common.post_avatar_wrapper}>
          <Image
            source={{
              uri: `${GLOBAL_URL}/user/avatar/${comment.userId}`,
              cache: "force-cache"
            }}
            style={common.post_avatar}
          />
        </View>
        <View style={styles.col}>
          <View style={styles.comment}>
            <View style={styles.userDescriptionWrapper}>
              <Text style={styles.userDescription}>
                {user.firstName + " " + user.lastName}
              </Text>
            </View>
            <Text style={styles.commentText}>{comment.comment}</Text>
          </View>
          {comment.productDescription ? (
            <View style={styles.commentRow}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  navigateToTrendingPost({
                    documentId: comment.productId,
                    user
                  });
                  tabNavigation.navigate("Home");
                }}
              >
                <View style={styles.commentLocationWrapper}>
                  <FontAwesome
                    name="shopping-basket"
                    color="#686868"
                    size={13}
                  />
                  <View style={styles.commentProductWrapper}>
                    <Text style={styles.commentProductTitle}>
                      Produsul acesta te-ar putea interesa
                    </Text>
                    <Text style={styles.commentProductDescription}>
                      {comment.productDescription}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              <FontAwesome name="share" color="#686868" size={13} />
            </View>
          ) : null}
          {comment.location ? (
            <View style={styles.commentRow}>
              <View style={styles.commentLocationWrapper}>
                <FontAwesome name="map-marker" color="#686868" size={13} />
                <Text style={styles.commentLocationText}>
                  {comment.location.address}
                </Text>
              </View>
              <FontAwesome name="share" color="#686868" size={13} />
            </View>
          ) : null}
          <View style={styles.commentActionsWrapper}>
            <View style={styles.questionLikesWrapper}>
              <FontAwesome name="thumbs-up" size={9} color="white" />
            </View>
            <Text style={styles.likeCount}>
              {comment.likesCount ? comment.likesCount : 0}
            </Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() =>
                onReply(
                  comment,
                  comment.userId,
                  `${user.firstName} ${user.lastName}`
                )
              }
            >
              <Text style={styles.actionText}>Reply</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() =>
                isLiked ? dislikeComment(comment.id) : likeComment(comment.id)
              }
            >
              <Text
                style={[
                  styles.actionText,
                  {
                    color: isLiked ? "#12cde8" : "#464646"
                  }
                ]}
              >
                Like
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <Replies replies={comment.replies} comment={comment} onReply={onReply} />
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  tabNavigation: state.where.tabNavigation,
  userId: state.applicationData.userId
});

const mapDispatchToProps = {
  likeComment,
  dislikeComment,
  navigateToTrendingPost
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
