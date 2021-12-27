import * as React from 'react';
import {Animated, TouchableHighlight, Text, TextInput, Image, StyleSheet, View} from 'react-native';

class AnimatedPanel<T extends Props, Y extends State> extends React.Component<T, Y> {
    constructor(props: T) {
        super(props);
    }

    // deal with animation logic
    componentDidMount() {
        Animated.parallel([
            Animated.timing(
                this.state.animatedWidth,
                {
                    toValue: this.props.width,
                    duration: 1000
                }
            ),
            Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: this.props.height,
                    duration: 1000
                }
            )
        ]).start(() => {
                this.setState({
                    finishedAnimation: true
                })
            }
        );
    }
}

export interface Props {
    width: number,
    height: number
}

export interface State {
    animatedWidth: any,
    animatedHeight: any,
    finishedAnimation: boolean
}

export default AnimatedPanel;