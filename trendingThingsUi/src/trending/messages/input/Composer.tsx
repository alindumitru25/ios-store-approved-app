import React from "react";
import { Platform, StyleSheet, TextInput } from "react-native";

import styles from "./../styles";

const stylying = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3
    })
  }
});

interface Props {
  composerHeight: number;
  text: string;
  placeholder: string;
  placeholderTextColor: string;
  textInputProps: object;
  onTextChanged: (contentSize: any) => void;
  onInputSizeChanged: (contentSize: any) => void;
  multiline: boolean;
  textInputStyle: any;
  textInputAutoFocus: boolean;
}

export default class Composer extends React.Component<any, {}> {
  private static defaultProps: Partial<Props> = {
    composerHeight: Platform.select({
      ios: 33,
      android: 41
    }),
    text: "",
    placeholderTextColor: "#3a3a3a",
    textInputProps: null,
    multiline: true,
    textInputStyle: styles.composerTextInput,
    textInputAutoFocus: false,
    onTextChanged: () => {},
    onInputSizeChanged: () => {}
  };

  private contentSize: any;

  onContentSizeChange(e: any) {
    const contentSize = e.nativeEvent.contentSize;

    // Support earlier versions of React Native on Android.
    if (!contentSize) return;

    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
    }
  }

  onChangeText(text: string) {
    this.props.onTextChanged(text);
  }

  render() {
    return (
      <TextInput
        placeholder="Aa..."
        placeholderTextColor={this.props.placeholderTextColor}
        multiline={this.props.multiline}
        onChange={e => this.onContentSizeChange(e)}
        onContentSizeChange={e => this.onContentSizeChange(e)}
        onChangeText={text => this.onChangeText(text)}
        style={[
          stylying.textInput,
          styles.composerTextInput,
          { height: this.props.composerHeight }
        ]}
        autoFocus={this.props.textInputAutoFocus}
        value={this.props.text}
        accessibilityLabel={this.props.text || this.props.placeholder}
        enablesReturnKeyAutomatically
        underlineColorAndroid="transparent"
        {...this.props.textInputProps}
      />
    );
  }
}
