import * as React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Keyboard,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwesomeIcons from "react-native-vector-icons/FontAwesome";
import Spinner from "react-native-spinkit";

import Comment from "./Comment";
import {
  closeQuestion,
  sendComment,
  sendReply,
  fetchComments,
  showLocationChooser,
  clearQuestionLocation,
  subscribeToQuestionCommentsUpdate,
  unsubscribeToQuestionCommentsUpdate,
  clearReceivedCommentNotification,
  showProductChooser,
  clearProductToShare,
  showCommentBox,
  hideCommentBox
} from "./../../../actions/WhereActions";
import { GLOBAL_URL } from "./../../../utils/Globals";
import _ from "lodash";

// styles
import styles from "./styles";
import common from "./../../../styles/CommonStyles";

const LOADING_TIMEOUT = 300;

enum POS {
  UP,
  DOWN
}

interface ReplyData {
  repliedUserId: number;
  repliedUserName: string;
  parentComment: any;
}

interface StateProps {
  question: any;
  showQuestion: boolean;
  showLoader: boolean;
  comments: any;
  questionsAddedLocations: any;
  showReceivedCommentNotification: any;
  productToShare: any;
  shouldShowCommentBox: boolean;
}

interface DispatchProps {
  closeQuestion: any;
  sendComment: (
    questionId: number,
    comment: string,
    location: any,
    productToShare: any,
    cb: () => void
  ) => void;
  sendReply: (
    questionId: number,
    commentId: number,
    comment: string,
    location: any,
    reply: ReplyData,
    productToShare: any,
    cb: () => void
  ) => void;
  fetchComments: (question: number) => void;
  showLocationChooser: () => void;
  clearQuestionLocation: (questionId: number) => void;
  subscribeToQuestionCommentsUpdate: (questionId: number) => void;
  unsubscribeToQuestionCommentsUpdate: (questionId: number) => void;
  clearReceivedCommentNotification: () => void;
  showProductChooser: () => void;
  clearProductToShare: () => void;
  showCommentBox: () => void;
  hideCommentBox: () => void;
}

interface State {
  actionContainerPosition: POS;
  comment: string;
  loadState: boolean;
  reply: ReplyData;
}

type ClassProps = StateProps & DispatchProps;

class Question extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);
    this.state = {
      actionContainerPosition: POS.DOWN,
      comment: null,
      loadState: true,
      reply: null
    };

    this.moveActionContainerUp = this.moveActionContainerUp.bind(this);
    this.moveActionContainerDown = this.moveActionContainerDown.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.onReply = this.onReply.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.question.id);
    this.props.subscribeToQuestionCommentsUpdate(this.props.question.id);
    setTimeout(() => {
      this.setState({
        loadState: false
      });
    }, LOADING_TIMEOUT);
  }

  componentWillUnmount() {
    this.props.unsubscribeToQuestionCommentsUpdate(this.props.question.id);
    this.props.clearProductToShare();
    this.props.hideCommentBox();
  }

  sendComment() {
    if (!this.state.comment) {
      return;
    }

    if (!this.state.reply) {
      this.props.sendComment(
        this.props.question.id,
        this.state.comment,
        this.props.questionsAddedLocations
          ? this.props.questionsAddedLocations[this.props.question.id]
          : null,
        this.props.productToShare,
        () => {
          Keyboard.dismiss();
          this.props.hideCommentBox();
          this.setState({
            comment: undefined,
            actionContainerPosition: POS.DOWN
          });
        }
      );
    } else {
      this.props.sendReply(
        this.props.question.id,
        this.state.reply.parentComment.id,
        this.state.comment,
        this.props.questionsAddedLocations
          ? this.props.questionsAddedLocations[this.props.question.id]
          : null,
        this.state.reply,
        this.props.productToShare,
        () => {
          Keyboard.dismiss();
          this.props.hideCommentBox();
          this.setState({
            comment: undefined,
            actionContainerPosition: POS.DOWN
          });
        }
      );
    }
  }

  onReply(comment: any, userId: number, name: string) {
    this.props.showCommentBox();
    this.setState({
      reply: {
        parentComment: comment,
        repliedUserId: userId,
        repliedUserName: name
      }
    });
  }

  moveActionContainerUp() {
    this.setState({
      actionContainerPosition: POS.UP
    });
  }

  moveActionContainerDown() {
    this.setState({
      actionContainerPosition: POS.DOWN
    });
  }

  renderCommentProductToShare() {
    if (this.props.productToShare) {
      return (
        <View style={styles.productToShareWrapper}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.props.showProductChooser()}
            style={styles.productToShareToucheable}
          >
            <View style={styles.productChooserTextWrapper}>
              <AwesomeIcons
                name="shopping-basket"
                style={{ marginTop: -2 }}
                size={14}
                color="#464646"
              />
              <Text style={styles.actionButtonTextSmaller} numberOfLines={1}>
                {this.props.productToShare.description}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.closeButtonContainer}
            underlayColor="transparent"
            onPress={() => this.props.clearProductToShare()}
          >
            <View style={styles.closeButtonWrapper}>
              <AwesomeIcons
                name="close"
                size={11}
                style={{ marginTop: -1 }}
                color="#f1f1f1"
              />
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.productToShareWrapper}>
          <TouchableHighlight underlayColor="transparent">
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.props.showProductChooser()}
            >
              <View style={styles.actionButton}>
                <AwesomeIcons
                  name="shopping-basket"
                  size={14}
                  color="#464646"
                />
                <Text style={styles.actionButtonText}>
                  Sugerează un produs in comentariul tău
                </Text>
              </View>
            </TouchableHighlight>
          </TouchableHighlight>
        </View>
      );
    }
  }

  renderCommentLocation() {
    const questionLocation = this.props.questionsAddedLocations
      ? this.props.questionsAddedLocations[this.props.question.id]
      : undefined;
    if (questionLocation) {
      return (
        <View style={styles.addLocationWrapperCol}>
          <TouchableHighlight
            style={styles.addressContainer}
            underlayColor="transparent"
            onPress={() => this.props.showLocationChooser()}
          >
            <View style={styles.actionButtonStretch}>
              <AwesomeIcons
                name="map-marker"
                style={{ marginTop: -2 }}
                size={16}
                color="#464646"
              />
              <Text style={styles.actionButtonTextSmaller}>{`${
                questionLocation.name
              } - ${questionLocation.address}`}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.closeButtonContainer}
            underlayColor="transparent"
            onPress={() =>
              this.props.clearQuestionLocation(this.props.question.id)
            }
          >
            <View style={styles.closeButtonWrapper}>
              <AwesomeIcons
                name="close"
                size={11}
                style={{ marginTop: -1 }}
                color="#f1f1f1"
              />
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.addLocationWrapper}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.props.showLocationChooser()}
          >
            <View style={styles.actionButton}>
              <AwesomeIcons
                name="map-marker"
                style={{ marginTop: -2 }}
                size={16}
                color="#464646"
              />
              <Text style={styles.actionButtonText}>
                Adaugă o locatie in comentariul tău
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

  renderAnswerButton() {
    if (this.props.shouldShowCommentBox) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.props.hideCommentBox}
        >
          <View style={styles.actionButton}>
            <AwesomeIcons
              name="long-arrow-down"
              style={{ marginTop: -2 }}
              size={16}
              color="#464646"
            />
            <Text style={styles.actionButtonText}>Ascunde</Text>
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.props.showCommentBox}
      >
        <View style={styles.actionButton}>
          <AwesomeIcons
            name="comment-o"
            style={{ marginTop: -2 }}
            size={16}
            color="#464646"
          />
          <Text style={styles.actionButtonText}>Adaugă comentariu</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderReply() {
    if (!this.state.reply) {
      return null;
    }

    return (
      <View style={{ flexGrow: 1 }}>
        <View style={styles.replyTextWrapper}>
          <Text style={styles.replyText}>{`răspunzi userului ${
            this.state.reply.repliedUserName
          }`}</Text>
          <TouchableHighlight
            style={styles.closeButtonContainer}
            underlayColor="transparent"
            onPress={() =>
              this.setState({
                reply: null
              })
            }
          >
            <View style={styles.closeButtonWrapper}>
              <AwesomeIcons
                name="close"
                size={11}
                style={{ marginTop: -1 }}
                color="#f1f1f1"
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderCommentBox() {
    if (this.props.shouldShowCommentBox) {
      const sendIconSyles = [
        this.state.comment ? styles.active : styles.inactive
      ];
      return (
        <View style={styles.commentBoxContainer}>
          {this.renderReply()}
          <View>
            <TextInput
              placeholder="Scrie comentariu aici..."
              placeholderTextColor="#464646"
              style={styles.commentBox}
              onFocus={this.moveActionContainerUp}
              onBlur={this.moveActionContainerDown}
              blurOnSubmit
              onChangeText={(value: string) => {
                this.setState({
                  comment: value
                });
              }}
              multiline={true}
            />
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.sendIconContainer}
              onPress={this.sendComment}
            >
              <AwesomeIcons name="send-o" style={sendIconSyles} size={16} />
            </TouchableHighlight>
            {this.renderCommentProductToShare()}
            {this.renderCommentLocation()}
          </View>
        </View>
      );
    }

    return null;
  }

  renderActionBox() {
    const actionBoxStyles = [
      styles.actionContainer,
      this.state.actionContainerPosition === POS.DOWN
        ? styles.containerSmall
        : styles.containerLarge
    ];
    return (
      <View style={actionBoxStyles}>
        {this.renderCommentBox()}
        <View style={styles.questionActionBox}>
          {this.renderAnswerButton()}
          <TouchableHighlight underlayColor="transparent">
            <TouchableHighlight underlayColor="transparent" onPress={() => {}}>
              <View style={styles.actionButton}>
                <AwesomeIcons name="thumbs-o-up" size={14} color="#464646" />
                <Text style={styles.actionButtonText}>Like</Text>
              </View>
            </TouchableHighlight>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.props.closeQuestion()}
          >
            <View style={styles.actionButton}>
              <Ionicons
                name="ios-return-left-outline"
                size={24}
                style={{ marginTop: 2 }}
                color="#464646"
              />
              <Text style={styles.actionButtonText}>Inapoi</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderComments() {
    const { comments } = this.props;

    if (!comments || this.state.loadState) {
      return (
        <View style={styles.spinnerWrapper}>
          <Spinner isVisible size={30} type="Arc" color="#464646" />
        </View>
      );
    }

    return (
      <View style={styles.flexContainer}>
        <Text style={styles.titleText}>Răspunsuri</Text>
        {_.values(comments).map((comment: any) => (
          <Comment key={comment.id} comment={comment} onReply={this.onReply} />
        ))}
      </View>
    );
  }

  renderPhoto() {
    const { question } = this.props;
    if (question.imageId) {
      return (
        <View style={styles.questionImageContainer}>
          <Image
            source={{
              uri: `${GLOBAL_URL}/image/image/${question.imageId}`,
              cache: "force-cache"
            }}
            style={styles.questionImage}
          />
        </View>
      );
    }

    return null;
  }

  render() {
    const { showQuestion, question, closeQuestion } = this.props;

    return (
      <View style={[styles.questionContainer, styles.flexContainer]}>
        <ScrollView style={styles.flexContainer}>
          <View style={[styles.flexContainer, { marginBottom: 10 }]}>
            <Image
              source={require("./../../../../images/search_bg.jpg")}
              style={styles.questionAuthor}
            >
              <View style={styles.authorDetailsWrapper}>
                <View style={styles.questionAuthorWrapper}>
                  <View style={styles.questionAuthorAvatarWrapper}>
                    <Image
                      source={{
                        uri: `${GLOBAL_URL}/user/avatar/${question.userId}`,
                        cache: "force-cache"
                      }}
                      style={styles.questionAuthorAvatar}
                    />
                  </View>
                </View>
                <View style={styles.authorDetails}>
                  <Text
                    style={{ color: "#464646", fontSize: 12 }}
                  >{` asked on ${moment(question.createdAt).format(
                    "MMMM Do YYYY, h a"
                  )}`}</Text>
                </View>
              </View>
            </Image>
            <View style={styles.questionContent}>
              <View style={styles.questionTextForm}>
                <Image
                  source={require("./../../../../images/message_tail.png")}
                  style={styles.messageTail}
                />
                <Text style={styles.questionFormText}>{question.question}</Text>
              </View>
              {this.renderPhoto()}
            </View>
            {this.renderComments()}
          </View>
        </ScrollView>
        {this.renderActionBox()}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  question: state.where.selectedQuestion,
  showQuestion: state.where.showQuestion,
  showLoader: state.where.showCommentLoader,
  comments: state.where.comments,
  questionsAddedLocations: state.where.questionsAddedLocations,
  showReceivedCommentNotification: state.where.showReceivedCommentNotification,
  productToShare: state.where.productToShare,
  shouldShowCommentBox: state.where.showCommentBox
});

const mapDispatchToProps = {
  closeQuestion,
  sendComment,
  sendReply,
  fetchComments,
  showLocationChooser,
  clearQuestionLocation,
  subscribeToQuestionCommentsUpdate,
  unsubscribeToQuestionCommentsUpdate,
  clearReceivedCommentNotification,
  showProductChooser,
  clearProductToShare,
  showCommentBox,
  hideCommentBox
};

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Question);
