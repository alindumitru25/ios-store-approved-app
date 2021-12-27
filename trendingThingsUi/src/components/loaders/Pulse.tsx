import * as React from 'react';
import {Animated, StyleSheet, Easing, View} from 'react-native';

let styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    pulse: {
        backgroundColor: '#48aefc',
        opacity: 0.8
    }
});

class Pulse extends React.Component<Props, State> {
    active: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            animatedSize: new Animated.Value(0)
        };
    }

    componentDidMount(): void {
        this.pulse();
        this.active = true;
    }

    componentWillUnmount(): void {
        this.active = false;
    }

    pulse(): void {
        Animated.sequence([
            Animated.timing(
                this.state.animatedSize,
                {
                    toValue: this.props.size,
                    duration: this.props.speed,
                    easing: Easing.linear
                }
            )
        ]).start(() => {
            if (this.active) {
                this.setState({
                    animatedSize: new Animated.Value(0)
                });
                this.pulse();
            }
        });
    }

    render() {
        return (
            <View style={[styles.container, {height: this.props.size}, this.props.styles]}>
                <Animated.View style={[styles.pulse, {borderRadius: this.state.animatedSize,
                     width: this.state.animatedSize, height: this.state.animatedSize}]}/>
            </View>
        )
    }
}

interface Props {
    size: number,
    speed: number,
    styles?: Object
}

interface State {
    animatedSize: any
}

export default Pulse;