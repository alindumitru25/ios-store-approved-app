import * as React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { View, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface StateProps {
    show: boolean;
}

const Loading = ({ show }: StateProps) => (
    show
    ? <View style={styles.loadingContainer}>
        <ActivityIndicator />
    </View>
    : null
);

const mapStateToProps = (state: any) => ({
    show: state.where.loading,
});

export default connect<StateProps, {}, {}>(mapStateToProps)(Loading);
