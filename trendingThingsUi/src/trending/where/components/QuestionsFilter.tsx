import * as React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableHighlight } from "react-native";

import styles from "./styles";
import { setQuestionsFilter } from "./../../../actions/WhereActions";
import { QuestionsFilterEnum } from "./../../../utils/enums/Enums";

interface StateProps {
  filter: any;
}

interface DispatchProps {
  setQuestionsFilter: (type: any) => void;
}

type ClassProps = StateProps & DispatchProps;

const QuestionsFilter = ({ filter, setQuestionsFilter }: ClassProps) => (
  <View style={styles.filterWrapper}>
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => setQuestionsFilter(QuestionsFilterEnum.TRENDING)}
    >
      <Text
        style={
          filter === QuestionsFilterEnum.TRENDING
            ? styles.filterTextSelected
            : styles.filterText
        }
      >
        Trending
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => setQuestionsFilter(QuestionsFilterEnum.NEW)}
    >
      <Text
        style={
          filter === QuestionsFilterEnum.NEW
            ? styles.filterTextSelected
            : styles.filterText
        }
      >
        New
      </Text>
    </TouchableHighlight>
  </View>
);

const mapStateToProps = (state: any) => ({
  filter: state.where.questionsFilter
});

const mapDispatchToProps = {
  setQuestionsFilter
};

export default connect<StateProps, {}, {}>(mapStateToProps, mapDispatchToProps)(
  QuestionsFilter
);
