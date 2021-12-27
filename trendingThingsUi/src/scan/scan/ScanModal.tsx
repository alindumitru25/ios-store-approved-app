import * as React from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScanCamera from "./ScanCamera";

import {
  toggleScanCamera,
  setBarcode,
  toggleScanLocationChooser,
  clearBarcode,
  toggleShowAddScan,
  addLocationToBarcode,
  clearSearchResults
} from "./../../actions/AppActions";
import styles from "./styles";

interface StateProps {
  showScanCamera: boolean;
  userId: number;
  barCode: any;
  showScanLocationChooser: boolean;
  navigation: any;
  language: string;
}

interface DispatchProps {
  toggleScanCamera: (show: boolean) => void;
  setBarcode: (type: any, code: any) => void;
  toggleScanLocationChooser: (show: boolean) => void;
  clearBarcode: () => void;
  toggleShowAddScan: (show: boolean) => void;
  addLocationToBarcode: (location: any) => void;
  clearSearchResults: () => void;
}

interface Props {
  animationType: "none" | "slide" | "fade";
}

type ClassProps = StateProps & DispatchProps & Props;

class ScanModal extends React.Component<ClassProps, {}> {
  private camera: any;

  constructor(props: ClassProps) {
    super(props);

    this.onBarcodeRead = this.onBarcodeRead.bind(this);
  }

  onBarcodeRead(e: any) {
    this.props.setBarcode(e.type, e.data);
    this.props.clearSearchResults();
    this.props.toggleScanCamera(false);
    this.props.navigation.navigate("Scan");
  }

  renderCloseButton() {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => this.props.toggleScanCamera(false)}
        style={styles.closeButton}
      >
        <Ionicons name="md-close" size={28} color="white" />
      </TouchableHighlight>
    );
  }

  render() {
    if (!this.props.showScanCamera) {
      return null;
    }

    return (
      <Modal
        visible={this.props.showScanCamera}
        animationType={this.props.animationType}
        transparent
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.modalWrapper}>
              <View style={[styles.modal, { flex: 1 }]}>
                <ScanCamera
                  onBarcodeRead={this.onBarcodeRead}
                  toggleScanCamera={this.props.toggleScanCamera}
                  language={this.props.language}
                />
              </View>
            </View>
            {this.renderCloseButton()}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  toggleScanCamera,
  setBarcode,
  toggleScanLocationChooser,
  clearBarcode,
  toggleShowAddScan,
  addLocationToBarcode,
  clearSearchResults
};

const mapStateToProps = (state: any) => ({
  showScanCamera: state.app.showScanCamera,
  barCode: state.app.barCode,
  userId: state.applicationData.userId,
  showScanLocationChooser: state.app.showScanLocationChooser,
  navigation: state.trendingThingsNav.tabNavigation,
  language: state.app.language
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ScanModal);
