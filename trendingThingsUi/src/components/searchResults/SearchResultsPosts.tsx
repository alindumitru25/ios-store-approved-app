import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { debounce } from "lodash";
import Spinner from "react-native-spinkit";
import {
  loadingDocuments,
  setTrendingListRef,
  search,
  loadMoreSearches
} from "./../../actions/AppActions";
import common from "./../../styles/CommonStyles";
import PostListWithIds from "./../../trending/trendingWall/PostListWithIds";

import styles from "./styles";
import { locale } from "./../../language/locale";

interface DispatchProps {
  requestDocuments: (callback: () => void) => void;
  setTrendingListRef: (ref: any) => void;
  search: (cb?: any) => void;
  loadMoreSearches: (pagination: number, cb?: any) => void;
}

interface StoreProps {
  documents: any;
  searchIds: any;
  userId: number;
  loading: boolean;
  searchText: string;
  loadingMoreSearches: boolean;
  language: string;
}

type Props = StoreProps & DispatchProps;

interface State {
  refreshing: boolean;
}

class SearchResultsPosts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      refreshing: false
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh(callback: () => void) {
    this.props.search(callback);
  }

  render() {
    return (
      <View style={{ backgroundColor: "transparent", flex: 1 }}>
        {this.props.searchText ? (
          <PostListWithIds
            documents={this.props.documents}
            documentsIds={this.props.searchIds}
            userId={this.props.userId}
            emptyText={locale[this.props.language]["no.results.found"]}
            pagination={10}
            loadMore={this.props.loadMoreSearches}
            loading={this.props.loading}
            loadingMore={this.props.loadingMoreSearches}
            onRefresh={this.onRefresh}
            language={this.props.language}
            renderHeader={() => {
              return (
                <View
                  style={{ marginTop: 30, marginLeft: 15, marginBottom: 15 }}
                >
                  <Text style={styles.title}>
                    {locale[this.props.language]["search.results.text"]}
                  </Text>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    documents: state.applicationData.documents,
    searchIds: state.applicationData.searchIds || [],
    userId: state.applicationData.userId,
    loading: state.applicationData.searchingDocuments || false,
    searchText: state.applicationData.searchText,
    loadingMoreSearches: state.applicationData.loadingMoreSearches,
    language: state.app.language
  };
}

const mapDispatchToProps = {
  setTrendingListRef,
  search,
  loadMoreSearches
};

export default connect<StoreProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsPosts);
