import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";
import MessagesScreen from "./MessagesScreen";
import KickStarter from "./../kickStarter/KickStarter";
import ShareModalNav from "./../share/ShareModal";
import UserProfile from "./../user/UserProfile";
import ReactionsModal from "./../reactions/ReactionsModal";
import TrendingPost from "./../post/TrendingPost";
import EditPost from "./../post/EditPost";
import { StackNavigator, addNavigationHelpers } from "react-navigation";

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

export const MessagesNav = StackNavigator(
  {
    Home: {
      screen: MessagesScreen
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

class MessagesNavWrapper extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <ReactionsModal animationType="slide" />
        <MessagesNav
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
    nav: state.messagesNav,
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

export default connect(mapStateToProps, mapDispatchToProps)(MessagesNavWrapper);
