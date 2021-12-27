import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from "react-native";
import { editDocument } from "./../../actions/AppActions";
import styles from "./styles";
import { locale } from "./../../language/locale";

type ClassProps = Props & StoreProps & DispatchProps;

interface Props {
  screenProps: any;
  navigation: any;
}

interface DispatchProps {
  editDocument: (documentId: number, newPrice: number) => {};
}

interface StoreProps {
  documentId: number;
  language: string;
}

interface State {
  newPrice: string;
  newPriceError: boolean;
}

class ShareModal extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      newPrice: null,
      newPriceError: false
    };
  }

  onEditProduct() {
    if (!this.state.newPrice) {
      this.setState({
        newPriceError: true
      });
      return;
    } else {
      this.setState({
        newPriceError: false
      });
    }

    this.props.editDocument(
      this.props.documentId,
      parseFloat(this.state.newPrice.replace(",", "."))
    );
  }

  renderHeader() {
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
          {locale[this.props.language]["edit.post.description"]}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              position: "relative",
              flex: 1
            }}
          >
            {this.renderHeader()}
            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                margin: 4,
                borderRadius: 17,
                marginTop: 20
              }}
            >
              <View>
                <View
                  style={[
                    {
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      borderWidth: 1,
                      borderRadius: 17,
                      padding: 8
                    }
                  ]}
                >
                  <TextInput
                    placeholderTextColor="black"
                    value={this.state.newPrice}
                    onChangeText={value => {
                      this.setState({
                        newPrice: value
                      });
                    }}
                    placeholder={
                      locale[this.props.language]["edit.post.add.price"]
                    }
                    style={styles.textInputBlack}
                    keyboardType="numeric"
                  />
                </View>
                {this.state.newPriceError ? (
                  <Text style={{ color: "red", marginTop: 5 }}>
                    {locale[this.props.language]["edit.post.add.price"]}
                  </Text>
                ) : (
                  undefined
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15
              }}
            >
              <TouchableOpacity onPress={() => this.onEditProduct()}>
                <View style={styles.headerButton}>
                  <Text style={styles.headerButtonText}>
                    {locale[this.props.language]["edit.post.update.product"]}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any): StoreProps => ({
  documentId: ownProps.navigation.state.params.documentId,
  language: state.app.language
});

const mapDispatchToProps = {
  editDocument
};

export default connect<StoreProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(ShareModal);
