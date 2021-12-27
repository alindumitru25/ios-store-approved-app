import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  closeReactionPanel,
  feedbackQuality,
  unfeedbackQuality,
  feedbackGoodPrice,
  unfeedbackGoodPrice,
  feedbackGoodQualityPriceRatio,
  unfeedbackGoodQualityPriceRatio,
  feedbackWorthIt,
  unfeedbackWorthIt,
  feedbackExpensive,
  unfeedbackExpensive,
  feedbackBadQuality,
  unfeedbackBadQuality
} from "./../../actions/AppActions";
import styles from "./styles";
import { locale } from "./../../language/locale";

interface StateProps {
  openReactionPanel: boolean;
  document: any;
  userId: number;
  language: string;
}

interface DispatchProps {
  closeReactionPanel: () => void;
  feedbackQuality: (documentId: number) => void;
  unfeedbackQuality: (documentId: number) => void;
  feedbackGoodPrice: (documentId: number) => void;
  unfeedbackGoodPrice: (documentId: number) => void;
  feedbackGoodQualityPriceRatio: (documentId: number) => void;
  unfeedbackGoodQualityPriceRatio: (documentId: number) => void;
  feedbackWorthIt: (documentId: number) => void;
  unfeedbackWorthIt: (documentId: number) => void;
  feedbackExpensive: (documentId: number) => void;
  unfeedbackExpensive: (documentId: number) => void;
  hasBadQualityFeedback: (documentId: number) => void;
  unhasBadQualityFeedback: (documentId: number) => void;
  feedbackBadQuality: (documentId: number) => void;
  unfeedbackBadQuality: (documentId: number) => void;
}

interface Props {
  animationType: "none" | "slide" | "fade";
}

type ClassProps = StateProps & DispatchProps & Props;

class ReactionsModal extends React.Component<ClassProps, {}> {
  constructor(props: ClassProps) {
    super(props);
  }

  renderContent() {
    if (!this.props.openReactionPanel) {
      return null;
    }

    const hasQualityFeedback =
      this.props.document.qualityFeedbackUsers &&
      this.props.document.qualityFeedbackUsers[this.props.userId];

    const hasGoodPriceFeedback =
      this.props.document.goodPriceFeedbackUsers &&
      this.props.document.goodPriceFeedbackUsers[this.props.userId];

    const hasGoodQualityPriceRatioFeedback =
      this.props.document.goodQualityPriceRatioFeedbackUsers &&
      this.props.document.goodQualityPriceRatioFeedbackUsers[this.props.userId];

    const hasWorthItFeedback =
      this.props.document.worthItFeedbackUsers &&
      this.props.document.worthItFeedbackUsers[this.props.userId];

    const hasExpensiveFeedback =
      this.props.document.expensiveFeedbackUsers &&
      this.props.document.expensiveFeedbackUsers[this.props.userId];

    const hasBadQualityFeedback =
      this.props.document.badQualityFeedbackUsers &&
      this.props.document.badQualityFeedbackUsers[this.props.userId];

    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.props.closeReactionPanel()}
          style={styles.closeButton}
        >
          <AwesomeIcon name="long-arrow-down" size={16} color="black" />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          style={{ marginTop: 15 }}
          onPress={() =>
            hasWorthItFeedback
              ? this.props.unfeedbackWorthIt(this.props.document.id)
              : this.props.feedbackWorthIt(this.props.document.id)
          }
        >
          <View style={[styles.reaction]}>
            <Text
              style={
                hasWorthItFeedback
                  ? styles.reactionTextActive
                  : styles.reactionText
              }
            >
              {locale[this.props.language]["worth.it"]}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            hasQualityFeedback
              ? this.props.unfeedbackQuality(this.props.document.id)
              : this.props.feedbackQuality(this.props.document.id)
          }
        >
          <View style={[styles.reaction]}>
            <Text
              style={
                hasQualityFeedback
                  ? styles.reactionTextActive
                  : styles.reactionText
              }
            >
              {locale[this.props.language]["quality.product"]}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            hasGoodPriceFeedback
              ? this.props.unfeedbackGoodPrice(this.props.document.id)
              : this.props.feedbackGoodPrice(this.props.document.id)
          }
        >
          <View style={[styles.reaction]}>
            <Text
              style={
                hasGoodPriceFeedback
                  ? styles.reactionTextActive
                  : styles.reactionText
              }
            >
              {locale[this.props.language]["good.price"]}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            hasGoodQualityPriceRatioFeedback
              ? this.props.unfeedbackGoodQualityPriceRatio(
                  this.props.document.id
                )
              : this.props.feedbackGoodQualityPriceRatio(this.props.document.id)
          }
        >
          <View style={[styles.reaction]}>
            <Text
              style={
                hasGoodQualityPriceRatioFeedback
                  ? styles.reactionTextActive
                  : styles.reactionText
              }
            >
              {locale[this.props.language]["good.quality.price.ratio"]}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            hasExpensiveFeedback
              ? this.props.unfeedbackExpensive(this.props.document.id)
              : this.props.feedbackExpensive(this.props.document.id)
          }
        >
          <View style={[styles.reaction]}>
            <Text
              style={
                hasExpensiveFeedback
                  ? styles.reactionTextActive
                  : styles.reactionText
              }
            >
              {locale[this.props.language]["expensive"]}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            hasBadQualityFeedback
              ? this.props.unfeedbackBadQuality(this.props.document.id)
              : this.props.feedbackBadQuality(this.props.document.id)
          }
        >
          <View style={[styles.reaction]}>
            <Text
              style={
                hasBadQualityFeedback
                  ? styles.reactionTextActive
                  : styles.reactionText
              }
            >
              {locale[this.props.language]["bad.quality"]}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.openReactionPanel}
        animationType={this.props.animationType}
        transparent
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => this.props.closeReactionPanel()}
          style={styles.modalWrapper}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modal}>{this.renderContent()}</View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  closeReactionPanel,
  feedbackQuality,
  unfeedbackQuality,
  feedbackGoodPrice,
  unfeedbackGoodPrice,
  feedbackGoodQualityPriceRatio,
  unfeedbackGoodQualityPriceRatio,
  feedbackWorthIt,
  unfeedbackWorthIt,
  feedbackExpensive,
  unfeedbackExpensive,
  feedbackBadQuality,
  unfeedbackBadQuality
};

const mapStateToProps = (state: any) => {
  const documentId = state.applicationData.reactionPanelId;
  return {
    openReactionPanel: state.applicationData.openReactionPanel,
    document: documentId ? state.applicationData.documents[documentId] : null,
    userId: state.applicationData.userId,
    language: state.app.language
  };
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ReactionsModal);
