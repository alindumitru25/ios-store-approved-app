import * as React from "react";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import common from "./../../styles/CommonStyles";
import FastImage from "react-native-fast-image";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { timeAgo, openMap } from "./../../utils/Utils";
import { connect } from "react-redux";
import { GLOBAL_URL } from "./../../utils/Globals";
import { locale } from "./../../language/locale";

import {
  likeScan,
  removeLikeScan,
  dislikeScan,
  removeDislikeScan
} from "./../../actions/AppActions";
import styles from "./styles";

interface StateProps {
  userId: number;
  language: string;
}

interface DispatchProps {
  likeScan: (scanId: number) => void;
  removeLikeScan: (scanId: number) => void;
  dislikeScan: (scanId: number) => void;
  removeDislikeScan: (scanId: number) => void;
}

interface Props {
  scan: any;
  isLastElement: boolean;
}

type ClassProps = StateProps & DispatchProps & Props;

const Scan = ({
  scan,
  userId,
  isLastElement,
  likeScan,
  removeLikeScan,
  dislikeScan,
  removeDislikeScan,
  language
}: ClassProps) => {
  const isLiked = scan.likeUsers ? !!scan.likeUsers[userId] : false;
  const isDisliked = scan.dislikeUsers ? !!scan.dislikeUsers[userId] : false;
  const { user } = scan;

  return (
    <View
      style={[styles.scanWrapper, !isLastElement ? styles.bottomBorder : null]}
    >
      <TouchableOpacity
        onPress={() =>
          openMap(scan.locationDescription, scan.position[0], scan.position[1])
        }
      >
        <View style={{ flex: 1 }}>
          <View style={styles.scan}>
            <View
              style={{
                height: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <View style={common.post_avatar_wrapper}>
                <FastImage
                  source={{
                    uri: `${GLOBAL_URL}/user/avatar/${user.id}`,
                    priority: FastImage.priority.normal
                  }}
                  style={common.post_avatar}
                />
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={{ fontSize: 17, fontWeight: "600" }}>
                {`${user.firstName} ${user.lastName}`}
              </Text>
              <View style={{ flexDirection: "row", flex: 1, marginBottom: 6 }}>
                <View style={styles.scanDescriptionWrapper}>
                  <Text numberOfLines={1} style={styles.scanLocation}>
                    {scan.locationDescription}
                  </Text>
                </View>
                <View style={styles.scanPriceWrapper}>
                  <Text style={styles.scanPrice}>{`${scan.price} lei `}</Text>
                </View>
              </View>
              <View style={styles.scanInfo}>
                <Text style={styles.infoText}>
                  {timeAgo.format(new Date(scan.createdAt))}
                </Text>
                <TouchableOpacity
                  style={{ marginLeft: 5, padding: 6 }}
                  onPress={() =>
                    isLiked ? removeLikeScan(scan.id) : likeScan(scan.id)
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={[
                        styles.infoText,
                        { color: isLiked ? "#12cde8" : "black" }
                      ]}
                    >
                      {locale[language]["like.action.text"] +
                        " " +
                        (scan.likeCount || "0")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 5, padding: 6 }}
                  onPress={() =>
                    isDisliked
                      ? removeDislikeScan(scan.id)
                      : dislikeScan(scan.id)
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={[
                        styles.infoText,
                        { color: isDisliked ? "#ed2020" : "black" }
                      ]}
                    >
                      {locale[language]["dislike"] +
                        " " +
                        (scan.dislikeCount || "0")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: "100%",
                width: 30,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <AwesomeIcon name="angle-right" size={23} color="black" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: any, { scan }: Props) => ({
  userId: state.applicationData.userId,
  language: state.app.language
});

const mapDispatchToProps = {
  likeScan,
  removeLikeScan,
  dislikeScan,
  removeDislikeScan
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(Scan);
