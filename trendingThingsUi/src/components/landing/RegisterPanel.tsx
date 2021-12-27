import * as React from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Picker,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { createUserAction } from "./../../actions/actions";
import { validateEmail, validatePassword } from "./../../utils/Utils";
import IonicIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { map, find } from "lodash";
import { styles } from "./styles";
import { locale } from "./../../language/locale";

const ErrorIcon = () => (
  <Icon name="exclamation" color="red" style={styles.errorIcon} />
);

interface Props {
  onLogin: () => void;
}

interface State {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  passwordInput: string;
  passwordError: boolean;
  emailError: boolean;
  firstNameError: boolean;
  lastNameError: boolean;
  triggerValidation: boolean;
  showLocationChooser: boolean;
  location: any;
}

interface StoreProps {
  registerErrorMessage: boolean;
  predefinedLocations: any;
  language: any;
}

interface DispatchProps {
  dispatch: any;
}

type ClassProps = Props & StoreProps & DispatchProps;

class RegisterPanel extends React.Component<ClassProps, State> {
  private dropdown: any;

  constructor(props: ClassProps) {
    super(props);
    this.state = {
      firstNameInput: null,
      lastNameInput: null,
      emailInput: null,
      passwordInput: null,
      emailError: false,
      passwordError: false,
      firstNameError: false,
      lastNameError: false,
      triggerValidation: false, // trigger validation after pressing register 1st time
      showLocationChooser: false,
      location: null
    };

    this.validate = this.validate.bind(this);
  }

  validate(submit = false) {
    if (!this.state.triggerValidation) {
      return;
    }

    let invalid = false;
    if (!validateEmail(this.state.emailInput)) {
      invalid = true;
      this.setState({
        emailError: true
      });
    } else {
      this.setState({
        emailError: false
      });
    }

    if (!validatePassword(this.state.passwordInput)) {
      invalid = true;
      this.setState({
        passwordError: true
      });
    } else {
      this.setState({
        passwordError: false
      });
    }

    if (!this.state.firstNameInput) {
      invalid = true;
      this.setState({
        firstNameError: true
      });
    } else {
      this.setState({
        firstNameError: false
      });
    }

    if (!this.state.lastNameInput) {
      invalid = true;
      this.setState({
        lastNameError: true
      });
    } else {
      this.setState({
        lastNameError: false
      });
    }

    if (!invalid && submit) {
      this.props.dispatch(
        createUserAction(
          this.state.firstNameInput,
          this.state.lastNameInput,
          this.state.emailInput,
          this.state.passwordInput,
          this.state.location,
          () => {
            this.props.onLogin();
          }
        )
      );
    }
  }

  renderActionButtons() {
    return (
      <View style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          {this.state.showLocationChooser ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showLocationChooser: false
                });
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>OK</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    triggerValidation: true
                  },
                  () => {
                    this.validate(true);
                  }
                );
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {locale[this.props.language]["register.text"]}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 15,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={this.props.onLogin}>
            <View style={[styles.button, { width: 210 }]}>
              <Text style={styles.buttonText}>
                {locale[this.props.language]["register.back.text"]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderLocationChooser() {
    if (this.state.showLocationChooser) {
      return (
        <View style={[styles.inputPicker]}>
          <IonicIcon
            name="ios-arrow-round-down-outline"
            color="#464646"
            style={styles.pickerIcon}
          />
          <Picker
            itemStyle={styles.pickerItem}
            selectedValue={this.state.location}
            onValueChange={(value: number) => {
              this.setState({ location: value }, () => {
                this.validate();
              });
            }}
          >
            <Picker.Item
              label={locale[this.props.language]["pick.location.descr"]}
              value={null}
            />
            {map(this.props.predefinedLocations, (location: any) => (
              <Picker.Item
                key={location.id}
                label={location.name}
                value={location.id}
              />
            ))}
          </Picker>
        </View>
      );
    }
  }

  renderLocationInput() {
    return (
      <View>
        <View style={[styles.input]}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ showLocationChooser: true }, () => {
                this.validate();
              });
            }}
          >
            <Text style={styles.text}>
              {this.state.location === null
                ? locale[this.props.language]["choose.location.text"]
                : find(
                    this.props.predefinedLocations,
                    (loc: any) => loc.id === this.state.location
                  ).name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderPasswordError() {
    if (!this.state.passwordError) {
      return null;
    }

    return <ErrorIcon />;
  }

  renderPasswordInput() {
    return (
      <View>
        <Text style={styles.textInfo}>
          {locale[this.props.language]["password.length.text"]}
        </Text>
        <View style={[styles.input]}>
          <TextInput
            placeholderTextColor="black"
            placeholder={locale[this.props.language]["type.password"]}
            secureTextEntry={true}
            value={this.state.passwordInput}
            onChangeText={(text: any) => {
              this.setState(
                {
                  passwordInput: text
                },
                () => {
                  this.validate();
                }
              );
            }}
            style={styles.inputText}
          />
          {this.renderPasswordError()}
        </View>
      </View>
    );
  }

  renderEmailError() {
    if (!this.state.emailError) {
      return null;
    }

    return <ErrorIcon />;
  }

  renderEmailInput() {
    return (
      <View style={[styles.input]}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="black"
          value={this.state.emailInput}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text: string) => {
            this.setState(
              {
                emailInput: text
              },
              () => {
                this.validate();
              }
            );
          }}
          style={styles.inputText}
        />
        {this.renderEmailError()}
      </View>
    );
  }

  renderLastNameError() {
    if (!this.state.lastNameError) {
      return null;
    }

    return <ErrorIcon />;
  }

  renderLastNameInput() {
    return (
      <View style={[styles.input]}>
        <TextInput
          placeholder={locale[this.props.language]["family.name"]}
          placeholderTextColor="black"
          value={this.state.lastNameInput}
          onChangeText={(text: string) => {
            this.setState(
              {
                lastNameInput: text
              },
              () => {
                this.validate();
              }
            );
          }}
          style={styles.inputText}
        />
        {this.renderLastNameError()}
      </View>
    );
  }

  renderFirstNameError() {
    if (!this.state.firstNameError) {
      return null;
    }

    return <ErrorIcon />;
  }

  renderFirstNameInput() {
    return (
      <View style={[styles.input]}>
        <TextInput
          placeholder={locale[this.props.language]["name"]}
          placeholderTextColor="black"
          value={this.state.firstNameInput}
          onChangeText={(text: string) => {
            this.setState(
              {
                firstNameInput: text
              },
              () => {
                this.validate();
              }
            );
          }}
          style={styles.inputText}
        />
        {this.renderFirstNameError()}
      </View>
    );
  }

  renderContent() {
    if (this.state.showLocationChooser) {
      return (
        <View>
          {this.renderLocationChooser()}
          {this.renderActionButtons()}
        </View>
      );
    }

    return (
      <View>
        {this.renderFirstNameInput()}
        {this.renderLastNameInput()}
        {this.renderEmailInput()}
        {this.renderPasswordInput()}
        {this.renderLocationInput()}
        {this.renderActionButtons()}
      </View>
    );
  }

  renderInputs() {
    return <View style={{ width: "100%" }}>{this.renderContent()}</View>;
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.registerWrapper}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={styles.registerWrapper}
        >
          <View style={styles.registerWrapper}>
            <View style={{ width: "90%" }}>
              <View style={{ backgroundColor: "transparent" }}>
                <Text style={[styles.title, { marginBottom: 15 }]}>
                  {this.state.showLocationChooser
                    ? locale[this.props.language]["chose.location.title"]
                    : locale[this.props.language]["register.title"]}
                </Text>
              </View>
              {this.renderInputs()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const mapStateToProps = (state: any) => ({
  registerErrorMessage: state.authentication.registerErrorMessage,
  predefinedLocations: state.applicationData.predefinedLocations,
  language: state.app.language
});

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPanel);
