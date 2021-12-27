import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView
} from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { values, find, without, includes } from "lodash";
import { CheckBox } from "react-native-elements";

import {
  toggleShowFilter,
  setFilter,
  fetchTags
} from "./../../actions/AppActions";
import styles from "./styles";
import { locale } from "./../../language/locale";

interface StateProps {
  showFilter: boolean;
  userId: number;
  categories: any;
  filter: any;
  tags: any;
  language: string;
  loadingTags: boolean;
}

interface DispatchProps {
  toggleShowFilter: (show: boolean) => void;
  setFilter: (filter: any) => void;
  fetchTags: () => void;
}

interface Props {
  animationType: "none" | "slide" | "fade";
}

interface State {
  showCategoryFilter: boolean;
  showTagsFilter: boolean;
  tempFilters: any;
}

type ClassProps = StateProps & DispatchProps & Props;

class ReactionsModal extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      showCategoryFilter: false,
      showTagsFilter: false,
      tempFilters: null
    };
  }

  componentDidMount() {
    // hold a temp copy of filter to be saved when user agrees
    this.setState({
      tempFilters: this.props.filter ? this.props.filter.filters : null
    });
  }

  componentWillReceiveProps(nextProps: ClassProps) {
    if (!nextProps.showFilter) {
      this.setState({
        showCategoryFilter: false,
        showTagsFilter: false,
        tempFilters: null
      });
    }

    if (
      (!this.props.showFilter && nextProps.showFilter) ||
      this.props.filter !== nextProps.filter
    ) {
      this.setState({
        tempFilters: nextProps.filter ? nextProps.filter.filters : null
      });
    }

    if (!this.props.showFilter && nextProps.showFilter) {
      this.props.fetchTags();
    }
  }

  toggleCategoryFilter(show: boolean) {
    this.setState({
      showCategoryFilter: show
    });
  }

  toggleTagsFilter(show: boolean) {
    this.setState({
      showTagsFilter: show
    });
  }

  setCategoryFilter(categoryFilter: number[]) {
    this.setState({
      tempFilters: {
        ...this.state.tempFilters,
        ["categoryId"]: categoryFilter
      }
    });
  }

  setTagFilter(tagFilter: number[]) {
    this.setState({
      tempFilters: {
        ...this.state.tempFilters,
        ["tags"]: tagFilter
      }
    });
  }

  applyFilter() {
    this.props.setFilter(this.state.tempFilters);
  }

  renderTagsFilter() {
    if (this.props.tags) {
      return (
        <View style={styles.filterContent}>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={styles.filterTitle}>
              {locale[this.props.language]["choose.tags.and.intentions"]}
            </Text>
            <TouchableHighlight
              style={{ padding: 5 }}
              underlayColor="transparent"
              onPress={() => this.toggleTagsFilter(false)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AwesomeIcon
                  name="arrow-circle-o-left"
                  size={15}
                  color="black"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.filterTitle}>
                  {locale[this.props.language]["general.back"]}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <ScrollView style={{ marginTop: 5, width: "100%" }}>
            {values(this.props.tags).map((tag: any) => {
              const tagsFilters = this.state.tempFilters
                ? this.state.tempFilters["tags"]
                : undefined;
              const isChecked = this.state.tempFilters
                ? tagsFilters && includes(tagsFilters, tag.id)
                : false;
              const tagUsageTitle = tag.usage ? ` (${tag.usage})` : "";
              return (
                <CheckBox
                  key={tag.id}
                  title={tag.name + tagUsageTitle}
                  checked={isChecked}
                  containerStyle={styles.checkBox}
                  textStyle={styles.checkBoxText}
                  onPress={() =>
                    isChecked
                      ? this.setTagFilter(without(tagsFilters, tag.id))
                      : this.setTagFilter(
                          tagsFilters ? [...tagsFilters, tag.id] : [tag.id]
                        )
                  }
                />
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 8
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.applyFilter()}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.buttonText}>
                  {locale[this.props.language]["apply.filters.text"]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  renderCategoryFilter() {
    return (
      <View style={styles.filterContent}>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={styles.filterTitle}>
            {locale[this.props.language]["choose.category.text"]}
          </Text>
          <TouchableHighlight
            style={{ padding: 5 }}
            underlayColor="transparent"
            onPress={() => this.toggleCategoryFilter(false)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AwesomeIcon
                name="arrow-circle-o-left"
                size={15}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.filterTitle}>
                {locale[this.props.language]["general.back"]}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <ScrollView style={{ marginTop: 5, width: "100%" }}>
          {values(this.props.categories).map((category: any) => {
            const categoryFilters = this.state.tempFilters
              ? this.state.tempFilters["categoryId"]
              : undefined;
            const isChecked = this.state.tempFilters
              ? categoryFilters && includes(categoryFilters, category.id)
              : false;
            return (
              <CheckBox
                key={category.id}
                title={locale[this.props.language][category.translation]}
                checked={isChecked}
                containerStyle={styles.checkBox}
                textStyle={styles.checkBoxText}
                onPress={() =>
                  isChecked
                    ? this.setCategoryFilter(
                        without(categoryFilters, category.id)
                      )
                    : this.setCategoryFilter(
                        categoryFilters
                          ? [...categoryFilters, category.id]
                          : [category.id]
                      )
                }
              />
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 8
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.applyFilter()}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.buttonText}>
                {locale[this.props.language]["apply.filters.text"]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderContent() {
    if (this.state.showCategoryFilter) {
      return this.renderCategoryFilter();
    }

    if (this.state.showTagsFilter) {
      return this.renderTagsFilter();
    }

    return (
      <View style={styles.contentWrapper}>
        <View style={styles.filterWrapper}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.toggleCategoryFilter(true)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AwesomeIcon
                name="plus-square-o"
                size={14}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.filterTitle}>
                {locale[this.props.language]["filter.modal.filter.category"]}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.filterWrapper}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.toggleTagsFilter(true)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AwesomeIcon
                name="plus-square-o"
                size={14}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.filterTitle}>
                {
                  locale[this.props.language][
                    "filter.modal.filter.tags.and.intentions"
                  ]
                }
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 8
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.applyFilter()}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.buttonText}>
                {locale[this.props.language]["apply.filters.text"]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderLoading() {
    if (this.props.loadingTags) {
      return (
        <View style={{ width: "100%", alignItems: "center", marginBottom: 10 }}>
          <ActivityIndicator color="black" />
        </View>
      );
    }
  }

  render() {
    if (!this.props.showFilter) {
      return null;
    }

    return (
      <Modal
        visible={this.props.showFilter}
        animationType={this.props.animationType}
        transparent
      >
        <View style={styles.modalWrapper}>
          <View
            style={[
              styles.modal,
              this.state.showCategoryFilter || this.state.showTagsFilter
                ? { flex: 1 }
                : null
            ]}
          >
            <Image
              source={require("./../../../images/filter_bg.png")}
              style={{
                position: "relative",
                height: 140,
                width: "100%"
              }}
            >
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.props.toggleShowFilter(false)}
                style={styles.closeButton}
              >
                <Ionicons name="md-close" size={28} color="black" />
              </TouchableHighlight>
              <View style={styles.filterHeader}>
                <Ionicons
                  name="ios-options-outline"
                  size={21}
                  color="#464646"
                  style={styles.filterIcon}
                />
                <Text style={styles.filterText}>
                  {locale[this.props.language]["filter.modal.title"]}
                </Text>
              </View>
            </Image>
            {this.renderLoading()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  toggleShowFilter,
  setFilter,
  fetchTags
};

const mapStateToProps = (state: any) => ({
  showFilter: state.app.showFilter,
  userId: state.applicationData.userId,
  categories: state.applicationData.initialData
    ? state.applicationData.initialData.categories
    : null,
  filter: state.applicationData.initialData
    ? state.applicationData.initialData.filter
    : null,
  tags:
    state.applicationData.initialData && state.applicationData.initialData.tags,
  language: state.app.language,
  loadingTags: state.applicationData.loadingTags
});

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ReactionsModal);
