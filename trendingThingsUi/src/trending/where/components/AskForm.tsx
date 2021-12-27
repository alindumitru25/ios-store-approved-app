import * as React from "react";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { connect } from "react-redux";

import {
  setQuestionCategory,
  submitQuestion,
  setAttachmentPhoto
} from "./../../../actions/WhereActions";
import MatchingProducts from "./MatchingProducts";

interface Props {}

interface StoreProps {
  categories: any;
  selectCategory: number;
  photo: string;
}

interface DispatchProps {
  dispatch: any;
}

interface State {
  showAskQuestion: boolean;
}

type ClassProps = Props & StoreProps & DispatchProps;

class AskForm extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      showAskQuestion: false
    };

    this.submitQuestion = this.submitQuestion.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }

  pickImage() {
    ImagePicker.showImagePicker({ noData: true }, (response: any) => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        alert(
          "Insuficiente permisiuni sau ceva a mers gresit. Intra in Settings -> Produse Clever pentru a seta permisiunile"
        );
        return;
      }

      const photo = {
        name: response.name,
        path: response.uri
      };

      this.props.dispatch(setAttachmentPhoto(photo));
    });
  }

  submitQuestion() {
    this.props.dispatch(submitQuestion());
  }

  selectCategory(id: number) {
    this.props.dispatch(setQuestionCategory(id));
  }

  renderCategory(category: any) {
    const activeElement =
      this.props.selectCategory === category.id ? styles.activeText : null;
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.selectCategory.bind(this, category.id)}
        key={category.id}
        style={styles.categoryTouch}
      >
        <Text style={[styles.categoryText, activeElement]}>
          {category.name}
        </Text>
      </TouchableHighlight>
    );
  }

  renderCategories() {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={{ justifyContent: "center" }}
        style={styles.grayBg}
      >
        {this.props.categories.map((category: any) =>
          this.renderCategory(category)
        )}
      </ScrollView>
    );
  }

  renderPhotoButton() {
    if (!this.props.photo) {
      return (
        <TouchableHighlight onPress={this.pickImage} style={styles.button}>
          <View style={styles.buttonContainer}>
            <Ionicons
              style={styles.buttonIcon}
              name="ios-attach-outline"
              size={20}
              color="#464646"
            />
            <Text style={styles.categoryText}>Add Photo</Text>
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <TouchableHighlight onPress={this.pickImage} style={styles.button}>
        <View style={styles.buttonContainer}>
          <Ionicons
            style={styles.buttonIcon}
            name="ios-attach-outline"
            size={20}
            color="#464646"
          />
          <Text style={styles.categoryText}> Modify photo (1)</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderOtherButtons() {
    return (
      <View style={{ flexDirection: "row" }}>
        {this.renderPhotoButton()}
        <TouchableHighlight style={styles.button}>
          <View style={styles.buttonContainer}>
            <Ionicons
              style={styles.buttonIcon}
              name="ios-pin-outline"
              size={20}
              color="#464646"
            />
            <Text style={styles.categoryText}>Add Location</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.submitQuestion}
          style={[styles.button, { backgroundColor: "#3d3d3d" }]}
        >
          <View style={styles.buttonContainer}>
            <Ionicons
              style={styles.buttonIcon}
              name="ios-send-outline"
              size={20}
              color="white"
            />
            <Text style={[styles.categoryText, { color: "white" }]}>
              Submit
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  renderAskQuestion() {
    const infoText = `Adauga categoria ${this.props.photo ? "(1 photo)" : ""}`;
    if (this.state.showAskQuestion) {
      return (
        <View style={{ padding: 10 }}>
          <Text style={styles.questionsTitle}>
            Adauga categorie, pune mai multe informatii si intreaba!
          </Text>
          {this.renderCategories()}
          <Text style={styles.questionsTitle}>{infoText}</Text>
          {this.renderOtherButtons()}
        </View>
      );
    }

    return (
      <View style={styles.askQuestionButton}>
        <TouchableHighlight
          onPress={() => {
            this.setState({
              showAskQuestion: true
            });
          }}
        >
          <Text style={styles.questionsTitleBigOrange}>
            Dacă nu găseşti ce cauti, click pentru a întreba!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    const infoText = `Add more info ${this.props.photo ? "(1 photo)" : ""}`;
    return (
      <View style={{ flex: 1 }}>
        {this.renderAskQuestion()}
        <Text
          style={[styles.questionsTitleBig, { marginTop: 15, padding: 10 }]}
        >
          Rezultate pentru căutarea ta
        </Text>
        <MatchingProducts />
      </View>
    );
  }
}

const mapStateToProps = (state: any): StoreProps => ({
  categories: state.applicationData.initialData.categories,
  selectCategory: state.where.selectedCategory,
  photo: state.where.photo
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  dispatch
});

export default connect<StoreProps, DispatchProps, Props>(mapStateToProps)(
  AskForm
);
