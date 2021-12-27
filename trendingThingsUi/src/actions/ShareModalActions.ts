import axios from "axios";
import { GLOBAL_URL } from "./../utils/Globals";
import { getAuthorization } from "./../utils/Utils";
import { locale } from "./../language/locale";

export const SET_SHARE_MODAL_PHOTO = "shareModal/SET_SHARE_MODAL_PHOTO";
export const SET_SHARE_MODAL_DESCRIPTION =
  "shareModal/SET_SHARE_MODAL_DESCRIPTION";
export const CLEAR_SHARE_MODAL = "shareModal/CLEAR_SHARE_MODAL";
export const SHOW_TAGS_OVERLAY = "shareModal/SHOW_TAGS_OVERLAY";
export const CLOSE_TAGS_OVERLAY = "shareModal/CLOSE_TAGS_OVERLAY";
export const SET_PRICE = "shareModal/SET_PRICE";
export const SET_CATEGORY_ID = "shareModal/SET_CATEGORY_ID";
export const SET_LOCATION_ID = "shareModal/SET_LOCATION_ID";
export const SET_NEW_LOCATION = "shareModal/SET_NEW_LOCATION";
export const TOGGLE_SHARE_LOCATION_CHOOSER =
  "shareModal/TOGGLE_SHARE_LOCATION_CHOOSER";
export const SET_SHARE_LOCATION_CHOOSER =
  "shareModal/SET_SHARE_LOCATION_CHOOSER";
export const SET_SHARE_PRODUCT_PRICE = "shareModal/SET_SHARE_PRODUCT_PRICE";
export const TOGGLE_CATEGORIES_MODAL = "shareModal/TOGGLE_CATEGORIES_MODAL";
export const TOGGLE_TAGS_MODAL = "shareModal/TOGGLE_TAGS_MODAL";
export const SET_TAG = "shareModal/SET_TAG";
export const UNSET_TAG = "shareModal/UNSET_TAG";
export const TOGGLE_EDIT_PRICE_LATER = "shareModal/TOGGLE_EDIT_PRICE_LATER";
export const TOGGLE_LOADING_CUSTOM_TAG = "shareModal/TOGGLE_LOADING_CUSTOM_TAG";
export const ADD_CUSTOM_TAG = "shareModal/ADD_CUSTOM_TAG";
export const TOGGLE_CHECK_CUSTOM_TAG = "shareModal/TOGGLE_CHECK_CUSTOM_TAG";
export const CLEAR_CUSTOM_TAG_FROM_TEXT =
  "shareModal/CLEAR_CUSTOM_TAG_FROM_TEXT";

export const setShareModalPhoto = (photo: any) => ({
  type: SET_SHARE_MODAL_PHOTO,
  photo
});

export const setShareModalDescription = (description: string) => ({
  type: SET_SHARE_MODAL_DESCRIPTION,
  description
});

export const showTagsOverlay = () => ({
  type: SHOW_TAGS_OVERLAY
});

export const closeTagsOverlay = () => ({
  type: CLOSE_TAGS_OVERLAY
});

export const setPrice = (price: string) => ({
  type: SET_PRICE,
  price
});

export const setCategoryId = (categoryId: number) => ({
  type: SET_CATEGORY_ID,
  categoryId
});

export const setLocationId = (locationId: number) => ({
  type: SET_LOCATION_ID,
  locationId
});

export const toggleShareLocationChooser = (show: boolean) => ({
  type: TOGGLE_SHARE_LOCATION_CHOOSER,
  show
});

export const setShareLocationChooser = (location: any) => ({
  type: SET_SHARE_LOCATION_CHOOSER,
  location
});

export const toggleCategoriesModal = (show: boolean) => ({
  type: TOGGLE_CATEGORIES_MODAL,
  show
});

export const toggleTagsModal = (show: boolean) => ({
  type: TOGGLE_TAGS_MODAL,
  show
});

export const setTag = (tagId: number) => ({
  type: SET_TAG,
  tagId
});

export const unsetTag = (tagId: number) => ({
  type: UNSET_TAG,
  tagId
});

export const setNewLocation = (
  position: any,
  formattedAddress: string,
  locationDescription: string
) => ({
  type: SET_NEW_LOCATION,
  newLocation: {
    position,
    formattedAddress,
    locationDescription
  }
});

export const toggleEditPriceLater = (show: boolean) => ({
  type: TOGGLE_EDIT_PRICE_LATER,
  show
});

const toggleLoadingCustomTag = (loading: boolean) => ({
  type: TOGGLE_LOADING_CUSTOM_TAG,
  loading
});

export const addCustomTag = (customTag: any, fromText?: boolean) => ({
  type: ADD_CUSTOM_TAG,
  customTag,
  fromText
});

export const clearCustomTagFromText = () => ({
  type: CLEAR_CUSTOM_TAG_FROM_TEXT
});

export const toggleCheckCustomTag = (tagName: any, isChecked: boolean) => ({
  type: TOGGLE_CHECK_CUSTOM_TAG,
  tagName,
  isChecked
});

/*export const addTag = (tagName: string, cb?: () => void) => (
  dispatch: any,
  getState: any
) => {
  dispatch(toggleLoadingCustomTag(true));

  const state = getState();
  const authorization = getAuthorization(state);

  axios
    .post(
      GLOBAL_URL + "/tag/addTag",
      {
        tagName
      },
      {
        headers: authorization
      }
    )
    .then(data => {
      dispatch(setCustomTag(data.data.tag));
    })
    .catch(() => {
      dispatch(toggleLoadingCustomTag(false));
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["tags.fetch.error"]
      );
    });
};*/
