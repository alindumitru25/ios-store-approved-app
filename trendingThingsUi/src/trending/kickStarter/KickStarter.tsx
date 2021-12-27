import * as React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import ImagePicker from "react-native-image-picker";
import common from "./../../styles/CommonStyles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { setShareModalPhoto } from "./../../actions/ShareModalActions";
import {
  toggleShowFilter,
  toggleSearchBar,
  clearSearchResults
} from "./../../actions/AppActions";
import ImageResizer from "react-native-image-resizer";
import { locale } from "./../../language/locale";

const styles = StyleSheet.create({
  container: {
    padding: 7,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 27,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center"
  },
  textWrapper: {
    marginLeft: 10
  },
  text: {
    fontFamily: "Raleway-Regular",
    fontWeight: "300",
    fontSize: 17,
    color: "white"
  }
});

class KickStarter extends React.Component<ClassProps, {}> {
  constructor(props: ClassProps) {
    super(props);

    this.sharePhoto = this.sharePhoto.bind(this);
  }

  sharePhoto() {
    ImagePicker.showImagePicker({ noData: true }, (response: any) => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        alert(locale[this.props.language]["camera.general.error"]);
        return;
      }

      Image.getSize(
        response.uri,
        (width, height) => {
          const newWidth = width > 1024 ? 1024 : width;
          const newHeight = newWidth * height / width;
          ImageResizer.createResizedImage(
            response.uri,
            newWidth,
            newHeight,
            "JPEG",
            70
          ).then(resizedImage => {
            let photo = {
              name: response.name,
              path: resizedImage.uri
            };

            this.props.dispatch(toggleSearchBar(false));
            this.props.dispatch(clearSearchResults());
            this.props.dispatch(setShareModalPhoto(photo));
            this.props.navigation.navigate("Share");
            photo = null;
          });
        },
        () => {}
      );
    });
  }

  renderIcon() {
    return <Icon name="paper-plane" color="white" size={17} />;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.sharePhoto} style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.renderIcon()}
          <View style={styles.textWrapper}>
            <Text style={styles.text}>
              {locale[this.props.language]["share.product"]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

interface DispatchProps {
  dispatch: any;
}

interface StateProps {
  navigation: any;
  language: string;
}

type ClassProps = DispatchProps & StateProps;

function mapStateToProps(state: any) {
  return {
    navigation: state.trendingThingsNav.tabNavigation,
    language: state.app.language
  };
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps)(
  KickStarter
);
