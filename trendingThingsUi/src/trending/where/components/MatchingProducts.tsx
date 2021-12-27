import * as React from "react";
import { connect } from "react-redux";
import common from "./../../../styles/CommonStyles";
import styles from "./styles";
import Posts from "./../../trendingWall/Posts";
import { GLOBAL_URL } from "./../../../utils/Globals";
import { View, ActivityIndicator, Text, Image } from "react-native";
import { values } from "lodash";

interface StateProps {
  showLoader: boolean;
  products: any;
}

const Content = ({ showLoader, products }: StateProps) => {
  if (showLoader) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.productMatchingList}>
      <Posts documents={products} linedStyle />
    </View>
  );
};

const MatchingProducts = (props: StateProps) => {
  if (props.products) {
    return <Content {...props} />;
  }

  return (
    <View style={styles.placeHolderContainer}>
      <Text style={styles.placeHolderText}>REZULTATE CĂUTARE</Text>
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  showLoader: state.where.showMatchingProductsLoader,
  products: state.where.matchingProducts
});

export default connect<StateProps, {}, {}>(mapStateToProps)(MatchingProducts);
