import * as React from "react";
import { connect } from "react-redux";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { toggleActivationModal, activateUser } from "./../../actions/actions";

import styles from "./styles";
import { locale } from "./../../language/locale";

interface StateProps {
  showActivationModal: boolean;
  activationUrl: string;
  language: any;
}

interface Props {}

interface DispatchProps {
  toggleActivationModal: (show: boolean) => void;
  activateUser: (token: string, success: any, error: any) => void;
}

type ClassProps = StateProps & DispatchProps & Props;

interface State {
  activated: boolean;
  couldNotActivate: boolean;
}

class ReactionsModal extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      activated: false,
      couldNotActivate: false
    };
  }

  componentWillReceiveProps(nextProps: ClassProps) {
    if (
      !this.props.showActivationModal &&
      nextProps.showActivationModal &&
      nextProps.activationUrl
    ) {
      this.setState(
        {
          activated: false,
          couldNotActivate: false
        },
        () => {
          // activate account
          const nums = nextProps.activationUrl.split("/");
          const token = nums[nums.length - 1];
          this.props.activateUser(
            token,
            () => {
              this.setState({
                activated: true
              });
            },
            () => {
              this.setState({
                couldNotActivate: true
              });
            }
          );
        }
      );
    }
  }

  render() {
    if (!this.props.showActivationModal) {
      return null;
    }

    return (
      <Modal
        visible={this.props.showActivationModal}
        animationType="slide"
        transparent
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => this.props.toggleActivationModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="md-close" size={22} color="black" />
            </TouchableOpacity>
            {this.state.activated ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%"
                }}
              >
                <Icon name="like" color="black" size={31} />
                <Text style={styles.textHeader}>
                  {locale[this.props.language]["account.activated"]}
                </Text>
              </View>
            ) : (
              undefined
            )}
            {this.state.couldNotActivate ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%"
                }}
              >
                <Text style={styles.textHeader}>
                  {locale[this.props.language]["could.not.activate.account"]}
                </Text>
              </View>
            ) : (
              undefined
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  toggleActivationModal,
  activateUser
};

const mapStateToProps = (state: any) => ({
  showActivationModal: state.app.showActivationModal,
  activationUrl: state.app.activationUrl,
  language: state.app.language
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ReactionsModal);
