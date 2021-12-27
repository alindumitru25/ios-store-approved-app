import * as React from "react";
import { View, Image, Dimensions } from "react-native";
import TrendingThingsPosts from "./TrendingThingsPosts";
import Where from "./Where";
import Settings from "./settings/Settings";
import ApplicationBar from "./../components/applicationBar/ApplicationBar";
import AddLocationTooltip from "./../components/addLocationTooltip/AddLocationTooltip";
import FilterModal from "./filter/FilterModal";
import ScanModal from "./../scan/scan/ScanModal";
import ScanView from "./../scan/scan/ScanView";
import ShareModal from "./share/ShareModal";
import SelectLocationModal from "./../components/selectLocationModal/SelectLocationModal";
import NotificationsNavWrapper from "./notifications/NotificationsNavWrapper";
import MessagesNavWrapper from "./messages/MessagesNavWrapper";
import SearchResults from "./../components/searchResults/SearchResults";
import BottomBar from "./bottomBar/BottomBar";
import DropdownAlert from "react-native-dropdownalert";
import { setDropdownAlertRef } from "./../actions/AppActions";
import { TabNavigator } from "react-navigation";
import { connect } from "react-redux";
import { ifIphoneX } from "react-native-iphone-x-helper";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

const TabBar = ({ navigation }: any) => (
  <View
    style={{
      position: "relative",
      width: "100%",
      ...ifIphoneX(
        {
          height: 80
        },
        {
          height: 58
        }
      )
    }}
  >
    <ApplicationBar navigation={navigation} />
  </View>
);

// TrendingThings contains
// 1. Trending Things Wall
// 2. Where can I find Trending Things
const TrendingThings = TabNavigator(
  {
    Home: { screen: TrendingThingsPosts },
    Scan: { screen: ScanView },
    Share: { screen: ShareModal },
    Messages: { screen: MessagesNavWrapper },
    Notifications: { screen: NotificationsNavWrapper },
    Settings: { screen: Settings },
    SearchResults: { screen: SearchResults }
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: "top"
  }
);

const TrendingThingsWrapper = ({ setDropdownAlertRef }: any) => (
  <View style={{ flex: 1 }}>
    <FilterModal animationType="fade" />
    <ScanModal animationType="fade" />
    <SelectLocationModal />
    <TrendingThings />
    <BottomBar />
    <AddLocationTooltip />
    <DropdownAlert
      updateStatusBar={false}
      closeInterval={6000}
      ref={(ref: any) => setDropdownAlertRef(ref)}
      successColor="#262626"
    />
  </View>
);

const mapDispatchToProps = {
  setDropdownAlertRef
};

export default connect(null, mapDispatchToProps)(TrendingThingsWrapper);
