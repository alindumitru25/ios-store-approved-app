import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";

import AwesomeIcons from "react-native-vector-icons/FontAwesome";
import { fetchAroundLocations } from "../../actions/AppActions";
import styles from "./styles";
import { locale } from "./../../language/locale";

interface StateProps {
  locations: any;
  language: string;
}

interface DispatchProps {
  fetchAroundLocations: (latitude: number, longitude: number) => void;
}

interface Location {
  referenceId: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

interface Props {
  location: any;
  address: string;
  onSubmit: (location: Location) => void;
}

interface State {
  locationName: string;
}

type ClassProps = StateProps & DispatchProps & Props;

const Location = ({ location, onSubmit }: any) => {
  const dataLocation: Location = {
    referenceId: location.place_id,
    name: location.name,
    latitude: location.geometry.location.lat,
    longitude: location.geometry.location.lng,
    address: location.vicinity
  };

  return (
    <TouchableHighlight
      underlayColor="transparent"
      key={location.id}
      onPress={() => onSubmit(dataLocation)}
      style={styles.locationWrapper}
    >
      <View style={styles.contentWrapperRow}>
        <AwesomeIcons
          name="map-marker"
          style={styles.locationIco}
          color="#686868"
          size={13}
        />
        <Text>{location.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

class SimpleLocationPanel extends React.Component<ClassProps, State> {
  private locationInputRef: any;

  constructor(props: ClassProps) {
    super(props);
    this.state = {
      locationName: ""
    };
  }

  componentDidMount() {
    // fetch around locations for google locations
    this.props.fetchAroundLocations(
      this.props.location.latitude,
      this.props.location.longitude
    );
  }

  renderLocations() {
    if (this.props.locations) {
      return (
        <View style={styles.locationList}>
          {this.props.locations.map((location: any) => (
            <Location
              key={location.id}
              location={location}
              onSubmit={this.props.onSubmit}
            />
          ))}
        </View>
      );
    }

    return <ActivityIndicator animating />;
  }

  render() {
    const dataLocation: any = {
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude,
      address: this.props.address
    };

    return (
      <KeyboardAvoidingView
        style={styles.locationPanel}
        behavior="padding"
        keyboardVerticalOffset={55}
      >
        <View style={[styles.locationsPanelWrapper, styles.contentWrapper]}>
          <Text style={styles.bigTitle}>
            {locale[this.props.language]["nearby.locations"]}
          </Text>
          <ScrollView>{this.renderLocations()}</ScrollView>
        </View>
        <View style={styles.locationPanelWrapper}>
          <Text style={styles.bigTitle}>
            {locale[this.props.language]["a.new.location"]}
          </Text>
          <TextInput
            ref={(elem: any) => {
              this.locationInputRef = elem;
            }}
            onChangeText={(text: string) =>
              this.setState({ locationName: text })
            }
            style={styles.newLocationInput}
            placeholder={locale[this.props.language]["type.new.location.here"]}
          />
        </View>
        <View style={styles.submitButtonWrapper}>
          <TouchableHighlight
            style={styles.submitButton}
            underlayColor="transparent"
            onPress={() => {
              this.props.onSubmit({
                ...dataLocation,
                name: this.state.locationName
              });
            }}
          >
            <Text style={styles.submitButtonText}>
              {locale[this.props.language]["add.location.action.text"]}
            </Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchAroundLocations: (latitude: number, longitude: number) =>
    dispatch(fetchAroundLocations(latitude, longitude))
});

const mapStateToProps = (state: any) => ({
  locations: state.applicationData.aroundLocations,
  language: state.app.language
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(SimpleLocationPanel);
