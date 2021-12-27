import * as React from "react";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Spinner from "react-native-spinkit";
import { Text, View, TouchableHighlight, Image } from "react-native";
import { connect } from "react-redux";
import { toggleShowCreatePost } from "./../../actions/AppActions";

import styles from "./styles";

interface StateProps {
  barCode: any;
  location: any;
}

interface DispatchProps {
  toggleShowCreatePost: (show: boolean) => void;
}

interface Props {}

type ClassProps = StateProps & DispatchProps & Props;

const CreatePostSuggestion = ({ toggleShowCreatePost }: ClassProps) => (
  <View
    style={{
      alignItems: "center",
      flex: 1,
      width: "100%",
      justifyContent: "center"
    }}
  >
    <Text style={[styles.labelText, { textAlign: "center", fontSize: 19 }]}>
      Creează postare în câțiva pași simpli!
    </Text>
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        marginTop: 8,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <TouchableHighlight
        style={styles.blackButton}
        onPress={() => {}}
        underlayColor="transparent"
      >
        <View>
          <Text style={styles.blackButtonText}>Creeaza postare</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.blackButton, { marginLeft: 10 }]}
        onPress={() => toggleShowCreatePost(false)}
        underlayColor="transparent"
      >
        <View>
          <Text style={styles.blackButtonText}>Alta data</Text>
        </View>
      </TouchableHighlight>
    </View>
  </View>
);

const mapDispatchToProps = {
  toggleShowCreatePost
};

export default connect<StateProps, DispatchProps, Props>(
  null,
  mapDispatchToProps
)(CreatePostSuggestion);
