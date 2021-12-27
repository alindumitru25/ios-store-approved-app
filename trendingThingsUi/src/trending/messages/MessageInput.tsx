import React from "react";
import { StyleSheet, View, Keyboard, Dimensions } from "react-native";

import Composer from "./input/Composer";
import Send from "./input/Send";
import { Actions } from "react-native-gifted-chat";

import styles from "./styles";

const stylying = StyleSheet.create({
  primary: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  accessory: {
    height: 44
  }
});

interface Props {
  renderAccessory: (props: any) => void;
  renderActions: (props: any) => void;
  renderSend: (props: any) => void;
  renderComposer: (props: any) => void;
  onPressActionButton: () => void;
  containerStyle: any;
  primaryStyle: any;
  accessoryStyle: any;
}

interface State {
  position: string;
}

export default class InputToolbar extends React.Component<any, State> {
  public static defaultProps: Partial<Props> = {
    renderAccessory: null,
    renderActions: null,
    renderSend: null,
    renderComposer: null,
    containerStyle: {},
    primaryStyle: {},
    accessoryStyle: {}
  };

  private keyboardWillShowListener: any;
  private keyboardWillHideListener: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      position: "absolute"
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow = () => {
    this.setState({
      position: "relative"
    });
  };

  _keyboardWillHide = () => {
    this.setState({
      position: "absolute"
    });
  };

  /*renderActions() {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    } else if (this.props.onPressActionButton) {
      return <Actions {...this.props} />;
    }
    return null;
  }*/

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props} />;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return <Composer {...this.props} />;
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[stylying.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  renderActions() {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    } else if (this.props.onPressActionButton) {
      return <Actions {...this.props} />;
    }
    return null;
  }

  render() {
    return (
      <View
        style={[
          { width: "100%", padding: 5, bottom: 0 },
          this.props.containerStyle,
          { position: this.state.position }
        ]}
      >
        <View style={[styles.messageInputContainer]}>
          <View style={[stylying.primary, this.props.primaryStyle]}>
            {this.renderActions()}
            {this.renderComposer()}
            {this.renderSend()}
          </View>
          {this.renderAccessory()}
        </View>
      </View>
    );
  }
}
