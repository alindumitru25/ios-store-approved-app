import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions
} from "react-native";
import LoginPanel from "./LoginPanel";
import RegisterPanel from "./RegisterPanel";
import ForgottenPassword from "./ForgottenPassword";
import DropdownAlert from "react-native-dropdownalert";
import {
  setDropdownRef,
  getPredefinedLocations
} from "./../../actions/actions";
import { locale } from "./../../language/locale";

var width = Dimensions.get("window").width; //full width

let styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  registerButton: {
    width: 110,
    height: 32,
    borderRadius: 3,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  registerButtonText: {
    color: "white",
    backgroundColor: "transparent",
    fontWeight: "bold",
    fontSize: 15
  },
  logo: {
    marginTop: 100,
    width: 60,
    height: 60
  },
  loadingAbs: {
    position: "absolute",
    left: "50%",
    top: 50
  },
  loginText: {
    fontSize: 17,
    color: "white",
    marginBottom: 8
  }
});

class LandingPage extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);
    this.state = {
      login: true,
      forgottenPass: false
    };
  }

  componentDidMount() {
    this.props.getPredefinedLocations();
  }

  renderForgottenPassScreen() {
    return (
      <ForgottenPassword
        onCancel={() => {
          this.setState({
            forgottenPass: false
          });
        }}
      />
    );
  }

  renderLogin() {
    return (
      <LoginPanel
        onRegister={() => {
          this.setState({
            login: false
          });
        }}
        onForgottenPass={() => {
          this.setState({
            forgottenPass: true
          });
        }}
      />
    );
  }

  renderRegister() {
    return (
      <RegisterPanel
        onLogin={() => {
          this.setState({
            login: true
          });
        }}
      />
    );
  }

  renderContent() {
    return (
      <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
        {this.state.forgottenPass
          ? this.renderForgottenPassScreen()
          : this.state.login ? this.renderLogin() : this.renderRegister()}
      </View>
    );
  }

  render() {
    return (
      <Image
        source={require("./../../../images/landing_page.png")}
        style={styles.container}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.props.auth.loading ? (
            <ActivityIndicator style={styles.loadingAbs} color="white" />
          ) : null}
          {this.renderContent()}
        </View>
        <DropdownAlert
          updateStatusBar={false}
          closeInterval={4000}
          ref={(ref: any) => {
            if (!this.props.auth.dropdownRef) {
              this.props.setDropdownRef(ref);
            }
          }}
          onClose={() => {}}
        />
      </Image>
    );
  }
}

interface Props {}

interface State {
  login: boolean;
  forgottenPass: boolean;
}

interface DispatchProps {
  setDropdownRef: (ref: any) => void;
  getPredefinedLocations: () => void;
}

interface StateProps {
  auth: any;
  language: string;
}

type ClassProps = Props & StateProps & DispatchProps;

function mapStateToProps(state: any) {
  return {
    auth: state.authentication,
    language: state.app.language
  };
}

const mapDispatchToProps = {
  setDropdownRef,
  getPredefinedLocations
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
