import * as React from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import Camera from "react-native-camera";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import { locale } from "./../../language/locale";

import styles from "./styles";

const NotAuthorizedView = ({ toggleScanCamera, language }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ alignItems: "center", width: "100%" }}>
        <EvilIcons name="camera" size={56} color="black" />
        <Text style={styles.notAutorizedText}>
          {locale[language]["not.authorized.camera.scan"]}
        </Text>
      </View>
    </View>
  );
};

interface Props {
  onBarcodeRead: (e: any) => void;
  toggleScanCamera: (show: boolean) => void;
  language: string;
}

const ScanCamera = ({ onBarcodeRead, toggleScanCamera, language }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Camera
        onBarCodeRead={onBarcodeRead}
        style={{ flex: 1 }}
        aspect={Camera.constants.Aspect.fill}
        notAuthorizedView={
          <NotAuthorizedView
            toggleScanCamera={toggleScanCamera}
            language={language}
          />
        }
      >
        <View style={styles.scanFrame}>
          <Image
            source={require("./../../../images/scan_frame.png")}
            style={styles.scanFrameImage}
          />
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>
            {locale[language]["scan.guidance"]}
          </Text>
        </View>
      </Camera>
    </View>
  );
};

export default ScanCamera;
