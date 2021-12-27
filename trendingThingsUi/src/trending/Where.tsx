import * as React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import HeaderImageScrollView from "react-native-image-header-scroll-view";

import SimpleLocationChooser from "./../components/simpleLocationChooser/SimpleLocationChooser";
import ProductChooserModal from "./../components/productChooserModal/ProductChooserModal";

import AskBox from "./where/components/AskBox";
import AskForm from "./where/components/AskForm";
import Questions from "./where/components/Questions";
import Loading from "./where/components/Loading";
import Question from "./where/components/Question";

import {
  getInitialQuestions,
  expandAsk,
  contractAsk,
  hideLocationChooser,
  addLocationToQuestion,
  hideProductChooser,
  selectProductToShare,
  showCommentBox,
  setTabNavigation
} from "./../actions/WhereActions";

import styles from "./where/components/styles";

const MIN_HEIGHT = 5;

interface DispatchProps {
  dispatch: any;
  expandAsk: () => void;
  contractAsk: () => void;
  hideLocationChooser: () => void;
  addLocationToQuestion: (questionId: number, location: Location) => void;
  hideProductChooser: () => void;
  selectProductToShare: (product: any) => void;
  getInitialQuestions: () => void;
  showCommentBox: () => void;
  setTabNavigation: (navigation: any) => void;
}

interface StateProps {
  showQuestion: boolean;
  isAskExpanded: boolean;
  showLocationChooser: boolean;
  question: any;
  showProductChooser: boolean;
}

interface Props {
  navigation: any;
}

interface Location {
  referenceId: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

type ClassProps = StateProps & DispatchProps & Props;

class Where extends React.Component<ClassProps, {}> {
  constructor() {
    super();

    this.handleLocationAdded = this.handleLocationAdded.bind(this);
  }

  componentWillMount() {
    this.props.getInitialQuestions();
  }

  handleLocationAdded(location: Location) {
    this.props.hideLocationChooser();
    this.props.addLocationToQuestion(this.props.question.id, location);
  }

  renderLocationChooser() {
    // render location chooser on absolute position
    if (this.props.showLocationChooser) {
      return (
        <View style={styles.locationChooserWrapper}>
          <SimpleLocationChooser
            onClose={this.props.hideLocationChooser}
            onSubmit={this.handleLocationAdded}
            hasSearchBar
          />
        </View>
      );
    }
  }

  renderQuestion() {
    if (this.props.showQuestion) {
      return <Question />;
    }

    return null;
  }

  renderContent() {
    if (!this.props.isAskExpanded) {
      return <Questions />;
    }

    return <AskForm />;
  }

  render() {
    return (
      <View
        style={{
          position: "relative",
          height: "100%",
          backgroundColor: "white",
          flex: 1
        }}
      >
        {this.renderLocationChooser()}
        <ProductChooserModal
          visible={this.props.showProductChooser}
          close={() => this.props.hideProductChooser()}
          onSelect={(product: any) => {
            this.props.selectProductToShare(product);
            this.props.hideProductChooser();
            this.props.showCommentBox();
          }}
        />
        <View style={{ height: "100%", flex: 1 }}>
          {this.renderQuestion()}
          <HeaderImageScrollView
            maxHeight={this.props.isAskExpanded ? 46 : 80}
            minHeight={MIN_HEIGHT}
            renderTouchableFixedForeground={() => (
              <AskBox
                expandAsk={() => {
                  this.props.expandAsk();
                }}
                contractAsk={() => {
                  this.props.contractAsk();
                }}
                isExpanded={this.props.isAskExpanded}
              />
            )}
          >
            {this.renderContent()}
          </HeaderImageScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showQuestion: state.where.showQuestion,
  isAskExpanded: state.where.isAskExpanded,
  showLocationChooser: state.where.showLocationChooser,
  question: state.where.selectedQuestion,
  showProductChooser: state.where.showProductChooser
});

const mapDispatchToProps = {
  expandAsk,
  contractAsk,
  hideLocationChooser,
  addLocationToQuestion,
  hideProductChooser,
  selectProductToShare,
  getInitialQuestions,
  showCommentBox,
  setTabNavigation
};

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Where);
