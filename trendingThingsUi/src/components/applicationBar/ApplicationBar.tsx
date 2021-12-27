import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  LayoutAnimation,
  TextInput,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import CommonStyles from "./../../styles/CommonStyles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchBar from "./../searchBar/SearchBar";
import UserIcon from "./../userIcon/UserIcon";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { throttle, values, isEmpty, filter, reduce, size } from "lodash";
import {
  navigateBack,
  navigateToUserProfile,
  navigateToSettings,
  srNavigateToUserProfile,
  srNavigateBack,
  nNavigateToUserProfile,
  nNavigateBack,
  mNavigateToUserProfile,
  mNavigateBack
} from "./../../actions/TrendingNavActions";
import {
  toggleShowFilter,
  setTabNavigation,
  search,
  toggleSearchBar,
  clearSearchResults,
  setSearch
} from "./../../actions/AppActions";
import { clearShareModal } from "./../../actions/AppActions";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { locale } from "./../../language/locale";

const styles = StyleSheet.create({
  background: {
    ...ifIphoneX(
      {
        height: 80,
        paddingTop: 25
      },
      {
        height: 60,
        paddingTop: 15
      }
    ),
    width: "100%",
    paddingLeft: 8,
    paddingRight: 8,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.86)"
  },
  preferencesIcon: {},
  leftContainer: {
    width: 35,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  iconContainer: {
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "center",
    marginTop: 0,
    marginLeft: 3,
    flex: 1
  },
  trendingButton: {
    height: 21,
    marginRight: 3,
    marginLeft: 3,
    marginTop: 2,
    padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    opacity: 0.8
  },
  searchBox: {
    backgroundColor: "rgb(25, 25, 25)",
    borderRadius: 27,
    marginRight: 4,
    flex: 1,
    height: 30
  },
  searchBoxText: {
    fontSize: 15,
    color: "rgb(205, 205, 205)",
    marginLeft: 6
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    marginTop: -1,
    marginLeft: 10,
    color: "white"
  },
  absoluteRoundCircle: {
    position: "absolute",
    top: -11,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 90,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9
  },
  absoluteRoundCircleText: {
    fontSize: 11
  }
});

type Props = ClassProps & DispatchProps & StoreProps;

interface ClassProps {
  navigation: any;
}

interface DispatchProps {
  dispatch: any;
  navigateBack: () => void;
  navigateToUserProfile: () => void;
  navigateToSettings: () => void;
  toggleShowFilter: (show: boolean) => void;
  setTabNavigation: (navigation: any) => void;
  clearShareModal: () => void;
  search: () => void;
  srNavigateToUserProfile: () => void;
  srNavigateBack: () => void;
  nNavigateToUserProfile: () => void;
  nNavigateBack: () => void;
  mNavigateToUserProfile: () => void;
  mNavigateBack: () => void;
  clearSearchResults: () => void;
  setSearch: (searchText: string) => void;
}

interface StoreProps {
  userId: number;
  showBackButton: boolean;
  showBackButtonForShareModal: boolean;
  showFilter: boolean;
  lastTab: string;
  showSearchResultsBackButton: boolean;
  language: string;
  filter: any;
  searchText: string;
}

class ApplicationBar extends React.Component<Props, {}> {
  private searchInputRef: any;

  constructor(props: Props) {
    super(props);

    this.onUserPress = throttle(this.onUserPress.bind(this), 500);
    this.onBack = throttle(this.onBack.bind(this), 500);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.setTabNavigation(this.props.navigation);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.navigation &&
      this.props.navigation !== nextProps.navigation
    ) {
      this.props.setTabNavigation(nextProps.navigation);
    }
  }

  onUserPress() {
    if (this.props.navigation.state.index === 6) {
      this.props.srNavigateToUserProfile();
    } else if (this.props.navigation.state.index === 4) {
      this.props.nNavigateToUserProfile();
    } else if (this.props.navigation.state.index === 3) {
      this.props.mNavigateToUserProfile();
    } else {
      this.props.navigateToUserProfile();
    }
  }

  onBack() {
    if (this.props.navigation.state.index === 6) {
      this.props.srNavigateBack();
    } else if (this.props.navigation.state.index === 4) {
      this.props.nNavigateBack();
    } else if (this.props.navigation.state.index === 3) {
      this.props.mNavigateBack();
    } else {
      this.props.navigateBack();
    }
  }

  handleSearch() {
    this.props.search();
    // close share modal if user is trying to search
    this.props.clearShareModal();
    this.props.navigation.navigate("SearchResults");
  }

  renderUserIcon() {
    if (this.props.showBackButton) {
      // return arrow back
      return (
        <TouchableOpacity
          style={[CommonStyles.touchable, { paddingTop: 22.5 }]}
          onPress={this.onBack}
        >
          <Icon name="arrow-left-circle" size={20} color="white" />
        </TouchableOpacity>
      );
    }
    if (this.props.showBackButtonForShareModal) {
      return (
        <TouchableOpacity
          style={[CommonStyles.touchable, { paddingTop: 22.5 }]}
          onPress={() => {
            this.props.navigation.navigate(this.props.lastTab || "Home");
            this.props.clearShareModal();
          }}
        >
          <Icon name="arrow-left-circle" size={20} color="white" />
        </TouchableOpacity>
      );
    }

    return <UserIcon onPress={this.onUserPress} userId={this.props.userId} />;
  }

  renderFiltersNumber() {
    if (
      this.props.filter &&
      this.props.filter.filters &&
      size(this.props.filter.filters) &&
      size(this.props.filter.filters["categoryId"]) +
        size(this.props.filter.filters["tags"])
    ) {
      return (
        <View style={styles.absoluteRoundCircle}>
          <Text style={styles.absoluteRoundCircleText}>
            {size(this.props.filter.filters["categoryId"]) +
              size(this.props.filter.filters["tags"])}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  renderRightActions() {
    if (this.props.showSearchResultsBackButton) {
      return (
        <TouchableOpacity
          style={[
            {
              width: 50,
              marginLeft: 10,
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
          hitSlop={{ top: 8, right: 4, left: 4, bottom: 8 }}
          onPress={() => {
            this.props.navigation.navigate(this.props.lastTab || "Home");
            this.props.clearSearchResults();
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            {locale[this.props.language]["general.back"]}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
          marginTop: 3,
          width: 20
        }}
      >
        <TouchableOpacity
          style={{ position: "relative" }}
          hitSlop={{ top: 4, right: 10, left: 4, bottom: 4 }}
          onPress={() => this.props.toggleShowFilter(true)}
        >
          <Ionicons name="ios-options" size={19} color="white" />
          {this.renderFiltersNumber()}
        </TouchableOpacity>
      </View>
    );
  }

  renderIcons() {
    return (
      <View style={styles.iconContainer}>
        {this.renderRightActions()}
        <TouchableOpacity
          style={styles.searchBox}
          onPress={() => {
            this.searchInputRef.focus();
          }}
        >
          <View
            style={[
              CommonStyles.touchable,
              styles.trendingButton,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                flex: 1
              }
            ]}
          >
            <Ionicons
              name="ios-search"
              size={17}
              color="white"
              style={{ marginTop: -1 }}
            />
            <TextInput
              ref={(ref: any) => {
                this.searchInputRef = ref;
              }}
              placeholder={
                locale[this.props.language]["search.product.placeholder"]
              }
              placeholderTextColor="white"
              value={this.props.searchText}
              returnKeyType="search"
              onSubmitEditing={this.handleSearch}
              onChangeText={text => {
                this.props.setSearch(text);
              }}
              style={[styles.searchInput]}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>{this.renderUserIcon()}</View>
          {this.renderIcons()}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  dispatch,
  navigateBack: () => dispatch(navigateBack()),
  navigateToUserProfile: () => dispatch(navigateToUserProfile()),
  srNavigateToUserProfile: () => dispatch(srNavigateToUserProfile()),
  srNavigateBack: () => dispatch(srNavigateBack()),
  nNavigateToUserProfile: () => dispatch(nNavigateToUserProfile()),
  nNavigateBack: () => dispatch(nNavigateBack()),
  mNavigateToUserProfile: () => dispatch(mNavigateToUserProfile()),
  mNavigateBack: () => dispatch(mNavigateBack()),
  navigateToSettings: () => dispatch(navigateToSettings()),
  toggleShowFilter: (show: boolean) => dispatch(toggleShowFilter(show)),
  setTabNavigation: (navigation: any) => dispatch(setTabNavigation(navigation)),
  clearShareModal: () => dispatch(clearShareModal()),
  search: () => dispatch(search()),
  clearSearchResults: () => dispatch(clearSearchResults()),
  setSearch: (searchText: string) => dispatch(setSearch(searchText))
});

function shouldShowBackButton(state: any, props: ClassProps) {
  if (props.navigation.state.index === 0) {
    return state.trendingThingsNav
      ? state.trendingThingsNav.showBackButton
      : null;
  } else if (props.navigation.state.index === 6) {
    return state.searchResultsNav
      ? state.searchResultsNav.showBackButton
      : null;
  } else if (props.navigation.state.index === 4) {
    return state.notificationsNav
      ? state.notificationsNav.showBackButton
      : null;
  } else if (props.navigation.state.index === 3) {
    return state.messagesNav ? state.messagesNav.showBackButton : null;
  }

  return false;
}

const mapStateToProps = (state: any, ownProps: ClassProps) => ({
  userId: state.applicationData ? state.applicationData.userId : null,
  showBackButton: shouldShowBackButton(state, ownProps),
  showBackButtonForShareModal: !!state.shareModal.photo,
  showSearchResultsBackButton:
    state.trendingThingsNav.showSearchResultsBackButton,
  showFilter: state.app.showFilter,
  lastTab: state.app.lastTab,
  language: state.app.language,
  filter: state.applicationData.initialData
    ? state.applicationData.initialData.filter
    : null,
  searchText: state.applicationData.searchText
});

export default connect<StoreProps, DispatchProps, ClassProps>(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationBar);
