import * as React from "react";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Text, TouchableHighlight } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import styles from "./styles";
import { locale } from "./../../language/locale";

interface Props {
  types: string;
  longitude?: any;
  latitude?: any;
  hideSearch?: () => void;
  searchValue?: string;
  onTextChange: (value: string) => void;
  onPress: (latitude: number, longitude: number, address: string) => void;
  language: string;
}

const style = {
  container: styles.searchContainer,
  textInputContainer: styles.textInputContainer,
  powered: styles.powered,
  textInput: styles.textInput,
  description: styles.predefinedPlacesDescription,
  separator: styles.separator
};

const returnButtonStyle = {
  marginTop: 8,
  marginRight: 10,
  marginLeft: 8
};

const key = "AIzaSyBGeNF-D_BIDOvxV7ZWgdwd9FOX5ear3Ps";

class SimpleLocationSearch extends React.Component<Props, {}> {
  render() {
    const coordinate = `${this.props.latitude},${this.props.longitude}`;
    return (
      <GooglePlacesAutocomplete
        placeholder={
          locale[this.props.language]["places.autocomplete.placeholder"]
        }
        minLength={1} // minimum length of text to search
        autoFocus={true}
        fetchDetails={true}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed={true} // true/false/undefined
        renderDescription={(row: any) => row.description} // custom description render
        onPress={(data: any, details: any = null) => {
          // 'details' is provided when fetchDetails = true
          this.props.onPress(
            details.geometry.location.lat,
            details.geometry.location.lng,
            data.structured_formatting.main_text
          );
        }}
        getDefaultValue={() => {
          return this.props.searchValue ? this.props.searchValue : ""; // text input default value
        }}
        textInputProps={{
          textChange: this.props.onTextChange
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key,
          language: "en", // language of the results
          types: this.props.types,
          location: coordinate, // get results nearby
          components: "country:ro",
          radius: 10000 // radius of the location search
        }}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance"
        }}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        renderLeftButton={() => (
          <TouchableHighlight onPress={this.props.hideSearch}>
            <AwesomeIcon
              name="angle-left"
              size={25}
              style={returnButtonStyle}
              color="#464646"
            />
          </TouchableHighlight>
        )}
        styles={style}
      />
    );
  }
}

export default SimpleLocationSearch;
