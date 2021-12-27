import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons";
import { navigateToUserProfile } from "./../../actions/TrendingNavActions";
import {
  toggleHideLocationTooltip,
  setHideLocationTooltipPref
} from "./../../actions/AppActions";
import styles from "./styles";
import { locale } from "./../../language/locale";

interface StoreProps {
  currentUser: any;
  showTooltip: boolean;
  userPreferences: any;
  language: string;
}
interface DispatchProps {
  toggleHideLocationTooltip: (show: boolean) => void;
  navigateToUserProfile: () => void;
  setHideLocationTooltipPref: (show: boolean) => void;
}
interface Props {}

type ClassProps = StoreProps & DispatchProps & Props;

const AddLocationTooltip = ({
  currentUser,
  showTooltip,
  userPreferences,
  language,
  toggleHideLocationTooltip,
  navigateToUserProfile,
  setHideLocationTooltipPref
}: ClassProps) => {
  if (
    !showTooltip ||
    (userPreferences && userPreferences.hideLocationTooltip)
  ) {
    return null;
  }

  return (
    <View style={styles.tooltipWrapper}>
      <TouchableOpacity
        onPress={() => toggleHideLocationTooltip(true)}
        style={styles.closeButton}
      >
        <Ionicons name="md-close" size={22} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="ios-pin-outline" size={32} color="white" />
          <View style={styles.textArea}>
            <Text style={styles.textHeader}>
              {locale[language]["add.location.tooltip.hey"]}{" "}
              {currentUser
                ? currentUser.firstName + " " + currentUser.lastName
                : ""}
            </Text>
            <Text style={styles.text}>
              {locale[language]["add.location.tooltip.description"]}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 8 }}>
          <TouchableOpacity
            onPress={() => {
              toggleHideLocationTooltip(true);
              navigateToUserProfile();
            }}
            style={styles.outlineButton}
          >
            <Text style={styles.buttonText}>
              {locale[language]["select.location"]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setHideLocationTooltipPref(true)}
            style={styles.outlineButton}
          >
            <Text style={styles.buttonText}>
              {locale[language]["dont.show"]}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.arrowUp} />
    </View>
  );
};

const mapStateToProps = (state: any) => {
  const userId = state.applicationData ? state.applicationData.userId : null;
  const userPreferences =
    state.applicationData.initialData &&
    state.applicationData.initialData.userPreferences;
  const currentUser =
    state.applicationData.initialData &&
    state.applicationData.initialData.currentUser;

  return {
    currentUser,
    showTooltip:
      !currentUser || state.app.hideLocationTooltip
        ? null
        : !currentUser.location,
    userPreferences,
    language: state.app.language
  };
};

const mapDispatchToProps = {
  toggleHideLocationTooltip,
  navigateToUserProfile,
  setHideLocationTooltipPref
};

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(AddLocationTooltip);
