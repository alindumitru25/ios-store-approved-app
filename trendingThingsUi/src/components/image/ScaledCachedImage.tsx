import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";

interface Props {
  onLoad?: (e: any) => void;
  defaultHeight: number;
  width: number;
  style: any;
  source: any;
}

interface State {
  width: number;
  height: number;
}

class ScaledCachedImage extends Component<Props, State> {
  state = {
    height: 0,
    width: 0
  };

  onLoad = (e: any) => {
    const { nativeEvent: { width, height } } = e;
    this.setState({ width, height });
    if (this.props.onLoad) this.props.onLoad(e);
  };

  getHeight = () => {
    if (!this.state.height) return this.props.defaultHeight;
    const ratio = this.state.height / this.state.width;
    const height = this.props.width * ratio;
    return height;
  };

  render() {
    const height = this.getHeight();
    return (
      <FastImage
        onLoad={this.onLoad}
        style={[{ width: this.props.width, height }, this.props.style]}
        source={this.props.source}
      />
    );
  }
}

export default ScaledCachedImage;
