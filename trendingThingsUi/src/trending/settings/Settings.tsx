import * as React from "react";
import ChangePassword from "./ChangePassword";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { logOutUser } from "./../../actions/actions";
import { locale } from "./../../language/locale";

import styles from "./styles";

interface Props {
  dispatch: any;
  isLoggedWithFacebook: boolean;
  language: string;
}

interface State {
  showChangePassword: boolean;
}

class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showChangePassword: false
    };
  }

  logOut() {
    this.props.dispatch(logOutUser());
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {locale[this.props.language]["settings.text"]}
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.showChangePassword) {
      return (
        <ChangePassword
          onClose={() => {
            this.setState({
              showChangePassword: false
            });
          }}
        />
      );
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderHeader()}
        <View style={styles.container}>
          {!this.props.isLoggedWithFacebook ? (
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showChangePassword: true
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}
                >
                  <Text style={{ fontSize: 16, marginLeft: 8 }}>
                    {locale[this.props.language]["change.password.text"]}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={{}}>
            <TouchableOpacity onPress={this.logOut}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}
              >
                <Text style={{ fontSize: 16, marginLeft: 8 }}>
                  {locale[this.props.language]["log.out.text"]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isLoggedWithFacebook: !!state.authentication.accessToken,
    language: state.app.language
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
