import * as React from "react";
import {
  View,
  Modal,
  Text,
  TouchableHighlight,
  ScrollView,
  Image
} from "react-native";
import moment from "moment";
import { requestOwnDocuments } from "./../../actions/AppActions";
import { connect } from "react-redux";
import { values, isEmpty } from "lodash";

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import { GLOBAL_URL } from "./../../utils/Globals";

interface StateProps {
  userId: number;
  products: any;
}

interface Props {
  visible?: boolean;
  animationType?: "slide" | "none" | "fade";
  close: () => void;
  onSelect: (product: any) => void;
}

interface DispatchProps {
  requestOwnDocuments: () => void;
}

interface ProductProps {
  product: any;
  userId: number;
  onSelect: (product: any) => void;
}

type ClassProps = StateProps & Props & DispatchProps;

const Product = ({ product, userId, onSelect }: ProductProps) => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => onSelect(product)}
    >
      <View style={styles.productWrapper}>
        <View style={styles.productHeader}>
          <Text style={styles.productTitle}>{product.description}</Text>
        </View>
        <View style={styles.productImageWrapper}>
          <FastImage
            source={{
              uri: `${GLOBAL_URL}/document/image/${product.imageId}`,
              priority: FastImage.priority.normal
            }}
            style={styles.productImage}
          />
        </View>
        <View style={styles.productBottom}>
          <View style={styles.postAvatarWrapper}>
            <FastImage
              source={{
                uri: `${GLOBAL_URL}/user/avatar/${userId}`,
                priority: FastImage.priority.normal
              }}
              style={styles.postAvatar}
            />
          </View>
          <Text style={styles.bottomText}>{`Adăugat de tine in data de ${moment(
            product.createdAt
          ).format("MMMM Do YYYY, h a")}`}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

class ProductChooserModal extends React.Component<ClassProps, {}> {
  public static defaultProps: Partial<Props> = {
    visible: false,
    animationType: "slide"
  };

  componentWillReceiveProps(nextProps: ClassProps) {
    if (nextProps.visible && !this.props.visible) {
      this.props.requestOwnDocuments();
    }
  }

  renderProducts() {
    if (!this.props.products || isEmpty(this.props.products)) {
      return (
        <View style={styles.emptyWrapper}>
          <AwesomeIcon name="ban" size={40} />
          <Text style={styles.emptyText}>
            Nu ai adăugat produse. Apasă aici pentru a adăuga
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.productsWrapper}>
        {values(this.props.products).map((product: any) => (
          <Product
            key={product.id}
            product={product}
            userId={this.props.userId}
            onSelect={this.props.onSelect}
          />
        ))}
      </ScrollView>
    );
  }

  render() {
    const { visible, animationType, close } = this.props;
    return (
      <Modal visible={visible} animationType={animationType} transparent>
        <View style={styles.modalWrapper}>
          <View style={styles.modal}>
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
                onPress={() => close()}
                style={styles.closeButton}
              >
                <Ionicons name="md-close" size={28} color="black" />
              </TouchableHighlight>
              <View style={styles.headerContent}>
                <Ionicons
                  name="ios-eye-outline"
                  size={26}
                  color="#464646"
                  style={styles.headerIcon}
                />
                <Text style={styles.title}>Produsele tale</Text>
              </View>
            </Image>
            <View style={styles.content}>{this.renderProducts()}</View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  requestOwnDocuments
};

const mapStateToProps = (state: any) => {
  const userId = state.applicationData.userId;

  return {
    userId,
    products: state.applicationData ? state.applicationData.ownDocuments : null
  };
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ProductChooserModal);
