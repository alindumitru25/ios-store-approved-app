import * as React from "react";
import { connect } from "react-redux";
import { saveDocument } from "./../../actions/AppActions";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import SimpleLocationChooser from "./../../components/simpleLocationChooser/SimpleLocationChooser";
import Spinner from "react-native-spinkit";
import { CheckBox, Button, FormInput, FormLabel } from "react-native-elements";
import { values, find, includes, startsWith } from "lodash";
import { NavigationActions } from "react-navigation";
import {
  setShareModalDescription,
  closeTagsOverlay,
  showTagsOverlay,
  toggleShareLocationChooser,
  toggleCategoriesModal,
  toggleTagsModal,
  setShareLocationChooser,
  setPrice,
  setCategoryId,
  setTag,
  unsetTag,
  toggleEditPriceLater,
  addCustomTag,
  toggleCheckCustomTag,
  clearCustomTagFromText
} from "./../../actions/ShareModalActions";
import { clearShareModal, fetchTags } from "./../../actions/AppActions";
import { locale } from "./../../language/locale";
import { ifIphoneX } from "react-native-iphone-x-helper";

type ClassProps = Props & StoreProps & DispatchProps;

interface Props {
  screenProps: any;
  navigation: any;
}

interface DispatchProps {
  setShareModalDescription: (value: any) => void;
  setSelectedTags: (value: any) => void;
  closeTagsOverlay: () => void;
  showTagsOverlay: () => void;
  clearShareModal: () => void;
  toggleShareLocationChooser: (show: boolean) => void;
  toggleCategoriesModal: (show: boolean) => void;
  toggleTagsModal: (show: boolean) => void;
  saveDocument: (...props: any[]) => void;
  setShareLocationChooser: (location: any) => void;
  setPrice: (price: string) => void;
  setCategoryId: (id: number) => void;
  setTag: (tagId: number) => void;
  unsetTag: (tagId: number) => void;
  toggleEditPriceLater: (show: boolean) => void;
  fetchTags: () => void;
  addCustomTag: (tagName: string, fromText?: boolean) => void;
  toggleCheckCustomTag: (tagName: string, isChecked: boolean) => void;
  clearCustomTagFromText: () => void;
}

interface StoreProps {
  photo: any;
  tags: any;
  selectedTags: any;
  description: any;
  showCategoriesModal: boolean;
  showTagsModal: boolean;
  showShareLocationChooser: boolean;
  shareLocation: any;
  price: string;
  categoryId: number;
  categories: any;
  loading: boolean;
  language: string;
  isEditPriceLaterChecked: boolean;
  loadingTags: boolean;
  customTags: any;
}

interface State {
  descriptionError: boolean;
  priceError: boolean;
  locationError: boolean;
  step: number;
  showAddNewTag: boolean;
  newTagInput: string;
}

class ShareModal extends React.Component<ClassProps, State> {
  private addTagFormInput: any;

  constructor(props: ClassProps) {
    super(props);

    this.state = {
      locationError: false,
      priceError: false,
      descriptionError: false,
      step: 1,
      showAddNewTag: false,
      newTagInput: null
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOnContinue = this.handleOnContinue.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  componentWillReceiveProps(nextProps: ClassProps) {
    if (!nextProps.photo) {
      this.setState({
        step: 1
      });
    }
  }

  handleClose() {
    const action = NavigationActions.back();
    this.props.clearShareModal();
  }

  handleOnContinue() {
    if (!this.props.description) {
      this.setState({
        descriptionError: true
      });
      return;
    } else {
      this.setState({
        descriptionError: false
      });
    }

    if (!this.props.price && !this.props.isEditPriceLaterChecked) {
      this.setState({
        priceError: true
      });
      return;
    } else {
      this.setState({
        priceError: false
      });
    }

    if (!this.props.shareLocation) {
      this.setState({
        locationError: true
      });
      return;
    } else {
      this.setState({
        locationError: false
      });
    }

    const hasTags = /[#]+[A-Za-z0-9-_]+/g;
    const hashTags = this.props.description.match(hasTags);

    if (hashTags) {
      // clear previous tags from text
      this.props.clearCustomTagFromText();
      hashTags.forEach((tag: string) => {
        this.props.addCustomTag(tag, true);
      });
    }

    this.setState({
      step: 2
    });
  }

  handleOnBack() {
    this.setState({
      step: 1
    });
  }

  addProduct() {
    this.props.saveDocument();
  }

  addTag() {
    const tags = this.state.newTagInput.split(" ");
    tags.forEach(tag => {
      this.props.addCustomTag(startsWith(tag, "#") ? tag : `#${tag}`);
    });

    this.setState({
      newTagInput: null
    });

    setTimeout(() => {
      if (this.addTagFormInput) {
        this.addTagFormInput.focus();
      }
    }, 0);
  }

  renderCustomTags() {
    if (this.props.customTags) {
      return (
        <View style={{ maxHeight: "40%" }}>
          <Text
            style={{
              marginTop: 8,
              fontSize: 18,
              color: "black",
              fontFamily: "Raleway"
            }}
          >
            {locale[this.props.language]["share.tags.others"]}
          </Text>
          <ScrollView style={{ marginTop: 5, width: "100%" }}>
            <View style={{ flex: 1 }}>
              {values(this.props.customTags).map((tag: any) => {
                const isChecked = tag.isChecked;

                return (
                  <CheckBox
                    key={tag.name}
                    title={tag.name}
                    checked={isChecked}
                    containerStyle={styles.checkBox}
                    textStyle={styles.checkBoxText}
                    onPress={() =>
                      isChecked
                        ? this.props.toggleCheckCustomTag(tag.name, false)
                        : this.props.toggleCheckCustomTag(tag.name, true)
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  renderPopularTags() {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            color: "black",
            fontFamily: "Raleway"
          }}
        >
          {locale[this.props.language]["share.tags.popular"]}
        </Text>
        <ScrollView style={{ marginTop: 5, width: "100%" }}>
          <View style={{ flex: 1 }}>
            {values(this.props.tags).map((tag: any) => {
              const isChecked = includes(this.props.selectedTags, tag.id);

              return (
                <CheckBox
                  key={tag.id}
                  title={tag.name}
                  checked={isChecked}
                  containerStyle={styles.checkBox}
                  textStyle={styles.checkBoxText}
                  onPress={() =>
                    isChecked
                      ? this.props.unsetTag(tag.id)
                      : this.props.setTag(tag.id)
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  renderAddTagButton() {
    return (
      <Button
        icon={{ name: "add" }}
        buttonStyle={{
          borderRadius: 27,
          height: 40,
          maxWidth: 350
        }}
        textStyle={{
          fontSize: 15
        }}
        containerViewStyle={{
          marginLeft: 0,
          width: "100%",
          alignItems: "center"
        }}
        title={locale[this.props.language]["share.tags.own"]}
        onPress={() => {
          this.setState({
            showAddNewTag: true
          });

          setTimeout(() => {
            if (this.addTagFormInput) {
              this.addTagFormInput.focus();
            }
          }, 0);
        }}
      />
    );
  }

  renderAddTag() {
    return (
      <View style={{ position: "relative" }}>
        <FormLabel
          containerStyle={styles.addTagLabelContainer}
          labelStyle={styles.addTagLabelStyle}
        >
          {locale[this.props.language]["share.tags.own"]}
        </FormLabel>
        <FormInput
          onChangeText={(value: string) => {
            this.setState({
              newTagInput: value
            });
          }}
          value={this.state.newTagInput}
          containerStyle={styles.addTagFormContainerStyle}
          inputStyle={styles.addTagInputStyle}
          ref={(elem: any) => {
            this.addTagFormInput = elem;
          }}
        />
        <View style={styles.addTagActionButtonsWrapper}>
          <TouchableOpacity
            onPress={() => {
              if (this.state.newTagInput) {
                this.addTag();
              }
            }}
            style={[
              styles.addTagActionButtons,
              { borderColor: !this.state.newTagInput ? "#cccccc" : "black" }
            ]}
            hitSlop={{ top: 4, right: 4, left: 4, bottom: 4 }}
          >
            <Text
              style={{
                color: !this.state.newTagInput ? "#cccccc" : "black"
              }}
            >
              {locale[this.props.language]["share.modal.add.tag.button.text"]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                showAddNewTag: false,
                newTagInput: null
              });
            }}
            hitSlop={{ top: 4, right: 4, left: 4, bottom: 4 }}
          >
            <Icon name="close" size={19} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderLoadingTags() {
    if (this.props.loadingTags) {
      return (
        <View style={styles.tagsLoadingWrapper}>
          <ActivityIndicator color="black" />
        </View>
      );
    }
  }

  renderTagsModal() {
    if (this.props.showTagsModal) {
      return (
        <Modal
          visible={this.props.showTagsModal}
          animationType="fade"
          transparent
        >
          <View style={[styles.modalWrapper]}>
            {this.props.loadingTags ? (
              this.renderLoadingTags()
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss();
                }}
                style={styles.stretch}
              >
                <View style={[styles.stretch, { maxHeight: "90%" }]}>
                  <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={ifIphoneX(80, 60)}
                    style={styles.stretch}
                  >
                    <View style={styles.stretch}>
                      <View style={styles.tagsHeaderWrapper}>
                        <Text style={styles.tagsHeaderText}>
                          {locale[this.props.language]["share.tags.text"]}
                        </Text>
                      </View>
                      <View
                        style={[styles.modal, { paddingBottom: 15, flex: 1 }]}
                      >
                        {this.renderPopularTags()}
                        {this.renderCustomTags()}
                        <View style={{ marginTop: 10 }}>
                          {this.state.showAddNewTag
                            ? this.renderAddTag()
                            : this.renderAddTagButton()}
                        </View>
                      </View>
                      <View style={styles.doneButtonWrapper}>
                        <TouchableOpacity
                          style={styles.doneButton}
                          onPress={() => this.props.toggleTagsModal(false)}
                        >
                          <View style={styles.roundOutButton}>
                            <Text style={styles.roundOutButtonText}>
                              {locale[this.props.language]["general.done"]}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </KeyboardAvoidingView>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </Modal>
      );
    }
  }

  renderCategoriesModal() {
    if (this.props.showCategoriesModal) {
      return (
        <Modal
          visible={this.props.showCategoriesModal}
          animationType="fade"
          transparent
        >
          <View style={[styles.modalWrapper]}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                marginBottom: 5,
                maxHeight: "90%"
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  fontFamily: "Raleway"
                }}
              >
                {locale[this.props.language]["share.category.text"]}
              </Text>
            </View>
            <View style={[styles.modal]}>
              <ScrollView style={{ marginTop: 5, width: "100%" }}>
                <View style={{ flex: 1 }}>
                  {values(this.props.categories).map((category: any) => {
                    const isChecked = category.id === this.props.categoryId;

                    return (
                      <CheckBox
                        key={category.id}
                        title={
                          locale[this.props.language][category.translation]
                        }
                        checked={isChecked}
                        containerStyle={styles.checkBox}
                        textStyle={styles.checkBoxText}
                        onPress={() => {
                          this.props.setCategoryId(category.id);
                        }}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() => this.props.toggleCategoriesModal(false)}
            >
              <View style={styles.roundOutButton}>
                <Text style={styles.roundOutButtonText}>
                  {locale[this.props.language]["general.done"]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
  }

  renderLocationChooser() {
    if (this.props.showShareLocationChooser) {
      return (
        <View style={styles.locationChooser}>
          <SimpleLocationChooser
            onClose={() => {
              this.props.toggleShareLocationChooser(false);
            }}
            onSubmit={(location: any) => {
              this.props.toggleShareLocationChooser(false);
              this.props.setShareLocationChooser(location);
            }}
            hasSearchBar
          />
        </View>
      );
    }
  }

  renderHeader() {
    if (this.props.loading) {
      return (
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Raleway",
            fontSize: 21,
            color: "white",
            fontWeight: "300",
            marginTop: 10,
            backgroundColor: "transparent"
          }}
        >
          {locale[this.props.language]["share.add.product.loading.text"]}
        </Text>
      );
    }

    let text;

    switch (this.state.step) {
      case 1:
        text = locale[this.props.language]["share.step.1.description"];
        break;
      case 2:
        text = locale[this.props.language]["share.step.2.description"];
        break;
      default:
        text = locale[this.props.language]["share.step.1.description"];
    }

    return (
      <View
        style={{
          padding: 10,
          paddingLeft: 5,
          paddingRight: 5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Raleway",
            fontSize: 21,
            color: "white",
            fontWeight: "300"
          }}
        >
          {text}
        </Text>
        {this.state.step === 2 ? (
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={this.handleOnBack}
          >
            <View style={styles.headerButton}>
              <Text style={styles.headerButtonText}>
                {locale[this.props.language]["general.back"]}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          undefined
        )}
      </View>
    );
  }

  renderSelectedTags() {
    if (!this.props.selectedTags && !this.props.customTags) {
      return <Text>{locale[this.props.language]["share.tags.text"]}</Text>;
    }

    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {this.props.selectedTags &&
          this.props.selectedTags.map((tag: any) => {
            const currentTag = find(this.props.tags, t => t.id === tag);
            return (
              <Text
                key={tag}
                style={{ fontWeight: "600", marginLeft: 3, fontSize: 15 }}
              >
                {currentTag.name}
              </Text>
            );
          })}
        {this.props.customTags &&
          values(this.props.customTags).map((tag: any) => {
            if (tag.isChecked) {
              return (
                <Text
                  key={tag.name}
                  style={{ fontWeight: "600", fontSize: 15, marginLeft: 3 }}
                >
                  {tag.name}
                </Text>
              );
            }
          })}
      </View>
    );
  }

  render() {
    if (!this.props.photo) {
      return null;
    }

    let stepContent;

    switch (this.state.step) {
      case 1:
      default:
        stepContent = (
          <View>
            <View>
              <View style={styles.descriptionWrapper}>
                <Icon
                  name="note"
                  size={16}
                  style={styles.absoluteIcon}
                  color="black"
                />
                <TextInput
                  placeholderTextColor="black"
                  multiline={true}
                  value={this.props.description}
                  onChangeText={value => {
                    this.props.setShareModalDescription(value);
                  }}
                  placeholder={
                    locale[this.props.language]["add.description.text"]
                  }
                  style={styles.textInputBlackWithIcon}
                />
              </View>
              {this.state.descriptionError ? (
                <Text style={styles.errorWrapper}>
                  {locale[this.props.language]["add.description.error"]}
                </Text>
              ) : (
                undefined
              )}
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: this.props.isEditPriceLaterChecked
                    ? "#c2c2c2"
                    : "black"
                }}
              >
                {locale[this.props.language]["add.price.text"]}
              </Text>
              <View style={styles.priceWrapper}>
                <TextInput
                  editable={!this.props.isEditPriceLaterChecked}
                  placeholderTextColor="black"
                  multiline={false}
                  value={this.props.price || ""}
                  onChangeText={value => this.props.setPrice(value)}
                  keyboardType="numeric"
                  style={[
                    styles.textInputBlack,
                    this.props.isEditPriceLaterChecked
                      ? styles.disabledInput
                      : null
                  ]}
                />
              </View>
              {this.state.priceError ? (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {locale[this.props.language]["add.price.error"]}
                </Text>
              ) : (
                undefined
              )}
            </View>
            <CheckBox
              key="edit.later"
              title={locale[this.props.language]["edit.price.later"]}
              checked={this.props.isEditPriceLaterChecked}
              containerStyle={styles.checkBox}
              textStyle={styles.checkBoxText}
              onPress={() =>
                this.props.toggleEditPriceLater(
                  !this.props.isEditPriceLaterChecked
                )
              }
            />
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {locale[this.props.language]["add.location.text"]}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.toggleShareLocationChooser(true);
                }}
                style={styles.locationWrapper}
              >
                <Ionicons name="ios-pin-outline" color="black" size={17} />
                <Text numberOfLines={1} style={{ marginLeft: 5, fontSize: 15 }}>
                  {this.props.shareLocation
                    ? this.props.shareLocation.address
                    : locale[this.props.language]["add.location.error"]}
                </Text>
              </TouchableOpacity>
              {this.state.locationError ? (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {locale[this.props.language]["add.location.error"]}
                </Text>
              ) : (
                undefined
              )}
            </View>
          </View>
        );
        break;
      case 2:
        stepContent = (
          <View>
            <View>
              <Text style={{ fontSize: 15 }}>
                {locale[this.props.language]["category.text"]}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.toggleCategoriesModal(true);
                }}
                style={styles.categoryWrapper}
              >
                <Text style={{ marginLeft: 5, fontSize: 15 }}>
                  {this.props.categoryId
                    ? locale[this.props.language][
                        find(
                          this.props.categories,
                          category => category.id === this.props.categoryId
                        ).translation
                      ]
                    : locale[this.props.language]["share.category.text"]}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {locale[this.props.language]["tags.text"]}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.toggleTagsModal(true);
                  this.props.fetchTags();
                }}
                style={styles.tagsWrapper}
              >
                <View style={{ marginLeft: 5 }}>
                  {this.renderSelectedTags()}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.renderWrapper}>
            {this.renderHeader()}
            <View style={styles.contentWrapper}>
              {this.props.loading ? (
                <View style={styles.loadingWrapper}>
                  <Spinner isVisible size={30} type="Arc" color="#464646" />
                </View>
              ) : (
                stepContent
              )}
            </View>
            <View style={styles.stepWrapper}>
              {this.state.step === 1 ? (
                <TouchableOpacity onPress={this.handleOnContinue}>
                  <View style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>
                      {locale[this.props.language]["general.continue"]}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.addProduct}>
                  <View style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>
                      {locale[this.props.language]["add.product.button"]}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
        {this.renderLocationChooser()}
        {this.renderCategoriesModal()}
        {this.renderTagsModal()}
      </View>
    );
  }
}

function mapStateToProps(state: any, ownProps: any): StoreProps {
  return {
    photo: state.shareModal.photo,
    description: state.shareModal.description,
    showCategoriesModal: state.shareModal.showCategoriesModal,
    showTagsModal: state.shareModal.showTagsModal,
    showShareLocationChooser: state.shareModal.showShareLocationChooser,
    shareLocation: state.shareModal.shareLocation,
    price: state.shareModal.price,
    categoryId: state.shareModal.categoryId,
    categories: state.applicationData.initialData
      ? state.applicationData.initialData.categories
      : null,
    tags:
      state.applicationData.initialData &&
      state.applicationData.initialData.tags,
    selectedTags: state.shareModal.tags,
    loading: state.app.loadingShareModal,
    language: state.app.language,
    isEditPriceLaterChecked: state.shareModal.isEditPriceLaterChecked,
    loadingTags: state.applicationData.loadingTags,
    customTags: state.shareModal.customTags
  };
}

const mapDispatchToProps = {
  setShareModalDescription,
  closeTagsOverlay,
  showTagsOverlay,
  clearShareModal,
  toggleShareLocationChooser,
  toggleCategoriesModal,
  toggleTagsModal,
  setShareLocationChooser,
  setPrice,
  setCategoryId,
  setTag,
  unsetTag,
  saveDocument,
  toggleEditPriceLater,
  fetchTags,
  addCustomTag,
  toggleCheckCustomTag,
  clearCustomTagFromText
};

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ShareModal);
