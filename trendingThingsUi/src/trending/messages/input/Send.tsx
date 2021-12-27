import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import styles from "./../styles";

interface Props {
  text: string;
  onSend: (data: any, cond: boolean) => void;
  label: string;
  containerStyle: any;
  textStyle: any;
}

const styling = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: "flex-end"
  }
});

export default class Send extends React.Component<any, {}> {
  private static defaultProps: Partial<Props> = {
    text: "",
    onSend: () => {},
    label: "Send",
    containerStyle: {},
    textStyle: {}
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.text.trim().length === 0 && nextProps.text.trim().length > 0 || this.props.text.trim().length > 0 && nextProps.text.trim().length === 0) {
  //     return true;
  //   }
  //   return false;
  // }
  render() {
    if (this.props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={[styling.container, this.props.containerStyle]}
          onPress={() => {
            this.props.onSend({ text: this.props.text.trim() }, true);
          }}
          accessibilityTraits="button"
        >
          <View>
            {this.props.children || (
              <Icon name="paper-plane" style={styles.sendIcon} size={17} />
            )}
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={[styling.container, this.props.containerStyle]}
        onPress={() => {}}
        accessibilityTraits="button"
      >
        <View>
          {this.props.children || (
            <Icon
              name="paper-plane"
              style={styles.sendIconInactive}
              size={17}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
