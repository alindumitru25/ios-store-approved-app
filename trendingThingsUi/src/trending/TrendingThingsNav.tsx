import * as React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import TrendingThings from "./TrendingThings";
import { StackNavigator } from "react-navigation";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  shareModalContainer: {
    width: width,
    height: height
  },
  container: {
    position: "relative",
    height,
    flexDirection: "column",
    flex: 1,
    resizeMode: "cover",
    width
  }
});

interface Props {
  dispatch: any;
  viewReq: any;
}

const TrendingThingsWrapper = ({ navigation }: any) => {
  return (
    <Image
      style={styles.container}
      source={require("./../../images/landing_page.png")}
    >
      <TrendingThings />
    </Image>
  );
};

const TrendingThingsNav = () => <TrendingThingsWrapper />;

export default TrendingThingsNav;
