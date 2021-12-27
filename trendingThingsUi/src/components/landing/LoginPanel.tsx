import * as React from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import { loginUser, tryLoginWithFacebook } from "./../../actions/actions";
import { LoginButton } from "react-native-fbsdk";
import { styles } from "./styles";
import { locale } from "./../../language/locale";

type ClassProps = Props & StoreProps & DispatchProps;

class LoginPanel extends React.Component<ClassProps, State> {
  dropdown: any;

  constructor(props: ClassProps) {
    super(props);
    this.state = {
      usernameInput: null,
      passwordInput: null
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.onForgottenPass = this.onForgottenPass.bind(this);
  }

  onForgottenPass() {
    this.props.onForgottenPass();
  }

  handleLogin() {
    Keyboard.dismiss();
    this.props.dispatch(
      loginUser(this.state.usernameInput, this.state.passwordInput)
    );
  }

  renderActions() {
    return (
      <View style={styles.centerView}>
        <TouchableOpacity onPress={this.props.onRegister}>
          <View style={[styles.button, { width: 200 }]}>
            <Text style={{ color: "white", fontSize: 18 }}>
              {locale[this.props.language]["register.account"]}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 12, alignItems: "center" }}>
          <LoginButton
            readPermissions={["email", "public_profile", "user_location"]}
            onLoginFinished={(error: any, result: any) => {
              if (error) {
                if (this.props.dropdown) {
                  this.props.dropdown.alertWithType(
                    "error",
                    "",
                    "Login failed with error: " + error.message
                  );
                } else {
                  alert("Login failed with error: " + error.message);
                }
              } else {
                this.props.dispatch(tryLoginWithFacebook());
              }
            }}
            onLogoutFinished={() => {
              if (this.props.dropdown) {
                this.props.dropdown.alertWithType(
                  "success",
                  "",
                  "Logged out from facebook"
                );
              } else {
                alert("User logged out");
              }
            }}
          />
        </View>
        <TouchableOpacity
          onPress={this.onForgottenPass}
          hitSlop={{ top: 4, right: 4, left: 4, bottom: 4 }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 17,
              backgroundColor: "transparent",
              marginTop: 25
            }}
          >
            {locale[this.props.language]["reset.password"]}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderInputs() {
    return (
      <View style={styles.inputWrapper}>
        <View style={styles.input}>
          <TextInput
            placeholder={locale[this.props.language]["email"]}
            placeholderTextColor="black"
            value={this.state.usernameInput}
            onChangeText={text => {
              this.setState({
                usernameInput: text
              });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.inputText]}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder={locale[this.props.language]["password"]}
            placeholderTextColor="black"
            secureTextEntry={true}
            value={this.state.passwordInput}
            onChangeText={text => {
              this.setState({
                passwordInput: text
              });
            }}
            style={styles.inputText}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity onPress={this.handleLogin}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {locale[this.props.language]["log.in"]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={styles.loginPanel}
      >
        <View style={styles.loginWrapper}>
          <View style={styles.oneColumnCenter}>
            <Image
              source={require("./../../../images/logo.png")}
              style={styles.logo}
            />
          </View>

          <KeyboardAvoidingView
            style={styles.oneColumnCenter}
            behavior="padding"
            keyboardVerticalOffset={0}
          >
            <View style={{ backgroundColor: "transparent" }}>
              <Text style={styles.title}>
                {locale[this.props.language]["access.account"]}
              </Text>
            </View>
            {this.renderInputs()}
          </KeyboardAvoidingView>
          <View style={styles.oneColumnEnd}>{this.renderActions()}</View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export interface Props {
  onRegister: () => void;
  onForgottenPass: () => void;
}

export interface State {
  usernameInput: string;
  passwordInput: string;
}

export interface StoreProps {
  auth: any;
  language: any;
  dropdown: any;
}

export interface DispatchProps {
  dispatch: any;
}

function mapStateToProps(state: any): StoreProps {
  return {
    auth: state.authentication,
    language: state.app.language,
    dropdown: state.authentication.dropdownRef
  };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {
    dispatch
  };
}

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(LoginPanel);
