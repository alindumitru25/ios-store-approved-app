import React from 'react';
import {TouchableWithoutFeedback, Keyboard, View, TextInput} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import common from './../../styles/CommonStyles';

const NumericKeyboardInput = (props: any) => {
    return <View style={[common.white_input_wrapper, {paddingRight: 10}]}>
        <TextInput placeholderTextColor='#464646' onChangeText={props.onChangeText}
            placeholder={props.placeHolder} value={props.value} keyboardType='numeric' style={common.white_input} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{padding: 25}}>
            <AwesomeIcon name='keyboard-o' size={17} color='#464646' />
        </TouchableWithoutFeedback>
    </View>;
}

export default NumericKeyboardInput;