import * as React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import KickStarter from "./../kickStarter/KickStarter";
import {
  requestDocuments,
  loadingDocuments,
  setTrendingListRef
} from "./../../actions/AppActions";
import PostListWithIds from "./PostListWithIds";

import styles from "./styles";
import { locale } from "./../../language/locale";

interface DispatchProps {
  requestDocuments: (callback: () => void) => void;
  loadingDocuments: () => void;
  setTrendingListRef: (ref: any) => void;
}

interface StoreProps {
  documents: any;
  trendingIds: any;
  userId: number;
  loading: boolean;
  language: string;
}

type Props = StoreProps & DispatchProps;

class TrendingWall extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh(callback: () => void) {
    this.props.requestDocuments(() => {
      callback();
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: "transparent", flex: 1 }}>
        <PostListWithIds
          documents={this.props.documents}
          documentsIds={this.props.trendingIds}
          userId={this.props.userId}
          setRef={this.props.setTrendingListRef}
          onRefresh={this.onRefresh}
          language={this.props.language}
          renderHeader={() => {
            return (
              <View>
                <View style={styles.shareButtonWrapper}>
                  <KickStarter />
                </View>
                <View
                  style={{
                    marginTop: 40,
                    marginLeft: 15,
                    marginBottom: 15
                  }}
                >
                  <Text style={styles.trendingWallTitle}>
                    {locale[this.props.language]["trending.wall.title"]}
                  </Text>
                </View>
              </View>
            );
          }}
          loading={this.props.loading}
          showRefreshButton
        />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    documents: state.applicationData.documents,
    trendingIds: state.applicationData.trendingIds,
    userId: state.applicationData.userId,
    loading: state.applicationData.loadingDocuments || false,
    language: state.app.language
  };
}

const mapDispatchToProps = {
  requestDocuments,
  loadingDocuments,
  setTrendingListRef
};

export default connect<StoreProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(TrendingWall);
