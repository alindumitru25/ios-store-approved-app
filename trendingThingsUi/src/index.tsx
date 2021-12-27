import * as React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import Connection from "./socket/Connection";
import AppWrapper from "./AppWrapper";
import reducer from "./reducers/reducer";
import { StatusBar, View } from "react-native";
import { setCustomText } from "react-native-global-props";

const bodyTextProps = {
  style: {
    fontSize: 14,
    fontWeight: "300"
  }
};

// Application entry
export default class App extends React.Component<{}, {}> {
  private store: any;

  constructor() {
    super();
    let socketConnection = new Connection();
    let createStoreWithMiddleware = applyMiddleware(
      thunkMiddleware.withExtraArgument(socketConnection)
    )(createStore);
    this.store = createStoreWithMiddleware(reducer);
    setCustomText(bodyTextProps);
  }

  render() {
    return (
      <Provider store={this.store}>
        <View style={{ flexGrow: 1 }}>
          <StatusBar barStyle="light-content" />
          <AppWrapper />
        </View>
      </Provider>
    );
  }
}
