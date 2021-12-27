import * as React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { changePassword } from "./../../actions/AppActions";
import { locale } from "./../../language/locale";

import styles from "./styles";

interface Props {
  onClose: () => void;
}

interface State {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface StoreProps {
  language: string;
}

interface DispatchProps {
  dispatch: any;
}

type ClassProps = Props & StoreProps & DispatchProps;

class ChangePassword extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      oldPassword: null,
      newPassword: null,
      newPasswordConfirm: null
    };
  }

  renderHeader() {
    return (
      <View
        style={[
          styles.header,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }
        ]}
      >
        <Text style={styles.headerTitle}>
          {locale[this.props.language]["change.password.text"]}
        </Text>
        <TouchableOpacity onPress={() => this.props.onClose()}>
          <Icon name="arrow-left-circle" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        <View style={styles.containerStyle}>
          <View
            style={[
              {
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderRadius: 17,
                padding: 8
              }
            ]}
          >
            <TextInput
              placeholderTextColor="black"
              value={this.state.oldPassword}
              onChangeText={value => {
                this.setState({
                  oldPassword: value
                });
              }}
              placeholder={locale[this.props.language]["old.password.text"]}
              style={styles.textInputBlack}
              secureTextEntry={true}
            />
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={styles.textInputBlack}>
              {locale[this.props.language]["password.length.text"]}
            </Text>
            <View
              style={[
                {
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderRadius: 17,
                  padding: 8,
                  marginTop: 4
                }
              ]}
            >
              <TextInput
                placeholderTextColor="black"
                value={this.state.newPassword}
                onChangeText={value => {
                  this.setState({
                    newPassword: value
                  });
                }}
                placeholder={locale[this.props.language]["new.password.text"]}
                style={[styles.textInputBlack, { marginTop: 5 }]}
                secureTextEntry={true}
              />
            </View>
          </View>
          <View
            style={[
              {
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderRadius: 17,
                padding: 8,
                marginTop: 8
              }
            ]}
          >
            <TextInput
              placeholderTextColor="black"
              value={this.state.newPasswordConfirm}
              onChangeText={value => {
                this.setState({
                  newPasswordConfirm: value
                });
              }}
              placeholder={
                locale[this.props.language]["new.password.confirm.text"]
              }
              style={styles.textInputBlack}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              this.props.dispatch(
                changePassword(
                  this.state.oldPassword,
                  this.state.newPassword,
                  this.state.newPasswordConfirm,
                  () => {
                    this.props.onClose();
                  }
                )
              )
            }
          >
            <View style={styles.headerButton}>
              <Text style={styles.headerButtonText}>
                {locale[this.props.language]["change.text"]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    language: state.app.language
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch
  };
}

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
