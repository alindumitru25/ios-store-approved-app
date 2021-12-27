import * as React from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    background: {
        height: 24,
        width: 280,
        borderRadius: 2,
        marginLeft: 10,
        backgroundColor: 'white',
        padding: 5,
        paddingLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        backgroundColor: 'transparent',
        fontWeight: '300',
        width: 18
    },
    searchInput: {
        fontSize: 13,
        flex: 1,
        letterSpacing: -1,
        marginTop: 2.5
    }
});

class SearchBar extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            searchInput: 'Search'
        };
    }

    render() {
        return (
            <View style={styles.background}>
                <Icon name='search' size={13} color='#464646' style={styles.icon} />
                <TextInput value={this.state.searchInput} onChangeText={text => {this.setState({
                        searchInput: text})}} style={styles.searchInput}/>
            </View>
        );
    }
}

interface State {
    searchInput: string
}

export default SearchBar;