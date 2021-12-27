import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight
} from "react-native";
import { GLOBAL_URL } from "./../../utils/Globals";
import Icon from "react-native-vector-icons/FontAwesome";
import CommonStyles from "./../../styles/CommonStyles";

interface Props {
  onPress?: () => void;
  userId?: number;
  hasBorder?: boolean;
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 30,
    height: 30,
    borderRadius: 32,
    overflow: "hidden"
  },
  border: {
    borderWidth: 1,
    borderColor: "white"
  },
  image: {
    width: 28,
    height: 28,
    resizeMode: "cover"
  }
});

class UserIcon extends React.Component<Props, {}> {
  public static defaultProps: Partial<Props> = {
    hasBorder: true
  };

  render() {
    return (
      <TouchableHighlight
        style={CommonStyles.touchable}
        underlayColor="transparent"
        onPress={this.props.onPress ? this.props.onPress : () => {}}
      >
        <View
          style={[
            styles.imageContainer,
            this.props.hasBorder ? styles.border : null
          ]}
        >
          <Image
            source={{
              uri: `${GLOBAL_URL}/user/avatar/${this.props.userId}`,
              cache: "force-cache"
            }}
            style={styles.image}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default UserIcon;
