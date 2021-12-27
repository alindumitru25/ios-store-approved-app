import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Keyboard
} from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScanCamera from "./ScanCamera";
import BarcodeView from "./BarcodeView";
import SimpleLocationChooser from "./../../components/simpleLocationChooser/SimpleLocationChooser";
import { values, find } from "lodash";
import { CheckBox } from "react-native-elements";

import {
  toggleScanCamera,
  setBarcode,
  toggleScanLocationChooser,
  clearBarcode,
  toggleShowAddScan,
  addLocationToBarcode
} from "./../../actions/AppActions";
import styles from "./styles";

interface StateProps {
  userId: number;
  barCode: any;
  showScanLocationChooser: boolean;
}

interface DispatchProps {
  toggleScanCamera: (show: boolean) => void;
  setBarcode: (type: any, code: any) => void;
  toggleScanLocationChooser: (show: boolean) => void;
  clearBarcode: () => void;
  toggleShowAddScan: (show: boolean) => void;
  addLocationToBarcode: (location: any) => void;
}

interface Props {}

type ClassProps = StateProps & DispatchProps & Props;

class ScanModal extends React.Component<ClassProps, {}> {
  private camera: any;

  constructor(props: ClassProps) {
    super(props);

    this.onLocationAdd = this.onLocationAdd.bind(this);
  }

  /*componentWillReceiveProps(nextProps: ClassProps) {
    if (!nextProps.showScanCamera) {
      this.props.clearBarcode();
      this.props.toggleShowAddScan(false);
    }
  }*/

  onLocationAdd(location: Location) {
    this.props.toggleScanLocationChooser(false);
    this.props.addLocationToBarcode(location);
  }

  renderLocationChooser() {
    if (this.props.showScanLocationChooser) {
      return (
        <View style={styles.locationChooser}>
          <SimpleLocationChooser
            onClose={() => this.props.toggleScanLocationChooser(false)}
            onSubmit={this.onLocationAdd}
            hasSearchBar
          />
        </View>
      );
    }
  }

  render() {
    if (!this.props.barCode) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <BarcodeView />
        {this.renderLocationChooser()}
      </View>
    );
  }
}

const mapDispatchToProps = {
  toggleScanCamera,
  setBarcode,
  toggleScanLocationChooser,
  clearBarcode,
  toggleShowAddScan,
  addLocationToBarcode
};

const mapStateToProps = (state: any) => ({
  barCode: state.app.barCode,
  userId: state.applicationData.userId,
  showScanLocationChooser: state.app.showScanLocationChooser
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ScanModal);
