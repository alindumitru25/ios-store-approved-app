import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";
import SearchResultsPosts from "./SearchResultsPosts";
import UserProfile from "./../../trending/user/UserProfile";
import TrendingPost from "./../../trending/post/TrendingPost";
import EditPost from "./../../trending/post/EditPost";
import { StackNavigator, addNavigationHelpers } from "react-navigation";

const width = Dimensions.get("window").width; //full width

interface Props {
  dispatch: any;
  nav: any;
}

const configureNavigationOptions = () => ({
  gesturesEnabled: true,
  gestureDirection: "horizontal",
  gestureResponseDistance: {
    horizontal: width
  }
});

export const SearchResultsNav = StackNavigator(
  {
    Home: {
      screen: SearchResultsPosts
    },
    TrendingPost: {
      screen: TrendingPost,
      navigationOptions: configureNavigationOptions
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: configureNavigationOptions
    },
    EditPost: {
      screen: EditPost,
      navigationOptions: configureNavigationOptions
    }
  },
  {
    headerMode: "none",
    cardStyle: { backgroundColor: "transparent" },
    transitionConfig: () => ({
      containerStyle: {}
    })
  }
);

class TrendingThings extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <SearchResultsNav
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
          })}
        />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    nav: state.searchResultsNav
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingThings);
