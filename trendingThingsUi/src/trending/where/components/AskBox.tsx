import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableHighlight,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserIcon from "./../../../components/userIcon/UserIcon";
import {
  setQuestion,
  clearQuestion,
  submitQuestion,
  getMatchingProducts
} from "./../../../actions/WhereActions";
import { connect } from "react-redux";
import { GLOBAL_URL } from "./../../../utils/Globals";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import QuestionsFilter from "./QuestionsFilter";

// styles
import common from "./../../../styles/CommonStyles";
import styles from "./styles";

interface StateProps {
  userId: number;
  question: string;
}

interface Props {
  expandAsk: () => void;
  contractAsk: () => void;
  isExpanded: boolean;
}

interface DispatchProps {
  dispatch: any;
}

type ClassProps = Props & StateProps & DispatchProps;

let askRef: any;

const AskBox = ({
  expandAsk,
  question,
  contractAsk,
  isExpanded,
  userId,
  dispatch
}: ClassProps) => (
  <Image
    source={require("./../../../../images/search_bg.jpg")}
    style={isExpanded ? styles.askBoxContainerSmall : styles.askBoxContainer}
  >
    <View style={styles.askBox}>
      <TextInput
        value={question}
        style={styles.askBoxInput}
        onFocus={() => {
          dispatch(setQuestion("Unde găsesc "));
          expandAsk();
        }}
        onBlur={() => {
          dispatch(getMatchingProducts(question));
        }}
        onChangeText={(value: string) => {
          dispatch(setQuestion(value));
        }}
        ref={(elem: any) => {
          askRef = elem;
        }}
      />
      {isExpanded ? (
        <TouchableHighlight
          style={styles.askBoxIconClose}
          onPress={() => {
            contractAsk();
            dispatch(clearQuestion());
            Keyboard.dismiss();
            askRef.clear();
          }}
        >
          <Ionicons
            name="ios-arrow-round-back-outline"
            size={34}
            color="white"
          />
        </TouchableHighlight>
      ) : (
        <Ionicons
          name="ios-search"
          style={styles.searchIco}
          size={16}
          color="black"
        />
      )}
    </View>
    {!isExpanded ? <QuestionsFilter /> : undefined}
  </Image>
);

const mapStateToProps = (state: any) => ({
  userId: state.applicationData.userId,
  question: state.where.question
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  dispatch
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(AskBox);
