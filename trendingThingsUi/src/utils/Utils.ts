import { Platform, Linking, NativeModules } from "react-native";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.locale(en);
export const timeAgo = new TimeAgo("en-US");

export function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePassword(password: string) {
  if (!password || password.length < 8 || password.length > 32) {
    return false;
  }

  return true;
}

export const openMap = (description: string, long: number, lat: number) => {
  const scheme = Platform.OS === "ios" ? "maps:0,0?q=" : "geo:0,0?q=:";
  const latLng = `${lat},${long}`;
  const url =
    Platform.OS === "ios"
      ? `${scheme}${description}@${latLng}`
      : `${scheme}${latLng}(${description})`;

  Linking.canOpenURL(url).then((supported: any) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      alert("ERROR" + "Unable to open: " + url + [{ text: "OK" }]);
    }
  });
};

export const getAuthorization = (state: any) =>
  state.authentication.token
    ? { Authorization: "JWT " + state.authentication.token }
    : { Authorization: "Bearer " + state.authentication.accessToken };

export const getLocale = () =>
  (NativeModules as any).SettingsManager.settings.AppleLocale.replace(/_/, "-");
