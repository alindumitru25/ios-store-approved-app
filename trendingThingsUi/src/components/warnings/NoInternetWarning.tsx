import * as React from "react";
import { View, Text, NetInfo, TouchableHighlight } from "react-native";
import { getReactionsCount } from "trending/post/postSelectors";
import { connect } from "react-redux";
import { setHideNoInternetWarning } from "./../../actions/AppActions";
import { locale } from "./../../language/locale";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface State {
  showWarning: boolean;
}

interface StoreProps {
  hideNoInternetWarning: boolean;
  language: string;
}

interface DispatchProps {
  setHideNoInternetWarning: (hide: boolean) => void;
}

interface Props {}

type ClassProps = StoreProps & DispatchProps & Props;

class NoInternetWarning extends React.Component<ClassProps, State> {
  state = {
    showWarning: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = (isConnected: boolean) => {
    this.setState({
      showWarning: !isConnected
    });

    if (!isConnected) {
      this.props.setHideNoInternetWarning(false);
    }
  };

  render() {
    if (this.state.showWarning && !this.props.hideNoInternetWarning) {
      return (
        <View style={styles.absoluteWarning}>
          <Text style={styles.warningText}>
            {locale[this.props.language]["no.internet"]}
          </Text>
          <TouchableHighlight
            style={styles.absoluteClose}
            hitSlop={{ top: 5, right: 5, left: 5, bottom: 5 }}
            onPress={() => {
              this.props.setHideNoInternetWarning(true);
            }}
          >
            <Ionicons name="md-close" size={29} color="white" />
          </TouchableHighlight>
        </View>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: any) => ({
  hideNoInternetWarning: state.app.hideNoInternetWarning,
  language: state.app.language
});

const mapDispatchToProps = {
  setHideNoInternetWarning
};

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(NoInternetWarning);
