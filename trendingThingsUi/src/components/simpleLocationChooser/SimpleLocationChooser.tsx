import * as React from "react";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { connect } from "react-redux";
import GeoCoder from "react-native-geocoder";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwesomeIcons from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";

import SimpleLocationSearch from "./SimpleLocationSearch";
import SimpleLocationPanel from "./SimpleLocationPanel";

import styles from "./styles";
import { locale } from "./../../language/locale";

interface StateProps {
  userLocation: any;
  userHasLocation: boolean;
  dropDownAlertRef: any;
  language: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (data: any) => void;
  hasSearchBar: boolean;
}

interface State {
  geoLocation: any;
  location: any;
  address: string;
  showSearchContent: boolean;
  searchAddress: string;
  showAddLocationPanel: boolean;
}

type ClassProps = StateProps & Props;

const LATITUDE_DELTA = 0.0043;
const LONGITUDE_DELTA = 0.0034;
const ZOOM_OUT_LATITUDE_DELTA = 0.0243;
const ZOOM_OUT_LONGITUDE_DELTA = 0.0243;

class SimpleLocationChooser extends React.Component<ClassProps, State> {
  private locationWatcher: any;

  constructor(props: ClassProps) {
    super(props);
    this.state = {
      location: {
        latitude: this.props.userLocation.latitude,
        longitude: this.props.userLocation.longitude,
        latitudeDelta: ZOOM_OUT_LATITUDE_DELTA,
        longitudeDelta: ZOOM_OUT_LONGITUDE_DELTA
      },
      geoLocation: null,
      address: null,
      showSearchContent: false,
      searchAddress: "",
      showAddLocationPanel: false
    };

    this.onRegionChange = this.onRegionChange.bind(this);
    this.onSearchPress = this.onSearchPress.bind(this);
    this.showAddLocationPanel = this.showAddLocationPanel.bind(this);
    this.handleGeoLocationClick = this.handleGeoLocationClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.userHasLocation) {
      this.props.dropDownAlertRef.alertWithType(
        "success",
        "",
        locale[this.props.language]["no.location.set.warning"]
      );
    }

    this.getAddressByGeoCode(
      this.props.userLocation.latitude,
      this.props.userLocation.longitude
    );
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        this.setState(
          {
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            },
            geoLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          },
          () => {
            this.getAddressByGeoCode(
              this.state.location.latitude,
              this.state.location.longitude
            );
          }
        );
        // this.changeAddress(position.coords.latitude, position.coords.longitude);
      },
      () => {},
      {
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );

    this.locationWatcher = navigator.geolocation.watchPosition(
      (position: any) => {
        this.setState({
          geoLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatcher);
  }

  onSearchPress(latitude: number, longitude: number, address: string) {
    this.setState({
      location: {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      showSearchContent: false,
      searchAddress: address
    });
  }

  onRegionChange(region: any) {
    this.setState(
      {
        location: {
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta
        }
      },
      () => {
        this.getAddressByGeoCode(
          this.state.location.latitude,
          this.state.location.longitude
        );
      }
    );
  }

  showAddLocationPanel() {
    this.setState({
      showAddLocationPanel: true
    });
  }

  getAddressByGeoCode(lat: number, lng: number) {
    GeoCoder.geocodePosition({
      lat,
      lng
    })
      .then((res: any) => {
        this.setState({
          address: res[0].formattedAddress
        });
      })
      .catch((err: any) => {});
  }

  handleGeoLocationClick() {
    if (this.state.geoLocation) {
      this.setState({
        location: {
          ...this.state.geoLocation,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    }
  }

  renderMarker() {
    return (
      <View style={styles.markerWrapper}>
        <Image
          source={require("./../../../images/simple_marker.png")}
          style={styles.marker}
        />
      </View>
    );
  }

  renderCloseIcon() {
    return (
      <TouchableOpacity style={styles.closeButton} onPress={this.props.onClose}>
        <Ionicons name="md-close" size={22} color="black" />
      </TouchableOpacity>
    );
  }

  renderTopActions() {
    return (
      <View style={styles.topActionContainer}>
        <TouchableOpacity onPress={this.props.onClose}>
          <View style={styles.actionButtonSmall}>
            <Text style={styles.actionButtonText}>{this.state.address}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderBottomActions() {
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={this.showAddLocationPanel}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>
              {locale[this.props.language]["choose.text"]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderLocationPanel() {
    return (
      <SimpleLocationPanel
        location={this.state.location}
        address={this.state.address}
        onSubmit={this.props.onSubmit}
      />
    );
  }

  renderContent() {
    if (!this.state.showSearchContent) {
      return (
        <View style={styles.contentWrapper}>
          {this.renderSearch()}
          {this.state.showAddLocationPanel ? (
            this.renderLocationPanel()
          ) : (
            <View style={[styles.contentWrapper, { position: "relative" }]}>
              <MapView
                style={styles.map}
                region={this.state.location}
                onRegionChangeComplete={this.onRegionChange}
                showsUserLocation={true}
              />
              {this.renderTopActions()}
              {this.renderBottomActions()}
              {this.renderMarker()}
            </View>
          )}
        </View>
      );
    }

    return (
      <SimpleLocationSearch
        types={"establishment"}
        longitude={this.state.location.longitude}
        latitude={this.state.location.latitude}
        onPress={this.onSearchPress}
        searchValue={this.state.searchAddress}
        hideSearch={() => {
          this.setState({
            showSearchContent: false
          });
        }}
        onTextChange={(value: string) => {
          this.setState({
            searchAddress: value
          });
        }}
        language={this.props.language}
      />
    );
  }

  renderSearch() {
    if (!this.props.hasSearchBar) {
      return null;
    }

    return (
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarWrapper}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                showSearchContent: true,
                showAddLocationPanel: false
              });
            }}
            style={styles.searchBar}
          >
            <Text style={styles.searchBarText}>
              {this.state.searchAddress
                ? this.state.searchAddress
                : locale[this.props.language]["search.locations.text"]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchIcon}>
            <AwesomeIcons name="search" color="#686868" size={13} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleGeoLocationClick}>
          <View style={styles.grayWrapper}>
            <AwesomeIcons name="location-arrow" color="#686868" size={13} />
          </View>
        </TouchableOpacity>
        {this.state.showAddLocationPanel ? (
          <TouchableOpacity
            style={styles.grayWrapper}
            onPress={() => {
              this.setState({
                showAddLocationPanel: false
              });
            }}
          >
            <Ionicons name="ios-arrow-back-outline" size={14} color="#686868" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.grayWrapper}
            onPress={this.props.onClose}
          >
            <Ionicons name="md-close" size={14} color="#686868" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

// default to Cluj if location is not available
const mapStateToProps = (state: any) => ({
  userLocation: {
    latitude: state.applicationData.initialData.location
      ? state.applicationData.initialData.location.center[1]
      : 46.771085,
    longitude: state.applicationData.initialData.location
      ? state.applicationData.initialData.location.center[0]
      : 23.589792
  },
  userHasLocation: !!state.applicationData.initialData.location,
  dropDownAlertRef: state.app.dropDownAlertRef,
  language: state.app.language
});

export default connect<StateProps, {}, Props>(mapStateToProps)(
  SimpleLocationChooser
);
