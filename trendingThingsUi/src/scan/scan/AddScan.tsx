import * as React from "react";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Spinner from "react-native-spinkit";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import {
  toggleShowAddScan,
  toggleScanLocationChooser,
  addScan
} from "./../../actions/AppActions";
import {
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage
} from "react-native-elements";

import styles from "./styles";
import { locale } from "./../../language/locale";

interface StateProps {
  barCode: any;
  location: any;
  language: string;
}

interface DispatchProps {
  toggleShowAddScan: (show: boolean) => void;
  toggleScanLocationChooser: (show: boolean) => void;
  addScan: (
    barcode: any,
    details: string,
    price: number,
    location: any
  ) => void;
}

interface Props {}

type ClassProps = StateProps & DispatchProps & Props;

interface State {
  details: string;
  price: number;
  priceError: boolean;
  locationError: boolean;
}

class BarcodeView extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      details: null,
      price: null,
      priceError: false,
      locationError: false
    };
  }

  submitScan() {
    let canAdd = true;
    if (!this.state.price) {
      canAdd = false;
      this.setState({
        priceError: true
      });
    } else {
      this.setState({
        priceError: false
      });
    }

    if (!this.props.location) {
      canAdd = false;
      this.setState({
        locationError: true
      });
    } else {
      this.setState({
        locationError: false
      });
    }

    if (!canAdd) {
      return;
    }

    this.props.addScan(
      this.props.barCode,
      this.state.details,
      this.state.price,
      this.props.location
    );
  }

  renderLocation() {
    if (this.props.location) {
      return (
        <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
          <TouchableOpacity
            style={[styles.addingInput, { width: "100%" }]}
            onPress={() => this.props.toggleScanLocationChooser(true)}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Ionicons name="ios-pin-outline" color="black" size={17} />
              <Text style={{ marginLeft: 5, fontSize: 15 }} numberOfLines={1}>
                {this.props.location.address}
              </Text>
            </View>
          </TouchableOpacity>
          {this.state.locationError ? (
            <FormValidationMessage
              labelStyle={{ marginLeft: 0, marginRight: 0 }}
            >
              {locale[this.props.language]["add.location"]}
            </FormValidationMessage>
          ) : null}
        </View>
      );
    }

    return (
      <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
        <TouchableOpacity
          style={[styles.addingInput, { width: "100%" }]}
          onPress={() => this.props.toggleScanLocationChooser(true)}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Ionicons name="ios-pin-outline" color="black" size={17} />
            <Text style={{ marginLeft: 5, fontSize: 15 }}>
              {locale[this.props.language]["add.location"]}
            </Text>
          </View>
        </TouchableOpacity>
        {this.state.locationError ? (
          <FormValidationMessage labelStyle={{ marginLeft: 0, marginRight: 0 }}>
            {locale[this.props.language]["add.location"]}
          </FormValidationMessage>
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <View>
        <View
          style={[
            styles.scanViewContainer,
            { flexGrow: 1, padding: 10, paddingTop: 0, paddingBottom: 20 }
          ]}
        >
          <FormLabel labelStyle={styles.labelText}>
            {locale[this.props.language]["add.price.required"]}
          </FormLabel>
          <FormInput
            keyboardType="numeric"
            placeholder={locale[this.props.language]["add.price"]}
            containerStyle={styles.addingInput}
            inputStyle={styles.labelText}
            style={{ fontSize: 16 }}
            placeholderTextColor="black"
            onChangeText={value => {
              this.setState({ price: Number(value) });
            }}
          />
          {this.state.priceError ? (
            <FormValidationMessage
              labelStyle={{ marginLeft: 0, marginRight: 0 }}
            >
              {locale[this.props.language]["add.price"]}
            </FormValidationMessage>
          ) : null}
          <FormLabel labelStyle={styles.labelText}>
            {locale[this.props.language]["add.location.required"]}
          </FormLabel>
          {this.renderLocation()}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15
          }}
        >
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => this.submitScan()}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="md-checkmark"
                color="white"
                size={17}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.headerText}>
                {locale[this.props.language]["submit.scan"]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  barCode: state.app.barCode,
  location: state.app.barcodeLocation,
  language: state.app.language
});
const mapDispatchToProps = {
  toggleShowAddScan,
  toggleScanLocationChooser,
  addScan
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeView);
