import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import TrendingWallPost from "./TrendingWallPost";
import SimpleIcons from "react-native-vector-icons/SimpleLineIcons";
import { isEmpty, size } from "lodash";
import styles from "./styles";
import { locale } from "./../../language/locale";

interface Props {
  documents: any;
  documentsIds: any;
  userId: number;
  loading: boolean;
  renderHeader: () => React.ReactElement<{}>;
  onRefresh: (callback: () => void) => void;
  navigation?: any;
  setRef?: (ref: any) => void;
  emptyText?: string;
  pagination?: number;
  loadMore?: (pagination: number, cb?: any) => void;
  loadingMore?: boolean;
  showRefreshButton?: boolean;
  language: string;
}

interface State {
  pagination: number;
  refreshing: boolean;
}

class TrendingPosts extends React.Component<Props, State> {
  private internalRef: any;

  constructor(props: Props) {
    super(props);

    this.renderPost = this.renderPost.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.state = {
      pagination: 1,
      refreshing: false
    };
  }

  onRefresh() {
    this.setState({
      refreshing: true
    });

    this.props.onRefresh(() => {
      this.setState({
        refreshing: false
      });
    });
  }

  renderPost(documentId: any) {
    const document = this.props.documents[documentId];
    if (document) {
      return (
        <TrendingWallPost
          document={document}
          key={document.id}
          navigation={this.props.navigation}
        />
      );
    }
  }

  renderLoadMoreButton() {
    if (this.props.loadingMore) {
      return (
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <ActivityIndicator color="white" />
        </View>
      );
    }
    if (
      this.props.pagination &&
      this.state.pagination * this.props.pagination ===
        size(this.props.documentsIds)
    ) {
      return (
        <View style={styles.loadMoreWrapper}>
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={() => {
              this.props.loadMore(
                this.state.pagination * this.props.pagination,
                this.setState({
                  pagination: this.state.pagination + 1
                })
              );
            }}
          >
            <SimpleIcons name="arrow-right-circle" color="white" size={15} />
            <Text style={styles.loadMoreText}>
              {locale[this.props.language]["more.button.text"]}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }

  renderRefreshButton() {
    if (this.props.showRefreshButton) {
      return (
        <View style={styles.loadMoreWrapper}>
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={() => {
              this.internalRef.scrollTo({
                y: 0,
                animated: false
              });

              setTimeout(() => {
                this.setState({
                  refreshing: true
                });

                this.props.onRefresh(() => {
                  this.setState({
                    refreshing: false
                  });
                });
              });
            }}
          >
            <Text style={styles.loadMoreText}>
              {locale[this.props.language]["more.button.text"]}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderPosts() {
    if (!this.props.documentsIds || !this.props.documents) {
      return null;
    }

    if (isEmpty(this.props.documentsIds) && !this.props.loading) {
      return (
        <View style={styles.emptyPostsWrapper}>
          <SimpleIcons name="ghost" color="white" size={19} />
          <Text style={styles.emptyPosts}>
            {this.props.emptyText
              ? this.props.emptyText
              : locale[this.props.language]["no.posts.results"]}
          </Text>
        </View>
      );
    }

    if (isEmpty(this.props.documentsIds)) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={["white"]}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              tintColor="white"
            />
          }
          style={{ paddingBottom: 20 }}
          ref={(ref: any) => {
            if (this.props.setRef) {
              this.internalRef = ref;
              this.props.setRef(ref);
            }
          }}
        >
          {this.props.renderHeader()}
          {this.props.documentsIds.map((documentId: number) =>
            this.renderPost(documentId)
          )}
          {this.renderLoadMoreButton()}
          {this.renderRefreshButton()}
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.state.refreshing && this.props.loading ? (
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
            <ActivityIndicator color="white" />
          </View>
        ) : (
          undefined
        )}
        {this.renderPosts()}
      </View>
    );
  }
}

export default TrendingPosts;
