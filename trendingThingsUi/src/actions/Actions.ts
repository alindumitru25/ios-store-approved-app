import * as io from "socket.io-client";
import axios from "axios";
import { setAuthInfo, removeAuthInfo, getAuthInfo } from "./UtilActions";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GLOBAL_URL } from "./../utils/Globals";

import { resetState, unsubscribeServices } from "./AppActions";
import { locale } from "./../language/locale";

export const TRY_LOGIN = "TRY_LOGIN";
export const TRY_LOGIN_LOADER = "ACT/TRY_LOGIN_LOADER";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const ERROR = "ERROR";
export const CONNECT = "CONNECT";
export const CONNECTED = "CONNECTED";
export const DISCONNECTED = "DISCONNECTED";
export const REQUEST_USER_DATA = "REQUEST_USER_DATA";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";
export const LOG_OUT = "LOG_OUT";
export const CREATE_USER = "CREATE_USER";
export const CREATED_USER = "CREATED_USER";
export const SHOW_LOGIN_ERROR_MESSAGE = "SHOW_LOGIN_ERROR_MESSAGE";
export const SHOW_REGISTER_ERROR_MESSAGE = "SHOW_REGISTER_ERROR_MESSAGE";
export const TOGGLE_AUTH_LOADER = "TOGGLE_AUTH_LOADER";
export const FACEBOOK_LOGIN_SUCCESS = "FACEBOOK_LOGIN_SUCCESS";
export const SET_DROPDOWN_REF = "ACT/SET_DROPDOWN_REF";
export const TOGGLE_ACTIVATION_MODAL = "ACT/TOGGLE_ACTIVATION_MODAL";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_PREDEFINED_LOCATIONS = "SET_PREDEFINED_LOCATIONS";

let tryLoginTimes = 15;

// @TODO define interfaces for all
// try to login based on async storage token / if expired or else request login with creds
function requestLogin(creds: any) {
  return {
    type: LOGIN_REQUEST,
    loading: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(token: string, userId: number) {
  return {
    type: LOGIN_SUCCESS,
    loading: false,
    isAuthenticated: true,
    token,
    userId
  };
}

function receiveFacebookLogin(accessToken: string, userId: number) {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    loading: false,
    isAuthenticated: true,
    accessToken,
    userId
  };
}

function error(message: string, errorType: string) {
  return {
    type: ERROR,
    loading: false,
    message,
    errorType
  };
}

function logOut() {
  return {
    type: LOG_OUT,
    loading: false,
    isAuthenticated: false
  };
}

function requestUserData() {
  return {
    type: REQUEST_USER_DATA,
    loading: true,
    isAuthenticated: true
  };
}

function receivedUserData(data: any) {
  return {
    type: RECEIVE_USER_DATA,
    loading: false,
    isAuthenticated: true,
    userData: data
  };
}

function createUser() {
  return {
    type: CREATE_USER,
    loading: true
  };
}

function createdUser(user: any) {
  return {
    type: CREATED_USER,
    loading: false,
    createdUser: user
  };
}

function showLoginErrorMessage(message: string) {
  return {
    type: SHOW_LOGIN_ERROR_MESSAGE,
    message
  };
}

function showRegisterErrorMessage(message: string) {
  return {
    type: SHOW_REGISTER_ERROR_MESSAGE,
    message
  };
}

function toggleAuthLoader(show: boolean) {
  return {
    type: TOGGLE_AUTH_LOADER,
    show
  };
}

function toggleTryLogin(show: boolean) {
  return {
    type: TRY_LOGIN_LOADER,
    show
  };
}

export function setDropdownRef(ref: any) {
  return {
    type: SET_DROPDOWN_REF,
    ref
  };
}

function setPredefinedLocations(predefinedLocations: any) {
  return {
    type: SET_PREDEFINED_LOCATIONS,
    predefinedLocations
  };
}

export function toggleActivationModal(show: boolean, url: any) {
  return {
    type: TOGGLE_ACTIVATION_MODAL,
    show,
    url
  };
}

export function loginUser(username: string, password: string) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    dispatch(requestLogin({ username, password }));
    dispatch(showLoginErrorMessage(null));
    axios
      .post(GLOBAL_URL + "/user/login", {
        email: username,
        password: password
      })
      .then(data => {
        if (!data.data.token) {
          state.authentication.dropdownRef.alertWithType(
            "error",
            "",
            locale[state.app.language]["general.error"]
          );
        } else {
          setAuthInfo(data.data.token, data.data.userId);
          dispatch(receiveLogin(data.data.token, data.data.userId));
        }
      })
      .catch(err => {
        dispatch(toggleAuthLoader(false));
        state.authentication.dropdownRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["login.user.error"]
        );
      });
  };
}

export function tryLoginUser() {
  return (dispatch: any, getState: any) => {
    const state = getState();
    getAuthInfo()
      .then(info => {
        const token = info.token;
        if (!token) {
          return;
        }

        dispatch(toggleTryLogin(true));
        axios
          .post(
            GLOBAL_URL + "/user/tryLogin",
            {},
            {
              headers: { Authorization: "JWT " + token }
            }
          )
          .then(data => {
            tryLoginTimes = 15;
            setAuthInfo(token, data.data.userId);
            dispatch(receiveLogin(token, data.data.userId));
          })
          .catch(err => {
            if (err.request && err.request.status === 401) {
              // log out facebook, delete token for UNAUTHORIZED login attempt -> bad token
              removeAuthInfo()
                .then(() => {
                  LoginManager.logOut();
                })
                .catch(err => {});
            } else if (tryLoginTimes) {
              // long poll login
              tryLoginTimes--;
              setTimeout(() => {
                dispatch(tryLoginUser());
              }, 5000);
            }
            dispatch(toggleTryLogin(false));
          });
      })
      .catch(err => {
        if (!state.authentication || !state.authentication.accessToken) {
          setTimeout(() => {
            dispatch(tryLoginUser());
          }, 1000);
        }
        dispatch(toggleTryLogin(false));
      });
  };
}

export function createUserAction(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  location: number,
  cb?: any
) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    axios
      .put(GLOBAL_URL + "/user/create", {
        firstName,
        lastName,
        email,
        password,
        location
      })
      .then((data: any) => {
        dispatch(createdUser(data.data.email));
        state.authentication.dropdownRef.alertWithType(
          "success",
          "",
          locale[state.app.language]["user.created"]
        );

        if (cb) {
          cb();
        }
      })
      .catch((err: any) => {
        if (err.request.status === 409) {
          state.authentication.dropdownRef.alertWithType(
            "error",
            "",
            locale[state.app.language]["email.taken"]
          );
        } else {
          state.authentication.dropdownRef.alertWithType(
            "error",
            "",
            locale[state.app.language]["general.error"]
          );
        }
      });
  };
}

export function logOutUser() {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const userId = state.applicationData.userId;

    // facebook log out
    removeAuthInfo()
      .then(() => {
        LoginManager.logOut();
        dispatch(logOut());
        dispatch(resetState());
        unsubscribeServices(userId);
      })
      .catch(err => {
        state.authentication.dropdownRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["general.error"]
        );
      });
  };
}

export const tryLoginWithFacebook = () => (dispatch: any, getState: any) => {
  AccessToken.getCurrentAccessToken()
    .then(({ accessToken }: any) => {
      if (accessToken) {
        dispatch(toggleTryLogin(true));
        axios
          .post(
            GLOBAL_URL + "/user/facebook/login",
            {},
            {
              headers: {
                Authorization: "Bearer " + accessToken.toString()
              }
            }
          )
          .then((data: any) => {
            if (!data.data.token) {
              const state = getState();
              state.authentication.dropdownRef.alertWithType(
                "error",
                "",
                locale[state.app.language]["general.error"]
              );
            } else {
              setAuthInfo(data.data.token, data.data.userId);
              dispatch(receiveLogin(data.data.token, data.data.userId));
            }
          })
          .catch(err => {
            // log out of facebook if try login with facebook is rejected
            LoginManager.logOut();
            const state = getState();
            state.authentication.dropdownRef.alertWithType(
              "error",
              "",
              locale[state.app.language]["general.error"]
            );
          });
      }
    })
    .catch((err: any) => {
      dispatch(toggleTryLogin(false));
    });
};

export const sendResetEmail = (email: string, cb?: any) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    axios
      .post(GLOBAL_URL + "/user/sendResetEmail", {
        email
      })
      .then((data: any) => {
        state.authentication.dropdownRef.alertWithType(
          "success",
          "",
          locale[state.app.language]["email.sent"]
        );

        if (cb) {
          cb();
        }
      })
      .catch(err => {
        state.authentication.dropdownRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["email.sent.error"]
        );
      });
  };
};

export const resetPassword = (token: string, newPassword: string, cb?: any) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  axios
    .post(GLOBAL_URL + "/user/resetPassword", {
      token,
      newPassword
    })
    .then((data: any) => {
      if (cb) {
        cb();
      }
      state.authentication.dropdownRef.alertWithType(
        "success",
        "",
        locale[state.app.language]["password.changed"]
      );
    })
    .catch(err => {
      state.authentication.dropdownRef.alertWithType(
        "error",
        "Error",
        locale[state.app.language]["password.changed.error"]
      );
    });
};

export const activateUser = (token: string, success: any, error: any) => () => {
  axios
    .post(GLOBAL_URL + "/user/activateUser", {
      token
    })
    .then(() => {
      success();
    })
    .catch(err => {
      error(err);
    });
};

export const getPredefinedLocations = () => (dispatch: any, getState: any) => {
  axios
    .get(GLOBAL_URL + "/location/predefinedLocations")
    .then(data => {
      dispatch(setPredefinedLocations(data.data.predefinedLocations));
    })
    .catch(err => {
      const state = getState();
      const dropDownRef =
        state.authentication.dropdownRef || state.app.dropDownAlertRef;
      dropDownRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["general.error"]
      );
    });
};

export const setLanguage = (language: any) => ({
  type: SET_LANGUAGE,
  language
});
