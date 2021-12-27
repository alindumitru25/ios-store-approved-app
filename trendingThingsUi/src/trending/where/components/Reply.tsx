import * as React from "react";
import { connect } from "react-redux";
import { Text, View, Image, TouchableHighlight } from "react-native";
import { find } from "lodash";

import { GLOBAL_URL } from "./../../../utils/Globals";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FastImage from "react-native-fast-image";
import { likeReply, dislikeReply } from "./../../../actions/WhereActions";
import { navigateToTrendingPost } from "./../../../actions/TrendingNavActions";

// styles
import styles from "./styles";
import common from "./../../../styles/CommonStyles";

interface Props {
  reply: any;
  comment: any;
  onReply: (comment: any, userId: number, name: string) => void;
}

interface DispatchProps {
  likeReply: (replyId: number) => void;
  dislikeReply: (replyId: number) => void;
  navigateToTrendingPost: (params: any) => void;
}

interface StateProps {
  userId: number;
  tabNavigation: any;
}

type ClassProps = Props & DispatchProps & StateProps;

const Reply = ({
  reply,
  comment,
  userId,
  likeReply,
  dislikeReply,
  tabNavigation,
  navigateToTrendingPost,
  onReply
}: ClassProps) => {
  const { user } = reply;
  const isLiked = reply.likesUsers && reply.likesUsers[userId];
  return (
    <View style={styles.commentWrapper}>
      <View style={common.post_avatar_wrapper}>
        <FastImage
          source={{
            uri: `${GLOBAL_URL}/user/avatar/${reply.userId}`,
            priority: FastImage.priority.normal
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
          <Text style={styles.commentText}>
            <Text style={styles.repliedUsername}>{`${
              reply.repliedUserName
            } `}</Text>
            <Text>{reply.comment}</Text>
          </Text>
        </View>
        {reply.productDescription ? (
          <View style={styles.commentRow}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {
                navigateToTrendingPost({
                  documentId: reply.productId,
                  user
                });
                tabNavigation.navigate("Home");
              }}
            >
              <View style={styles.commentLocationWrapper}>
                <FontAwesome name="shopping-basket" color="#686868" size={13} />
                <View style={styles.commentProductWrapper}>
                  <Text style={styles.commentProductTitle}>
                    Produsul acesta te-ar putea interesa
                  </Text>
                  <Text style={styles.commentProductDescription}>
                    {reply.productDescription}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
            <FontAwesome name="share" color="#686868" size={13} />
          </View>
        ) : null}
        {reply.location ? (
          <View style={styles.commentRow}>
            <View style={styles.commentLocationWrapper}>
              <FontAwesome name="map-marker" color="#686868" size={13} />
              <Text style={styles.commentLocationText}>
                {reply.location.address}
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
            {reply.likesCount ? reply.likesCount : 0}
          </Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() =>
              onReply(
                comment,
                reply.userId,
                `${user.firstName} ${user.lastName}`
              )
            }
          >
            <Text style={styles.actionText}>Reply</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() =>
              isLiked ? dislikeReply(reply.id) : likeReply(reply.id)
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
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.applicationData.userId,
  tabNavigation: state.where.tabNavigation
});

const mapDispatchToProps = {
  likeReply,
  dislikeReply,
  navigateToTrendingPost
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(Reply);
