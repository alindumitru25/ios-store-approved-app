import * as React from 'react';
import {Animated, StyleSheet, Easing, View} from 'react-native';

let styles = StyleSheet.create({
    outerDot: {
        backgroundColor: 'rgba(40, 40, 40, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerDot: {
        backgroundColor: 'rgba(40, 40, 40, 0.9)'
    }
});

class AnimatedDot extends React.Component<Props, State> {
    active: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            animatedSize: new Animated.Value(0)
        };
    }

    componentDidMount(): void {
        this.animate();
        this.active = true;
    }

    componentWillUnmount(): void {
        this.active = false;
    }

    animate(): void {
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
                    animatedSize: new Animated.Value(this.props.size - 10)
                });
                this.animate();
            }
        });
    }

    render() {
        const SMALL = this.props.size - 10;
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', width: this.props.size, height: this.props.size}}>
                <Animated.View style={[styles.outerDot, this.props.styles, {borderRadius: this.state.animatedSize,
                        width: this.state.animatedSize, height: this.state.animatedSize}]}>
                    <View style={[styles.innerDot, {height: SMALL, width: SMALL, borderRadius: SMALL}]} />
                </Animated.View>
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

export default AnimatedDot;