import * as React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { values } from "lodash";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import PostReply from "./PostReply";
import styles from "./styles";
import { locale } from "./../../language/locale";

interface StateProps {
  replies: any;
  language: string;
}

interface Props {
  documentId: any;
  comment: any;
  scrollToReply: (posY: number, height: number) => void;
}

interface DispatchProps {}

interface State {
  showReplies: boolean;
}

type ClassProps = StateProps & Props & DispatchProps;

class PostReplies extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);
    this.state = {
      showReplies: false
    };
  }

  render() {
    const { replies, comment, scrollToReply }: ClassProps = this.props;
    if (
      !replies ||
      isEmpty(replies) ||
      !comment.replies ||
      isEmpty(comment.replies)
    ) {
      return null;
    }

    if (!this.state.showReplies) {
      return (
        <View style={styles.repliesToggleShow}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.setState({ showReplies: true })}
          >
            <Text style={styles.repliesToggleShowText}>
              {locale[this.props.language]["show.replies"]}
            </Text>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <View style={styles.repliesWrapper}>
        {comment.replies.map((replyId: any) => (
          <PostReply
            key={replyId}
            scrollToReply={scrollToReply}
            reply={replies[replyId]}
            commentId={comment.id}
          />
        ))}
        <View style={styles.repliesToggleShow}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.setState({ showReplies: false })}
          >
            <Text style={styles.repliesToggleShowText}>
              {locale[this.props.language]["hide.replies"]}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {};
const mapStateToProps = (state: any, ownProps: Props) => ({
  replies: state.applicationData.replies ? state.applicationData.replies : null,
  language: state.app.language
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(PostReplies);
