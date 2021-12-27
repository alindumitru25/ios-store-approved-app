import * as React from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import { sendResetEmail, resetPassword } from "./../../actions/actions";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { validatePassword } from "./../../utils/Utils";
import { styles } from "./styles";
import { locale } from "./../../language/locale";

type ClassProps = Props & StoreProps & DispatchProps;

const width = Dimensions.get("window").width; //full width

const ErrorIcon = () => (
  <Icon name="exclamation" color="red" style={styles.errorIcon} />
);

class ForgottenPassword extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);
    this.state = {
      email: null,
      emailError: false,
      reset: false,
      token: null,
      tokenError: false,
      newPassword: null,
      newPasswordError: false,
      confirmNewPassword: null,
      confirmNewPasswordError: false
    };

    this.resetEmail = this.resetEmail.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetEmail() {
    if (!this.state.email) {
      this.setState({
        emailError: true
      });
    } else {
      this.setState({
        emailError: false
      });
      Keyboard.dismiss();
      this.props.dispatch(
        sendResetEmail(this.state.email, () => {
          this.setState({
            reset: true
          });
        })
      );
    }
  }

  resetPassword() {
    if (!this.state.token) {
      this.setState({
        tokenError: true
      });

      return;
    } else if (!this.state.newPassword || !this.state.confirmNewPassword) {
      this.setState({
        tokenError: false,
        newPasswordError: true,
        confirmNewPasswordError: true
      });

      return;
    } else if (
      this.state.newPassword !== this.state.confirmNewPassword ||
      !validatePassword(this.state.newPassword)
    ) {
      this.setState({
        newPasswordError: true,
        confirmNewPasswordError: true
      });
      if (this.state.newPassword !== this.state.confirmNewPassword) {
        this.props.dropdownRef.alertWithType(
          "error",
          "Error",
          locale[this.props.language]["error.passwords.dont.match"]
        );
      } else {
        this.props.dropdownRef.alertWithType(
          "error",
          "Error",
          locale[this.props.language]["error.password.compl"]
        );
      }

      return;
    }

    this.setState({
      tokenError: false,
      newPasswordError: false,
      confirmNewPasswordError: false
    });

    this.props.dispatch(
      resetPassword(this.state.token, this.state.newPassword, () => {
        this.props.onCancel();
      })
    );
  }

  renderInputs() {
    if (this.state.reset) {
      return (
        <View style={styles.loginPanel}>
          <View style={styles.input}>
            <TextInput
              placeholder={locale[this.props.language]["insert.temp.token"]}
              placeholderTextColor="black"
              value={this.state.token}
              onChangeText={text => {
                this.setState({
                  token: text
                });
              }}
              style={[styles.inputText]}
            />
            {this.state.tokenError ? <ErrorIcon /> : null}
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder={locale[this.props.language]["type.new.password"]}
              placeholderTextColor="black"
              secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText={text => {
                this.setState({
                  newPassword: text
                });
              }}
              style={[styles.inputText]}
            />
            {this.state.newPasswordError ? <ErrorIcon /> : null}
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder={locale[this.props.language]["retype.new.password"]}
              placeholderTextColor="black"
              secureTextEntry={true}
              value={this.state.confirmNewPassword}
              onChangeText={text => {
                this.setState({
                  confirmNewPassword: text
                });
              }}
              style={[styles.inputText]}
            />
            {this.state.confirmNewPasswordError ? <ErrorIcon /> : null}
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={this.resetPassword}>
              <View style={[styles.button, { width: 180 }]}>
                <Text style={styles.buttonText}>
                  {locale[this.props.language]["reset.password"]}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  reset: false
                });
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {locale[this.props.language]["general.back"]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.loginPanel}>
        <View style={styles.input}>
          <TextInput
            placeholder={locale[this.props.language]["type.your.email"]}
            placeholderTextColor="black"
            autoCapitalize="none"
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={text => {
              this.setState({
                email: text
              });
            }}
            style={[styles.inputText]}
          />
          {this.state.emailError ? <ErrorIcon /> : null}
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View>
            <TouchableOpacity onPress={this.resetEmail}>
              <View style={[styles.button, { width: 230 }]}>
                <Text style={styles.buttonText}>
                  {locale[this.props.language]["send.reset.email"]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.props.onCancel()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {locale[this.props.language]["general.back"]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={styles.loginWrapper}
      >
        <View style={styles.loginWrapper}>
          <View style={styles.paddedWrapper}>
            <View style={{ width: "90%", backgroundColor: "transparent" }}>
              <Text style={styles.title}>
                {locale[this.props.language]["reset.passwod"]}
              </Text>
            </View>
            {this.renderInputs()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export interface Props {
  onCancel: () => void;
}

export interface State {
  email: string;
  emailError: boolean;
  reset: boolean;
  token: string;
  tokenError: boolean;
  newPassword: string;
  newPasswordError: boolean;
  confirmNewPassword: string;
  confirmNewPasswordError: boolean;
}

export interface StoreProps {
  auth: any;
  dropdownRef: any;
  language: any;
}

export interface DispatchProps {
  dispatch: any;
}

function mapStateToProps(state: any): StoreProps {
  return {
    auth: state.authentication,
    dropdownRef: state.authentication.dropdownRef,
    language: state.app.language
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
)(ForgottenPassword);
