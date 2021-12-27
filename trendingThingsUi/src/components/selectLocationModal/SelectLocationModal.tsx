import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {
  toggleLocationChooserModal,
  setUserLocation
} from "./../../actions/AppActions";
import {
  View,
  Text,
  Modal,
  Picker,
  PickerItem,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { locale } from "./../../language/locale";

import styles from "./styles";

interface StateProps {
  show: boolean;
  predefinedLocations: any;
  currentLocation: any;
  language: string;
}
interface DispatchProps {
  toggleLocationChooserModal: (show: boolean) => void;
  setUserLocation: (locationId: any) => void;
}
interface Props {}

type ClassProps = StateProps & DispatchProps & Props;

interface State {
  location: number;
  showLocationError: boolean;
}

class SelectLocationModal extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      location: this.props.currentLocation,
      showLocationError: false
    };
  }

  componentWillReceiveProps(nextProps: ClassProps) {
    if (this.props.show && !nextProps.show) {
      this.setState({
        location: null,
        showLocationError: false
      });
    }

    this.setState({
      location: nextProps.currentLocation
    });
  }

  render() {
    const {
      show,
      predefinedLocations,
      toggleLocationChooserModal
    } = this.props;
    if (!show) {
      return null;
    }

    return (
      <Modal visible={show} animationType="fade" transparent>
        <View style={styles.modalWrapper}>
          <View style={[styles.modal]}>
            <TouchableOpacity
              onPress={() => toggleLocationChooserModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="md-close" size={28} color="black" />
            </TouchableOpacity>
            {this.state.showLocationError ? (
              <View style={styles.errorWrapper}>
                <Icon name="exclamation" color="red" style={styles.errorIcon} />
                <Text style={styles.redText}>
                  {locale[this.props.language]["select.below.location"]}
                </Text>
              </View>
            ) : null}
            <View style={[styles.inputPicker]}>
              <Ionicons
                name="ios-arrow-round-down-outline"
                color="#464646"
                style={styles.pickerIcon}
              />
              <Picker
                itemStyle={styles.pickerItem}
                selectedValue={this.state.location}
                onValueChange={(value: number) => {
                  this.setState({ location: value });
                }}
              >
                <Picker.Item label="Selecteaza locatia ta" value={null} />
                {predefinedLocations.map((location: any) => (
                  <Picker.Item
                    key={location.id}
                    label={location.name}
                    value={location.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (this.state.location) {
                    this.props.setUserLocation(this.state.location);
                  } else {
                    this.setState({
                      showLocationError: true
                    });
                  }
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.buttonText}>
                    {locale[this.props.language]["save"]}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  show: state.app.showLocationChooserModal,
  predefinedLocations: state.applicationData.initialData
    ? state.applicationData.initialData.predefinedLocations
    : null,
  currentLocation:
    state.applicationData.initialData &&
    state.applicationData.initialData.user.location,
  language: state.app.language
});

const mapDispatchToProps = {
  toggleLocationChooserModal,
  setUserLocation
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(SelectLocationModal);
