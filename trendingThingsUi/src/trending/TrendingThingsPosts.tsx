import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";
import TrendingWall from "./trendingWall/TrendingWall";
import KickStarter from "./kickStarter/KickStarter";
import ShareModalNav from "./share/ShareModal";
import UserProfile from "./user/UserProfile";
import ReactionsModal from "./reactions/ReactionsModal";
import {
  requestInitialData,
  requestDocuments,
  unsubscribeToNotifications,
  unsubscribeToChatsUpdates
} from "./../actions/AppActions";
import TrendingPost from "./post/TrendingPost";
import EditPost from "./post/EditPost";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import { noop } from "lodash";

const width = Dimensions.get("window").width; //full width

interface Props {
  dispatch: any;
  nav: any;
  userId: number;
}

const configureNavigationOptions = () => ({
  gesturesEnabled: true,
  gestureDirection: "horizontal",
  gestureResponseDistance: {
    horizontal: width
  }
});

export const TrendingNav = StackNavigator(
  {
    Home: {
      screen: TrendingWall
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

  componentDidMount() {
    this.props.dispatch(requestInitialData());
    this.props.dispatch(requestDocuments(noop, true));
  }

  componentWillUnmount() {
    this.props.dispatch(unsubscribeToNotifications(this.props.userId));
    this.props.dispatch(unsubscribeToChatsUpdates(this.props.userId));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <ReactionsModal animationType="slide" />
        <TrendingNav
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
    nav: state.trendingThingsNav,
    userId:
      state.applicationData.initialData &&
      state.applicationData.initialData.userId
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingThings);
