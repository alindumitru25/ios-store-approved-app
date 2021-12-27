import * as React from "react";
import LandingPage from "./components/landing/LandingPage";
import TrendingThingsNav from "./trending/TrendingThingsNav";
import {
  tryLoginUser,
  tryLoginWithFacebook,
  toggleActivationModal,
  setLanguage
} from "./actions/actions";
import { connect } from "react-redux";
import { View, Linking } from "react-native";
import SplashScreen from "react-native-splash-screen";
import ActivationModal from "./components/activation/ActivationModal";
import NoInternetWarning from "./components/warnings/NoInternetWarning";
import { getLocale } from "./utils/Utils";

class AppWrapper extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.handleOpenedUrl = this.handleOpenedUrl.bind(this);
  }

  componentDidMount() {
    // hide splash screen
    SplashScreen.hide();

    // try to login if there is a token
    this.props.dispatch(tryLoginUser());
    this.props.dispatch(setLanguage(getLocale()));

    Linking.getInitialURL()
      .then(ev => {
        if (ev) {
          setTimeout(() => {
            this.handleOpenedUrl(null, ev);
          }, 1000);
        }
      })
      .catch(err => {});
    Linking.addEventListener("url", this.handleOpenedUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenedUrl);
  }

  handleOpenedUrl(event: any, url?: string) {
    if (
      (url && url.indexOf("activate")) ||
      (event && event.url.indexOf("activate"))
    ) {
      this.props.dispatch(toggleActivationModal(true, url || event.url));
    }
  }

  renderContent() {
    if (!this.props.auth.isAuthenticated) {
      return <LandingPage />;
    } else {
      return <TrendingThingsNav />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
        <ActivationModal />
        <NoInternetWarning />
      </View>
    );
  }
}

interface StateProps {
  auth: any;
}

interface DispatchProps {
  dispatch: any;
}

type Props = StateProps & DispatchProps;

function mapStateToProps(state: any) {
  return {
    auth: state.authentication
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch
  };
}

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapper);
