import * as React from 'react';
import {
  Text,
  View,
  StatusBar
} from 'react-native';
import common from './../../styles/CommonStyles';

class WhitePage extends React.Component<Props, {}> {
    render() {
        return <View style={common.white_page_container}>
            <StatusBar barStyle='default' />
            <View style={[common.white_page_bar, common.white_page_topBar]}>
                <View style={common.white_page_bottomBar_action}>
                    {this.props.topLeftAction ? this.props.topLeftAction : null}
                </View>
                <View style={common.white_page_bottomBar_action}>
                    <Text style={common.pageTitle}>{this.props.title}</Text>
                </View>
                <View style={common.white_page_bottomBar_action}>
                    {this.props.topRightAction ? this.props.topRightAction : null}
                </View>
            </View>
            <View style={common.white_page_content}>
                {this.props.children}
            </View>
            <View style={[common.white_page_bar, common.white_page_bottomBar]} >
                <View style={common.white_page_bottomBar_action}>
                    {this.props.leftAction ? this.props.leftAction : null}
                </View>
                <View style={common.white_page_bottomBar_action}>
                    {this.props.centerAction ? this.props.centerAction : null}
                </View>
                <View style={common.white_page_bottomBar_action}>
                    {this.props.rightAction ? this.props.rightAction : null}
                </View>
            </View>
        </View>
    }
}

interface Props {
    title: string,
    leftAction?: JSX.Element,
    centerAction?: JSX.Element,
    rightAction?: JSX.Element,
    topRightAction?: JSX.Element,
    topLeftAction?: JSX.Element
}

export default WhitePage;
