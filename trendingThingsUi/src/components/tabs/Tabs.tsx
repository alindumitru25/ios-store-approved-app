import * as React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";

import { setActiveTab } from "./../../actions/AppActions";
import { locale } from "./../../language/locale";

interface Props {
  tabs: any;
}

interface StateProps {
  activeTab: number;
  language: string;
}

interface DispatchProps {
  setActiveTab: (activeTab: number) => void;
}

type ClassProps = Props & StateProps & DispatchProps;

class Tabs extends React.Component<ClassProps, {}> {
  renderContent() {
    return (
      <View>
        {(this.props.children as any).length
          ? (this.props.children as any)[this.props.activeTab || 0]
          : this.props.children}
      </View>
    );
  }

  renderTab(tab: any) {
    const isActive = this.props.activeTab
      ? this.props.activeTab === tab.index
      : tab.index === 0;
    return (
      <TouchableHighlight
        style={{ padding: 5 }}
        key={tab.index}
        underlayColor="transparent"
        onPress={() => this.props.setActiveTab(tab.index)}
      >
        <View style={[styles.tab, isActive ? styles.tabActive : null]}>
          <Text
            style={[styles.tabText, isActive ? styles.tabTextActive : null]}
          >
            {tab.count
              ? `${locale[this.props.language][tab.translation]} (${tab.count})`
              : locale[this.props.language][tab.translation]}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderTabs() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab: any) => this.renderTab(tab))}
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderTabs()}
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  activeTab: state.app.activeTab,
  language: state.app.language
});

const mapDispatchToProps = {
  setActiveTab
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);
