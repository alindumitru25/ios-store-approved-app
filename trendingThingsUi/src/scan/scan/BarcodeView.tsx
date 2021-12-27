import * as React from "react";
import Camera from "react-native-camera";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Spinner from "react-native-spinkit";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  fetchScans,
  toggleShowAddScan,
  clearBarcode,
  setScansSorting,
  toggleScanCamera
} from "./../../actions/AppActions";
import { isEmpty, size } from "lodash";

import styles from "./styles";
import AddScan from "./AddScan";
import Scan from "./Scan";
import { locale } from "./../../language/locale";

import { sortScans } from "./scanSelectors";

enum SortingType {
  NEW = "createdAt",
  PRICE = "price"
}

interface StateProps {
  barCode: any;
  loadingScans: boolean;
  scans: any;
  showAddScan: boolean;
  showCreatePostSuggestion: boolean;
  scansSorting: SortingType;
  language: string;
}

interface DispatchProps {
  fetchScans: (type: any, code: any) => void;
  toggleShowAddScan: (show: boolean) => void;
  toggleScanCamera: (show: boolean) => void;
  clearBarcode: () => void;
  setScansSorting: (sorting: SortingType) => void;
}

interface Props {}

type ClassProps = StateProps & DispatchProps & Props;

class BarcodeView extends React.Component<ClassProps, {}> {
  componentDidMount() {
    this.props.fetchScans(this.props.barCode.type, this.props.barCode.code);
  }

  componentWillReceiveProps(nextProps: ClassProps) {
    if (this.props.barCode !== nextProps.barCode) {
      this.props.fetchScans(nextProps.barCode.type, nextProps.barCode.code);
    }
  }

  renderScans() {
    if (this.props.loadingScans) {
      return (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Spinner isVisible size={30} type="Arc" color="white" />
        </View>
      );
    }

    if (!this.props.scans || isEmpty(this.props.scans)) {
      return (
        <View style={styles.barcodeEmptyWrapper}>
          <Text style={styles.emptyText}>
            {locale[this.props.language]["first.scan.add"]}
          </Text>
        </View>
      );
    }

    return (
      <View>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 10,
            flexDirection: "row",
            backgroundColor: "transparent",
            alignItems: "center"
          }}
        >
          <Text
            style={[
              styles.headerText,
              {
                marginLeft: 10,
                fontSize: 25
              }
            ]}
          >
            {locale[this.props.language]["prices"]}
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 6,
              paddingTop: 6,
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={[
                styles.filter,
                this.props.scansSorting === SortingType.NEW
                  ? styles.activeFilter
                  : null
              ]}
              onPress={() => this.props.setScansSorting(SortingType.NEW)}
            >
              <Text style={styles.chooserText}>
                {locale[this.props.language]["last"]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filter,
                this.props.scansSorting === SortingType.PRICE
                  ? styles.activeFilter
                  : null
              ]}
              onPress={() => this.props.setScansSorting(SortingType.PRICE)}
            >
              <Text style={styles.chooserText}>
                {locale[this.props.language]["best.price"]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.scanViewContainer, { flex: 1 }]}>
          {this.props.scans.map((scan: any, i: number) => (
            <Scan
              key={scan.id}
              scan={scan}
              isLastElement={i === size(this.props.scans) - 1}
            />
          ))}
        </View>
      </View>
    );
  }

  renderContent() {
    if (this.props.showAddScan) {
      return (
        <View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 10,
              flexDirection: "row",
              backgroundColor: "transparent",
              alignItems: "center",
              paddingRight: 6
            }}
          >
            <Text
              style={[
                styles.headerText,
                {
                  marginLeft: 10,
                  fontSize: 25
                }
              ]}
            >
              {locale[this.props.language]["add.price"]}
            </Text>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => this.props.toggleShowAddScan(false)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={[styles.headerText, { fontSize: 19 }]}>
                  {locale[this.props.language]["general.back"]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <AddScan />
        </View>
      );
    }

    return this.renderScans();
  }

  renderHeader() {
    return (
      <View style={{ height: 120 }}>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => this.props.toggleShowAddScan(true)}
          >
            <Icon name="paper-plane" color="white" size={17} />
            <View style={styles.textWrapper}>
              <Text style={styles.headerText}>
                {locale[this.props.language]["add.price"]}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.outlineButton, { marginLeft: 8 }]}
            onPress={() => this.props.toggleScanCamera(true)}
          >
            <Ionicons name="ios-barcode-outline" color="white" size={19} />
            <View style={styles.textWrapper}>
              <Text style={styles.headerText}>
                {locale[this.props.language]["re.scan"]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          paddingLeft: 4,
          paddingRight: 4,
          paddingBottom: 0,
          flexDirection: "column"
        }}
      >
        <ScrollView style={styles.scansWrapper}>
          {this.renderHeader()}
          {this.renderContent()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  barCode: state.app.barCode,
  loadingScans: state.app.loadingScans,
  scans: sortScans(state),
  showAddScan: state.app.showAddScan,
  showCreatePostSuggestion: state.app.showCreatePostSuggestion,
  scansSorting: state.app.scansSorting,
  language: state.app.language
});

const mapDispatchToProps = {
  fetchScans,
  toggleShowAddScan,
  toggleScanCamera,
  clearBarcode,
  setScansSorting
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeView);
