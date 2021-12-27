import * as React from "react";
import { connect } from "react-redux";
import { isEmpty, forEach } from "lodash";

import common from "./../../../styles/CommonStyles";
import { GLOBAL_URL } from "./../../../utils/Globals";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import {
  openQuestion,
  likeQuestion,
  dislikeQuestion
} from "./../../../actions/WhereActions";
import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableHighlight
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { values } from "lodash";

interface StateProps {
  questions: any;
  userId: number;
}

interface DispatchProps {
  openQuestion: (questionId: number) => void;
  likeQuestion: (questionId: number) => void;
  dislikeQuestion: (questionId: number) => void;
}

interface QuestionProps {
  question: any;
}

type QuestionClassProps = QuestionProps & DispatchProps & StateProps;
type ClassProps = StateProps & DispatchProps;

const Question = ({
  question,
  openQuestion,
  likeQuestion,
  dislikeQuestion,
  userId
}: any) => {
  const isLiked = question.likesUsers && question.likesUsers[userId];
  return (
    <View style={styles.questionWrapper}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => openQuestion(question)}
      >
        <View>
          <View style={styles.questionLabel}>
            <View style={styles.user_avatar_container}>
              <View style={styles.user_avatar_wrapper}>
                <FastImage
                  source={{
                    uri: `${GLOBAL_URL}/user/avatar/${question.userId}`,
                    priority: FastImage.priority.normal
                  }}
                  style={styles.user_avatar}
                />
              </View>
            </View>
            <View style={styles.questionRight}>
              <Text style={styles.questionText}>{question.question}</Text>
              <View style={styles.questionStatistic}>
                <View style={styles.dot}>
                  <Text style={styles.dotText}>0</Text>
                </View>
                <Text style={styles.likeCount}>răspunsuri</Text>
                <View style={styles.questionLikesWrapper}>
                  <FontAwesome name="thumbs-up" size={9} color="white" />
                </View>
                <View>
                  <Text style={styles.likeCount}>
                    {question.likesCount ? question.likesCount : 0}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              style={styles.commentIcon}
              onPress={() =>
                isLiked
                  ? dislikeQuestion(question.id)
                  : likeQuestion(question.id)
              }
            >
              <FontAwesome
                name="thumbs-o-up"
                size={16}
                color={isLiked ? "#12cde8" : "#464646"}
              />
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const Questions = (props: ClassProps) => {
  if (isEmpty(props.questions)) {
    return (
      <Text
        style={[styles.questionsTitle, { fontSize: 16, fontWeight: "300" }]}
      >
        No questions yet.
      </Text>
    );
  }

  const arrQuestions = values(props.questions);
  return (
    <View style={styles.questionsContainer}>
      <FlatList
        style={{ maxHeight: "100%" }}
        data={arrQuestions}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <Question {...props} question={item} />}
      />
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  questions: state.where.questions,
  userId: state.applicationData ? state.applicationData.userId : null
});

const mapDispatchToProps = {
  openQuestion,
  likeQuestion,
  dislikeQuestion
};

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Questions);
