import { resetNavigation } from "./TrendingNavActions";
import axios from "axios";
import { GLOBAL_URL } from "./../utils/Globals";
import { getAuthorization, validatePassword } from "./../utils/Utils";
import { locale } from "./../language/locale";
import { keys, pickBy } from "lodash";

export const GET_INITIAL_DATA = "GET_INITIAL_DATA";
export const RECEIVED_INITIAL_DATA = "RECEIVED_INITIAL_DATA";
export const DOCUMENT_SAVE = "DOCUMENT_SAVE";
export const DOCUMENT_SAVED = "DOCUMENT_SAVED";
export const RECEIVED_DOCUMENTS = "RECEIVED_DOCUMENTS";
export const DOCUMENT_LIKE = "DOCUMENT_LIKE";
export const DOCUMENT_LIKED = "DOCUMENT_LIKED";
export const DOCUMENT_DISLIKE = "DOCUMENT_DISLIKE";
export const DOCUMENT_DISLIKED = "DOCUMENT_DISLIKED";
export const AVATAR_SAVE = "AVATAR_SAVE";
export const AVATAR_SAVED = "AVATAR_SAVED";
export const TOGGLE_LOADING_USER_DOCUMENTS = "TOGGLE_LOADING_USER_DOCUMENTS";
export const RECEIVED_DOCUMENTS_BY_USER = "RECEIVED_DOCUMENTS_BY_USER";
export const FOLLOW_ACTION_LOADING = "APP_ACTIONS/FOLLOW_ACTION_LOADING";
export const FOLLOWED_USER = "FOLLOWED_USER";
export const UNFOLLOWED_USER = "UNFOLLOWED_USER";
export const FEEDBACK_QUALITY_COMPLETE = "FEEDBACK_QUALITY_COMPLETE";
export const GET_MAP_LOCATIONS_COMPLETE = "GET_LOCATIONS_COMPLETE";
export const CLEAR_DOCUMENTS_BY_USER_PAGE = "CLEAR_DOCUMENTS_BY_USER_PAGE";
export const FETCH_AROUND_LOCATIONS_COMPLETE =
  "LOCATIONS/FETCH_AROUND_LOCATIONS_COMPLETE";
export const SHOW_GETTING_OWN_DOCUMENTS_LOADER =
  "APP_ACTIONS/SHOW_GETTING_OWN_DOCUMENTS_LOADER";
export const RECEIVED_OWN_DOCUMENTS = "APP_ACTIONS/RECEIVED_OWN_DOCUMENTS";
export const RECEIVED_DOCUMENT = "APP_ACTIONS/RECEIVED_DOCUMENTS";
export const OPEN_REACTION_PANEL = "APP_ACTIONS/OPEN_REACTION_PANEL";
export const CLOSE_REACTION_PANEL = "APP_ACTIONS/CLOSE_REACTION_PANEL";
export const SET_ACTIVE_TAB = "APP_ACTIONS/SET_ACTIVE_TAB";
export const SHOW_POST_COMMENT_BAR = "APP_ACTIONS/SHOW_POST_COMMENT_BAR";
export const HIDE_POST_COMMENT_BAR = "APP_ACTIONS/HIDE_POST_COMMENT_BAR";
export const SET_POST_COMMENT = "APP_ACTIONS/SET_POST_COMMENT";
export const CLEAR_POST_COMMENT = "APP_ACTIONS/CLEAR_POST_COMMENT";
export const COMMENT_UPDATED = "APP_ACTIONS/COMMENT_UPDATED";
export const COMMENTS_FETCHED = "APP_ACTIONS/COMMENTS_FETCHED";
export const CLEAR_COMMENTS = "APP_ACTIONS/CLEAR_COMMENTS";
export const REPLY_TO = "APP_ACTIONS/REPLY_TO";
export const REPLY_TO_REPLY = "APP_ACTIONS/REPLY_TO_REPLY";
export const CLEAR_REPLY_TO = "APP_ACTIONS/REPLY_TO";
export const REPLY_UPDATED = "APP_ACTIONS/REPLY_UPDATED";
export const CLEAR_COMMENTS_DATA = "APP_ACTIONS/CLEAR_COMMENTS_DATA";
export const REVIEW_UPDATED = "APP_ACTIONS/REVIEW_UPDATED";
export const REVIEW_FETCHED = "APP_ACTIONS/REVIEW_FETCHED";
export const CLEAR_REVIEWS = "APP_ACTIONS/CLEAR_REVIEWS";
export const SET_POST_REVIEW = "APP_ACTIONS/SET_POST_REVIEW";
export const SET_RATING = "APP_ACTIONS/SET_RATING";
export const CLEAR_POST_REVIEW = "APP_ACTIONS/CLEAR_POST_REVIEW";
export const TOGGLE_SHOW_FILTER = "APP_ACTIONS/TOGGLE_SHOW_FILTER";
export const FILTER_UPDATED = "APP_ACTIONS/FILTER_UPDATED";
export const TOGGLE_SCAN_CAMERA = "APP_ACTIONS/TOGGLE_SCAN_CAMERA";
export const SET_BAR_CODE = "APP_ACTIONS/SET_BAR_CODE";
export const TOGGLE_LOADING_SCANS = "APP_ACTIONS/TOGGLE_LOADING_SCANS";
export const SCANS_FETCHED = "APP_ACTIONS/SCANS_FETCHED";
export const TOGGLE_SHOW_ADD_SCAN = "APP_ACTIONS/TOGGLE_SHOW_ADD_SCAN";
export const TOGGLE_SCAN_LOCATION_CHOOSER =
  "APP_ACTIONS/TOGGLE_SCAN_LOCATION_CHOOSER";
export const CLEAR_BARCODE = "APP_ACTIONS/CLEAR_BARCODE";
export const ADD_LOCATION_TO_BARCODE = "APP_ACTIONS/ADD_LOCATION_TO_BARCODE";
export const SCAN_UPDATED = "APP_ACTIONS/SCAN_UPDATED";
export const TOGGLE_SHOW_CREATE_POST = "APP_ACTIONS/TOGGLE_SHOW_CREATE_POST";
export const CLEAR_ADD_SCAN = "APP_ACTIONS/CLEAR_ADD_SCAN";
export const SET_SCANS_SORTING = "APP_ACTIONS/SET_SCANS_SORTING";
export const LIKE_SCAN = "APP_ACTIONS/LIKE_SCAN";
export const SET_TAB_NAVIGATION = "APP_ACTIONS/SET_TAB_NAVIGATION";
export const SET_LAST_TAB = "APP_ACTIONS/SET_LAST_TAB";
export const CLEAR_SHARE_MODAL = "APP_ACTIONS/CLEAR_SHARE_MODAL";
export const LOADING_SHARE_MODAL = "APP_ACTIONS/LOADING_SHARE_MODAL";
export const CLEAR_DOCUMENTS = "APP_ACTIONS/CLEAR_DOCUMENTS";
export const LOADING_DOCUMENTS = "APP_ACTIONS/LOADING_DOCUMENTS";
export const LOADING_DOCUMENTS_ERROR = "APP_ACTIONS/LOADING_DOCUMENTS_ERROR";
export const NOTIFICATIONS_FETCHED = "APP_ACTIONS/NOTIFICATIONS_FETCHED";
export const TOGGLE_LOADING_NOTIFICATIONS =
  "APP_ACTIONS/TOGGLE_LOADING_NOTIFICATIONS";
export const OPEN_MESSAGE_MODAL = "APP_ACTIONS/OPEN_MESSAGE_MODAL";
export const CLEAR_MESSAGE_MODAL = "APP_ACTIONS/CLEAR_MESSAGE_MODAL";
export const RECEIVED_CHATS = "APP_ACTIONS/RECEIVED_CHATS";
export const RECEIVED_MESSAGES = "APP_ACTIONS/RECEIVED_MESSAGES";
export const MESSAGES_UPDATE = "APP_ACTIONS/MESSAGES_UPDATE";
export const CHATS_UPDATE = "APP_ACTIONS/CHATS_UPDATE";
export const TOGGLE_LOADING_CHATS = "APP_ACTIONS/TOGGLE_LOADING_CHATS";
export const TOGGLE_LOADING_MESSAGES = "APP_ACTIONS/TOGGLE_LOADING_MESSAGES";
export const SHOW_SEND_PHOTO_MODAL = "APP_ACTIONS/SHOW_SEND_PHOTO_MODAL";
export const CLOSE_SEND_PHOTO_MODAL = "APP_ACTIONS/CLOSE_SEND_PHOTO_MODAL";
export const TOGGLE_LOADING_SEND_MESSAGE =
  "APP_ACTIONS/TOGGLE_LOADING_SEND_MESSAGE";
export const SET_TRENDING_LIST_REF = "APP_ACTIONS/SET_TRENDING_LIST_REF";
export const TOGGLE_HIDE_LOCATION_TOOLTIP =
  "APP_ACTIONS/TOGGLE_HIDE_LOCATION_TOOLTIP";
export const TOGGLE_LOCATION_CHOOSER_MODAL =
  "APP_ACTIONS/TOGGLE_LOCATION_CHOOSER_MODAL";
export const UPDATE_USER_PREFERENCES = "APP_ACTIONS/UPDATE_USER_PREFERENCES";
export const SET_SEARCH = "APP_ACTIONS/SET_SEARCH";
export const SET_SEARCH_RESULTS = "APP_ACTIONS/SET_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "APP_ACTIONS/CLEAR_SEARCH_RESULTS";
export const SHOW_SEARCH_RESULTS = "APP_ACTIONS/SHOW_SEARCH_RESULTS";
export const TOGGLE_SEARCH_BAR = "APP_ACTIONS/TOGGLE_SEARCH_BAR";
export const UPDATE_DOCUMENTS = "APP_ACTIONS/UPDATE_DOCUMENTS";
export const SET_DROPDOWN_ALERT_REF = "APP_ACTIONS/SET_DROPDOWN_ALERT_REF";
export const SET_MORE_SEARCH_RESULTS = "APP_ACTIONS/SET_MORE_SEARCH_RESULTS";
export const LOADING_MORE_SEARCHES = "APP_ACTIONS/LOADING_MORE_SEARCHES";
export const UPDATE_DOCUMENT = "APP_ACTIONS/UPDATE_DOCUMENT";
export const CLEAR_NOTIFICATIONS_NAV = "APP_ACTIONS/CLEAR_NOTIFICATIONS_NAV";
export const RESET_STATE = "APP_ACTIONS/RESET_STATE";
export const RECEIVED_DOCUMENTS_BY_USER_PAGE =
  "APP_ACTIONS/RECEIVED_DOCUMENTS_BY_USER_PAGE";
export const CLEAR_AROUND_LOCATIONS = "APP_ACTIONS/CLEAR_AROUND_LOCATIONS";
export const TOGGLE_LOADING_TAGS = "APP_ACTIONS/TOGGLE_LOADING_TAGS";
export const SET_TAGS = "APP_ACTIONS/SET_TAGS";
export const UPDATE_RECEIVER_USER = "UPDATE_RECEIVER_USER";
export const TOGGLE_SEARCHING_DOCUMENTS = "TOGGLE_SEARCHING_DOCUMENTS";
export const SET_HIDE_NO_INTERNET_WARNING = "SET_HIDE_NO_INTERNET_WARNING";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

const SOCKET_COMMENT_UPDATE = "SOCKET/POST_COMMENT_UPDATE";
const SOCKET_REPLY_UPDATE = "SOCKET/POST_REPLY_UPDATE";

const SOCKET_MESSAGES_UPDATE = "SOCKET/CHAT_MESSAGES_UPDATE";
const SOCKET_CHATS_UPDATE = "SOCKET/CHATS_UPDATE";

const SOCKET_NOTIFICATIONS_UPDATE = "SOCKET/SOCKET_NOTIFICATIONS_UPDATE";

function getInitialData() {
  return {
    type: GET_INITIAL_DATA,
    loading: true
  };
}

function receivedInitialData(data: any) {
  return {
    type: RECEIVED_INITIAL_DATA,
    loading: false,
    initialData: data
  };
}

function documentSave() {
  return {
    type: DOCUMENT_SAVE,
    loading: true
  };
}

function documentSaved(document: any, tags: any) {
  return {
    type: DOCUMENT_SAVED,
    loading: false,
    document,
    tags
  };
}

function toggleLoadingUserDocuments(loading: boolean) {
  return {
    type: TOGGLE_LOADING_USER_DOCUMENTS,
    loading
  };
}

function receivedDocumentsByUser(userId: number, documents: any) {
  return {
    type: RECEIVED_DOCUMENTS_BY_USER,
    loading: false,
    documents,
    userId
  };
}

function receivedDocumentsByUserPage(
  userId: number,
  documents: any,
  user: any,
  pageId: string
) {
  return {
    type: RECEIVED_DOCUMENTS_BY_USER_PAGE,
    loading: false,
    documents,
    user,
    userId,
    pageId
  };
}

const receivedOwnDocuments = (documents: any) => ({
  type: RECEIVED_OWN_DOCUMENTS,
  documents
});

//@FIXME add document interface
function receivedDocuments(
  { documents, trendingDocumentsIds }: any,
  userId: number
) {
  return {
    type: RECEIVED_DOCUMENTS,
    loading: false,
    documents,
    userId,
    trendingDocumentsIds
  };
}

function documentLike() {
  return {
    type: DOCUMENT_LIKE,
    loading: true
  };
}

function documentLiked(document: any, pageId?: any) {
  return {
    type: DOCUMENT_LIKED,
    document,
    pageId
  };
}

function documentDislike() {
  return {
    type: DOCUMENT_DISLIKE,
    loading: true
  };
}

function documentDisliked(document: any, pageId?: any) {
  return {
    type: DOCUMENT_DISLIKED,
    loading: false,
    document,
    pageId
  };
}

function avatarSave() {
  return {
    type: AVATAR_SAVE,
    loading: true
  };
}

function avatarSaved() {
  return {
    type: AVATAR_SAVED,
    loading: false
  };
}

function followActionLoading(isLoading: boolean) {
  return {
    type: FOLLOW_ACTION_LOADING,
    loading: isLoading
  };
}

function userFollowed(follower: any, user: any, pageId: string) {
  return {
    type: FOLLOWED_USER,
    follower,
    user,
    pageId
  };
}

const userUnfollowed = (followeeId: number, user: any, pageId: string) => ({
  type: UNFOLLOWED_USER,
  followeeId,
  user,
  pageId
});

function feedbackComplete(document: any) {
  return {
    type: FEEDBACK_QUALITY_COMPLETE,
    document
  };
}

function getLocationsComplete(locations: any) {
  return {
    type: GET_MAP_LOCATIONS_COMPLETE,
    locations
  };
}

export function clearDocumentsByUserPage(pageId: string) {
  return {
    type: CLEAR_DOCUMENTS_BY_USER_PAGE,
    pageId
  };
}

function fetchAroundLocationsComplete(locations: any) {
  return {
    type: FETCH_AROUND_LOCATIONS_COMPLETE,
    locations
  };
}

const showGettingOwnDocumentsLoader = (isLoading: boolean) => ({
  type: SHOW_GETTING_OWN_DOCUMENTS_LOADER,
  isLoading
});

export const receivedDocument = (document: any) => ({
  type: RECEIVED_DOCUMENT,
  document
});

export const openReactionPanel = (documentId: number) => ({
  type: OPEN_REACTION_PANEL,
  documentId
});

export const closeReactionPanel = (documentId: number) => ({
  type: CLOSE_REACTION_PANEL,
  documentId
});

export const setActiveTab = (activeTab: number) => ({
  type: SET_ACTIVE_TAB,
  activeTab
});

export const showCommentBarOnPost = (documentId: number) => ({
  type: SHOW_POST_COMMENT_BAR,
  documentId
});

export const hideCommentBarOnPost = (documentId: number) => ({
  type: HIDE_POST_COMMENT_BAR,
  documentId
});

export const setPostComment = (documentId: number, comment: string) => ({
  type: SET_POST_COMMENT,
  documentId,
  comment
});

export const setPostReview = (review: string) => ({
  type: SET_POST_REVIEW,
  review
});

export const setRating = (rating: number) => ({
  type: SET_RATING,
  rating
});

export const clearPostComment = (documentId: number) => ({
  type: CLEAR_POST_COMMENT,
  documentId
});

export const clearPostReview = () => ({
  type: CLEAR_POST_REVIEW
});

export const clearCommentsData = () => ({
  type: CLEAR_COMMENTS_DATA
});

const commentUpdated = (comment: any, documentId: number) => ({
  type: COMMENT_UPDATED,
  comment,
  documentId
});

const replyUpdated = (reply: any, documentId: number) => ({
  type: REPLY_UPDATED,
  reply,
  documentId
});

const commentsFetched = (comments: any, replies: any, documentId: number) => ({
  type: COMMENTS_FETCHED,
  comments,
  replies,
  documentId
});

export const clearComments = (documentId: number) => ({
  type: CLEAR_COMMENTS,
  documentId
});

export const onReply = (
  commentId: number,
  userId: number,
  userName: string
) => ({
  type: REPLY_TO,
  commentId,
  userId,
  userName
});

export const onReplyToReply = (
  commentId: number,
  replyId: number,
  userId: number,
  userName: string
) => ({
  type: REPLY_TO_REPLY,
  commentId,
  replyId,
  userId,
  userName
});

export const clearOnReply = () => ({
  type: CLEAR_REPLY_TO
});

const reviewsFetched = (reviews: any) => ({
  type: REVIEW_FETCHED,
  reviews
});

const reviewUpdated = (review: any) => ({
  type: REVIEW_UPDATED,
  review
});

export const clearReviews = () => ({
  type: CLEAR_REVIEWS
});

export const toggleShowFilter = (show: boolean) => ({
  type: TOGGLE_SHOW_FILTER,
  show
});

export const filterUpdated = (filter: any) => ({
  type: FILTER_UPDATED,
  filter
});

export const toggleScanCamera = (show: boolean) => ({
  type: TOGGLE_SCAN_CAMERA,
  show
});

export const setBarcode = (codeType: any, code: any) => ({
  type: SET_BAR_CODE,
  codeType,
  code
});

const toggleLoadingScans = (show: boolean) => ({
  type: TOGGLE_LOADING_SCANS,
  show
});

const scansFetched = (scans: any) => ({
  type: SCANS_FETCHED,
  scans
});

const scanUpdated = (scan: any) => ({
  type: SCAN_UPDATED,
  scan
});

export const clearAddScan = () => ({
  type: CLEAR_ADD_SCAN
});

export const toggleShowCreatePost = (show: boolean) => ({
  type: TOGGLE_SHOW_CREATE_POST,
  show
});

export const toggleShowAddScan = (show: boolean) => ({
  type: TOGGLE_SHOW_ADD_SCAN,
  show
});

export const toggleScanLocationChooser = (show: boolean) => ({
  type: TOGGLE_SCAN_LOCATION_CHOOSER,
  show
});

export const clearBarcode = () => ({
  type: CLEAR_BARCODE
});

export const addLocationToBarcode = (location: any) => ({
  type: ADD_LOCATION_TO_BARCODE,
  location
});

export const setScansSorting = (sorting: any) => ({
  type: SET_SCANS_SORTING,
  sorting
});

export const setTabNavigation = (navigation: any) => ({
  type: SET_TAB_NAVIGATION,
  navigation
});

export const setLastTab = (lastTab: string) => ({
  type: SET_LAST_TAB,
  lastTab
});

export const clearShareModal = () => ({
  type: CLEAR_SHARE_MODAL
});

export const loadingShareModal = (loading: boolean) => ({
  type: LOADING_SHARE_MODAL,
  loading
});

export const clearDocuments = () => ({
  type: CLEAR_DOCUMENTS
});

export const loadingDocuments = () => ({
  type: LOADING_DOCUMENTS
});

export const loadingDocumentsError = () => ({
  type: LOADING_DOCUMENTS_ERROR
});

export const notificationsFetched = (notifications: any) => ({
  type: NOTIFICATIONS_FETCHED,
  notifications
});

export const toggleLoadingNotifications = (loading: boolean) => ({
  type: TOGGLE_LOADING_NOTIFICATIONS,
  loading
});

export const openMessageModal = (userId: number) => ({
  type: OPEN_MESSAGE_MODAL,
  userId
});

export const clearMessageModal = () => ({
  type: CLEAR_MESSAGE_MODAL
});

export const messageUser = (userId: number) => (dispatch: any) => {
  dispatch(openMessageModal(userId));
};

export const receivedChats = (chats: any) => ({
  type: RECEIVED_CHATS,
  chats
});

export const receivedMessages = (
  messages: any,
  chatId: number,
  receiverUser: any
) => ({
  type: RECEIVED_MESSAGES,
  messages,
  chatId,
  receiverUser
});

export const messagesUpdate = (message: any) => ({
  type: MESSAGES_UPDATE,
  message
});

export const chatsUpdate = (chat: any) => ({
  type: CHATS_UPDATE,
  chat
});

export const toggleLoadingChats = (loading: boolean) => ({
  type: TOGGLE_LOADING_CHATS,
  loading
});

export const toggleLoadingMessages = (loading: boolean) => ({
  type: TOGGLE_LOADING_MESSAGES,
  loading
});

export const showSendPhotoModal = (photo: any) => ({
  type: SHOW_SEND_PHOTO_MODAL,
  photo
});

export const closeSendPhotoModal = () => ({
  type: CLOSE_SEND_PHOTO_MODAL
});

export const toggleLoadingSendMessage = (loading: boolean) => ({
  type: TOGGLE_LOADING_SEND_MESSAGE,
  loading
});

export const setTrendingListRef = (ref: any) => ({
  type: SET_TRENDING_LIST_REF,
  trendingListRef: ref
});

export const toggleHideLocationTooltip = (show: any) => ({
  type: TOGGLE_HIDE_LOCATION_TOOLTIP,
  show
});

export const toggleLocationChooserModal = (show: any) => ({
  type: TOGGLE_LOCATION_CHOOSER_MODAL,
  show
});

export const updateUserPreferences = (userPreferences: any) => ({
  type: UPDATE_USER_PREFERENCES,
  userPreferences
});

export const setSearch = (searchText: string) => ({
  type: SET_SEARCH,
  searchText
});

export const setSearchResults = (searchIds: any) => ({
  type: SET_SEARCH_RESULTS,
  searchIds
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

export const updateDocuments = (documents: any) => ({
  type: UPDATE_DOCUMENTS,
  documents
});

export const setDropdownAlertRef = (ref: any) => ({
  type: SET_DROPDOWN_ALERT_REF,
  ref
});

export const toggleSearchBar = (show: boolean) => ({
  type: TOGGLE_SEARCH_BAR,
  show
});

export const setMoreSearchResults = (searchIds: any) => ({
  type: SET_MORE_SEARCH_RESULTS,
  searchIds
});

export const loadingMoreSearches = () => ({
  type: LOADING_MORE_SEARCHES
});

export const updateDocument = (document: any) => ({
  type: UPDATE_DOCUMENT,
  document
});

export const clearNotificationsNav = () => ({
  type: CLEAR_NOTIFICATIONS_NAV
});

export const resetState = () => ({
  type: RESET_STATE
});

const toggleLoadingTags = (loading: boolean) => ({
  type: TOGGLE_LOADING_TAGS,
  loading
});

const setTags = (tags: any) => ({
  type: SET_TAGS,
  tags
});

const updateReceiverUser = (receiverUser: any) => ({
  type: UPDATE_RECEIVER_USER,
  receiverUser
});

const toggleSearchingDocuments = (searching: boolean) => ({
  type: TOGGLE_SEARCHING_DOCUMENTS,
  searching
});

export const setHideNoInternetWarning = (hide: boolean) => ({
  type: SET_HIDE_NO_INTERNET_WARNING,
  hide
});

const updateUserInfo = (user: any) => ({
  type: UPDATE_USER_INFO,
  user
});

export const getChats = (cb?: () => void) => (dispatch: any, getState: any) => {
  const state = getState();
  const authorization = getAuthorization(state);
  dispatch(toggleLoadingChats(true));
  axios
    .get(GLOBAL_URL + "/chat/getChats", {
      headers: authorization
    })
    .then(data => {
      dispatch(receivedChats(data.data.chats));
      if (cb) {
        cb();
      }
    })
    .catch(err => {
      dispatch(toggleLoadingChats(false));
      if (cb) {
        cb();
      }
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["get.messages.error"]
      );
    });
};

export const getMessages = (receiverUserId: number, userId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);
  dispatch(toggleLoadingMessages(true));
  axios
    .get(GLOBAL_URL + "/chat/getMessages", {
      params: {
        receiverUserId
      },
      headers: authorization
    })
    .then(data => {
      if (data.data.messages && data.data.chat) {
        dispatch(
          receivedMessages(
            data.data.messages,
            data.data.chat.id,
            data.data.receiverUser
          )
        );
        if (data.data.chat.newMessages && data.data.chat.newMessages[userId]) {
          dispatch(markChatAsRead(data.data.chat.id));
        }
      } else {
        dispatch(updateReceiverUser(data.data.receiverUser));
        dispatch(toggleLoadingMessages(false));
      }
    })
    .catch(err => {
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["get.messages.error"]
      );
    });
};

export const markChatAsRead = (chatId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);
  axios
    .patch(
      GLOBAL_URL + "/chat/markAsSeen",
      {
        chatId
      },
      {
        headers: authorization
      }
    )
    .then(data => {
      dispatch(receivedChats(data.data.chats));
    })
    .catch(() => {});
};

export const sendMessage = (message: any, receiverUserId: any, photo: any) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);
  dispatch(toggleLoadingSendMessage(true));

  // send file as formData / accompanied by according fields
  const formData = new FormData();
  if (photo) {
    const image: any = {
      uri: photo.path,
      type: "image/jpeg",
      name: "message_photo.jpg"
    };
    formData.append("image", image);
  }
  formData.append("message", message);
  formData.append("receiverUserId", receiverUserId);
  axios
    .post(GLOBAL_URL + "/chat/addMessage", formData, {
      headers: {
        ...authorization,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(data => {
      dispatch(chatsUpdate(data.data.chat));
      dispatch(messagesUpdate(data.data.message));
      dispatch(closeSendPhotoModal());
      dispatch(toggleLoadingSendMessage(false));
    })
    .catch(err => {
      dispatch(toggleLoadingSendMessage(false));
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["processing.error"]
      );
    });
};

export function requestInitialData() {
  return (dispatch: any, getState: any) => {
    let state = getState();
    dispatch(getInitialData());
    const authorization = getAuthorization(state);
    axios
      .get(GLOBAL_URL + "/initialData/get", {
        headers: authorization
      })
      .then(data => {
        dispatch(receivedInitialData(data.data));
        // fetch initial notifications
        dispatch(fetchNotifications());

        // fetch initial messages
        dispatch(getChats());

        // subscribe to real-time updates
        dispatch(subscribeToNotifications(data.data.user.id));
        dispatch(subscribeToChatsUpdates(data.data.user.id));
      })
      .catch(err => {
        setTimeout(() => {
          state = getState();
          state.app.dropDownAlertRef.alertWithType(
            "error",
            "",
            locale[state.app.language]["initial.data.problem"]
          );
          setTimeout(() => {
            dispatch(requestInitialData());
          }, 7000);
        }, 0);
      });
  };
}

export function requestDocuments(
  callback?: () => void,
  initialFetch?: boolean
) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    const userId = state.authentication.userId;
    dispatch(loadingDocuments());
    axios
      .get(GLOBAL_URL + "/document/get", {
        headers: authorization
      })
      .then(data => {
        dispatch(clearDocuments());
        dispatch(receivedDocuments(data.data, userId));
        if (callback) {
          callback();
        }
      })
      .catch(err => {
        if (callback) {
          callback();
        }
        dispatch(loadingDocumentsError());
        // long polling initial fetch
        if (initialFetch) {
          setTimeout(() => {
            dispatch(requestDocuments(callback, initialFetch));
          }, 15000);
        }
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["get.documents.problem"]
        );
      });
  };
}

export function requestDocumentsByUserPage(
  userId: number,
  skip: number,
  pageId: string,
  cb?: () => void
) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    dispatch(toggleLoadingUserDocuments(true));
    return axios
      .get(GLOBAL_URL + "/document/byUser/" + userId, {
        params: {
          skip
        },
        headers: authorization
      })
      .then(data => {
        dispatch(
          receivedDocumentsByUserPage(
            userId,
            data.data.documents,
            data.data.user,
            pageId
          )
        );
        if (cb) {
          cb();
        }
      })
      .catch(err => {
        if (cb) {
          cb();
        }
        dispatch(toggleLoadingUserDocuments(false));
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["get.documents.problem"]
        );
      });
  };
}

export function requestDocument(id: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);

    return axios
      .get(GLOBAL_URL + "/document/byId/" + id, {
        headers: authorization
      })
      .then(data => {
        dispatch(receivedDocument(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["get.documents.problem"]
        );
      });
  };
}

export function requestOwnDocuments() {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    dispatch(showGettingOwnDocumentsLoader(true));
    axios
      .get(GLOBAL_URL + "/document/own/", {
        headers: authorization
      })
      .then(data => {
        dispatch(receivedOwnDocuments(data.data));
      })
      .catch(err => {
        dispatch(showGettingOwnDocumentsLoader(false));
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["get.documents.problem"]
        );
      });
  };
}

export function saveDocument() {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    const {
      photo,
      description,
      shareLocation,
      categoryId,
      tags,
      price,
      customTags
    } = state.shareModal;

    const image = {
      uri: photo.path,
      type: "image/jpeg",
      name: description
    };

    // send file as formData / accompanied by according fields
    var formData = new FormData();
    formData.append("image", image as any);
    formData.append("description", description);
    if (price) {
      formData.append("price", <any>parseFloat(price.replace(",", ".")));
    }
    if (categoryId) {
      formData.append("categoryId", categoryId);
    }
    if (tags) {
      formData.append("tags", JSON.stringify(tags));
    }

    if (customTags) {
      formData.append(
        "customTags",
        JSON.stringify(keys(pickBy(customTags, (tag: any) => tag.isChecked)))
      );
    }

    if (shareLocation) {
      formData.append("location", JSON.stringify(shareLocation));
    }
    dispatch(loadingShareModal(true));
    axios
      .post(GLOBAL_URL + "/document/createDocument", formData, {
        headers: {
          ...authorization,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(data => {
        dispatch(documentSaved(data.data.document, data.data.tags));
        dispatch(loadingShareModal(false));
        dispatch(clearShareModal());

        // switch to home tab to show the post
        state.trendingThingsNav.tabNavigation.navigate("Home");
        dispatch(setLastTab("Home"));

        // reset nested navigation to first
        dispatch(resetNavigation());

        if (state.app.trendingListRef) {
          setTimeout(() => {
            state.app.trendingListRef.scrollTo({
              y: 0,
              animated: true
            });
            state.app.dropDownAlertRef.alertWithType(
              "success",
              "",
              locale[state.app.language]["add.product.success"]
            );
          }, 500);
        }
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["add.product.error"]
        );
        dispatch(loadingShareModal(false));
      });
  };
}

export function saveAvatar(image: any) {
  const avatar = {
    uri: image.path,
    type: "image/jpeg",
    name: "image.jpg"
  };

  // compose formData
  var formData = new FormData();
  formData.append("image", avatar as any);

  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    dispatch(avatarSave());
    axios
      .post(GLOBAL_URL + "/user/saveAvatar", formData, {
        headers: {
          ...authorization,
          "Content-type": "multipart/form-data"
        }
      })
      .then(data => {
        state.app.dropDownAlertRef.alertWithType(
          "success",
          locale[state.app.language]["profile.picture.update.success"],
          ""
        );
        dispatch(avatarSaved());
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["profile.picture.update.error"]
        );
      });
  };
}

export function likeDocument(documentId: number, pageId?: any) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    dispatch(documentLike());
    axios
      .put(
        GLOBAL_URL + "/like/document",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(documentLiked(data.data.document, pageId));
      })
      .catch(err => {});
  };
}

export function dislikeDocument(documentId: number, pageId?: any) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    dispatch(documentDislike());
    axios
      .put(
        GLOBAL_URL + "/dislike/document",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(documentDisliked(data.data.document, pageId));
      })
      .catch(err => {});
  };
}

export function followUser(followeeId: number, pageId: string) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    dispatch(followActionLoading(true));
    axios
      .put(
        GLOBAL_URL + "/follower/followUser",
        {
          followeeId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(userFollowed(data.data.follower, data.data.user, pageId));
        dispatch(followActionLoading(false));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function unFollowUser(followeeId: number, pageId: string) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    dispatch(followActionLoading(true));
    axios
      .put(
        GLOBAL_URL + "/follower/unFollowUser",
        {
          followeeId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(userUnfollowed(followeeId, data.data.user, pageId));
        dispatch(followActionLoading(false));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function feedbackQuality(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/feedback/quality",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function unfeedbackQuality(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/unfeedback/quality",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function feedbackGoodPrice(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/feedback/goodPrice",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function unfeedbackGoodPrice(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/unfeedback/goodPrice",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function feedbackGoodQualityPriceRatio(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/feedback/goodQualityPrice",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function unfeedbackGoodQualityPriceRatio(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/unfeedback/goodQualityPrice",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function feedbackWorthIt(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/feedback/worthIt",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function unfeedbackWorthIt(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/unfeedback/worthIt",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function feedbackExpensive(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/feedback/expensive",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function unfeedbackExpensive(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/unfeedback/expensive",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function feedbackBadQuality(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/feedback/badQuality",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export function unfeedbackBadQuality(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/unfeedback/badQuality",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(feedbackComplete(data.data.document));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
}

export const sendComment = (
  documentId: number,
  comment: string,
  onComplete: () => void
) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .post(
        GLOBAL_URL + "/comment/create",
        {
          documentId,
          comment
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(commentUpdated(data.data.comment, documentId));
        dispatch(clearPostComment(documentId));
        dispatch(hideCommentBarOnPost(documentId));
        if (onComplete) {
          onComplete();
        }
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["send.comment.error"]
        );
      });
  };
};

export const sendReply = (
  documentId: number,
  commentId: number,
  userId: number,
  comment: string,
  replyToReplyId: number,
  onComplete: () => void
) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .post(
        GLOBAL_URL + "/comment/reply",
        {
          documentId,
          commentId,
          userId,
          comment,
          replyToReplyId
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(replyUpdated(data.data.reply, documentId));
        dispatch(commentUpdated(data.data.comment, documentId));
        dispatch(clearPostComment(documentId));
        dispatch(hideCommentBarOnPost(documentId));
        if (onComplete) {
          onComplete();
        }
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["send.comment.error"]
        );
      });
  };
};

export function getMapLocations(position: any) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .get(GLOBAL_URL + "/location/mapLocations", {
        params: {
          position
        },
        headers: authorization
      })
      .then(data => {
        dispatch(getLocationsComplete(data.data));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["get.locations.error"]
        );
      });
  };
}

export function registerInteraction(documentId: number) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/document/feedback/interaction",
        {
          documentId
        },
        {
          headers: authorization
        }
      )
      .catch(err => {});
  };
}

export const clearAroundLocations = () => ({
  type: CLEAR_AROUND_LOCATIONS
});

export const fetchAroundLocations = (latitude: number, longitude: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    dispatch(clearAroundLocations());
    axios
      .get(GLOBAL_URL + "/location/aroundLocations", {
        params: {
          latitude,
          longitude
        },
        headers: authorization
      })
      .then((data: any) => {
        dispatch(fetchAroundLocationsComplete(data.data.results));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["get.locations.error"]
        );
      });
  };
};

export const fetchComments = (documentId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    return axios
      .get(GLOBAL_URL + "/comment/getComments/", {
        params: {
          documentId
        },
        headers: {
          "Cache-Control": "no-cache",
          ...authorization
        }
      })
      .then((data: any) => {
        dispatch(
          commentsFetched(data.data.comments, data.data.replies, documentId)
        );
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["get.comments.error"]
        );
      });
  };
};

// Subscribe services functions
export const subscribeToCommentsUpdates = (documentId: number) => {
  return (dispatch: any, getState: any, socketConnection: any) => {
    socketConnection
      .getSocket()
      .on(`${SOCKET_COMMENT_UPDATE}/${documentId}`, (message: any) => {
        dispatch(commentUpdated(message.comment, documentId));
      });
  };
};

export const unsubscribeToCommentsUpdates = (documentId: number) => {
  return (dispatch: any, getState: any, socketConnection: any) => {
    socketConnection.getSocket().off(`${SOCKET_COMMENT_UPDATE}/${documentId}`);
  };
};

export const subscribeToRepliesUpdates = (documentId: number) => {
  return (dispatch: any, getState: any, socketConnection: any) => {
    socketConnection
      .getSocket()
      .on(`${SOCKET_REPLY_UPDATE}/${documentId}`, (message: any) => {
        dispatch(replyUpdated(message.reply, documentId));
      });
  };
};

export const unsubscribeToRepliesUpdates = (documentId: number) => {
  return (dispatch: any, getState: any, socketConnection: any) => {
    socketConnection.getSocket().off(`${SOCKET_REPLY_UPDATE}/${documentId}`);
  };
};

export const subscribeToMessagesUpdates = (receiverId: number) => (
  dispatch: any,
  getState: any,
  socketConnection: any
) => {
  socketConnection
    .getSocket()
    .on(`${SOCKET_MESSAGES_UPDATE}/${receiverId}`, (message: any) => {
      dispatch(messagesUpdate(message.message));
    });
};

export const unsubscribeToMessagesUpdates = (receiverId: number) => (
  dispatch: any,
  getState: any,
  socketConnection: any
) => {
  socketConnection.getSocket().off(`${SOCKET_MESSAGES_UPDATE}/${receiverId}`);
};

export const subscribeToChatsUpdates = (receiverId: number) => (
  dispatch: any,
  getState: any,
  socketConnection: any
) => {
  socketConnection
    .getSocket()
    .on(`${SOCKET_CHATS_UPDATE}/${receiverId}`, (message: any) => {
      dispatch(chatsUpdate(message.chat));
    });
};

export const unsubscribeToChatsUpdates = (receiverId: number) => (
  dispatch: any,
  getState: any,
  socketConnection: any
) => {
  socketConnection.getSocket().off(`${SOCKET_CHATS_UPDATE}/${receiverId}`);
};

export function subscribeToNotifications(userId: number) {
  return (dispatch: any, getState: any, socketConnection: any) => {
    socketConnection
      .getSocket()
      .on(SOCKET_NOTIFICATIONS_UPDATE + "/" + userId, (message: any) => {
        dispatch(notificationsFetched(message.notifications));
      });
  };
}

export function unsubscribeToNotifications(userId: number) {
  return (dispatch: any, getState: any, socketConnection: any) => {
    socketConnection
      .getSocket()
      .off(SOCKET_NOTIFICATIONS_UPDATE + "/" + userId);
  };
}

export function unsubscribeServices(userId: number) {
  unsubscribeToNotifications(userId);
  unsubscribeToChatsUpdates(userId);
}

export const likeComment = (commentId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/comment/like",
        {
          commentId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(
          commentUpdated(data.data.comment, data.data.comment.documentId)
        );
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const dislikeComment = (commentId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/comment/dislike",
        {
          commentId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(
          commentUpdated(data.data.comment, data.data.comment.documentId)
        );
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const likeReply = (replyId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/comment/likeReply",
        {
          replyId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(replyUpdated(data.data.reply, data.data.reply.documentId));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const dislikeReply = (replyId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/comment/dislikeReply",
        {
          replyId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(replyUpdated(data.data.reply, data.data.reply.documentId));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const fetchReviews = (documentId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);

    return axios
      .get(GLOBAL_URL + "/review/getReviews/", {
        params: {
          documentId
        },
        headers: {
          "Cache-Control": "no-cache",
          ...authorization
        }
      })
      .then((data: any) => {
        dispatch(reviewsFetched(data.data.reviews));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const sendReview = (
  documentId: number,
  review: string,
  rating: number,
  onComplete: () => void
) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .post(
        GLOBAL_URL + "/review/create",
        {
          documentId,
          review,
          rating
        },
        {
          headers: authorization
        }
      )
      .then(data => {
        dispatch(reviewUpdated(data.data.review));
        dispatch(clearPostReview());
        dispatch(hideCommentBarOnPost(documentId));
        onComplete();
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const usefulReview = (reviewId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/review/useful",
        {
          reviewId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(reviewUpdated(data.data.review));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const removeUseful = (reviewId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);

    axios
      .put(
        GLOBAL_URL + "/review/removeUseful",
        {
          reviewId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(reviewUpdated(data.data.review));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const notUsefulReview = (reviewId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/review/notUseful",
        {
          reviewId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(reviewUpdated(data.data.review));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const removeNotUseful = (reviewId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/review/removeNotUseful",
        {
          reviewId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(reviewUpdated(data.data.review));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const setFilter = (filters: any) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/filter/setFilter",
        {
          filters
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(filterUpdated(data.data.filter));
        dispatch(toggleShowFilter(false));
        dispatch(requestDocuments());
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const removeFilter = (type: string, typeId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/filter/removeFilter",
        {
          type,
          typeId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(filterUpdated(data.data.filter));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const clearFilter = (type: string) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/filter/clearFilter",
        {
          type
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(filterUpdated(data.data.filter));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const fetchScans = (type: any, code: any) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);

    axios
      .get(GLOBAL_URL + "/scan/getScans/", {
        params: {
          type,
          code
        },
        headers: authorization
      })
      .then((data: any) => {
        dispatch(scansFetched(data.data.scans));
        dispatch(toggleLoadingScans(false));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["get.scans.error"]
        );
      });
  };
};

export const addScan = (
  barcode: any,
  details: string,
  price: number,
  location: any
) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .put(
        GLOBAL_URL + "/scan/addScan/",
        {
          barcode,
          details,
          price,
          location
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(scanUpdated(data.data.scan));
        dispatch(toggleShowAddScan(false));
        dispatch(clearAddScan());
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const likeScan = (scanId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .patch(
        GLOBAL_URL + "/scan/like/",
        {
          scanId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(scanUpdated(data.data.scan));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const removeLikeScan = (scanId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .patch(
        GLOBAL_URL + "/scan/removeLike/",
        {
          scanId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(scanUpdated(data.data.scan));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const dislikeScan = (scanId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .patch(
        GLOBAL_URL + "/scan/dislike/",
        {
          scanId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(scanUpdated(data.data.scan));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const removeDislikeScan = (scanId: number) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const authorization = getAuthorization(state);
    axios
      .patch(
        GLOBAL_URL + "/scan/removeDislike/",
        {
          scanId
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        dispatch(scanUpdated(data.data.scan));
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["action.error"]
        );
      });
  };
};

export const fetchNotifications = (callback?: () => void) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);
  dispatch(toggleLoadingNotifications(true));
  axios
    .get(GLOBAL_URL + "/notification/get/", {
      headers: authorization
    })
    .then((data: any) => {
      dispatch(notificationsFetched(data.data.notifications));
      if (callback) {
        callback();
      }
    })
    .catch(err => {
      if (callback) {
        callback();
      }
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["get.notifications.errors"]
      );
    });
};

export const setUserLocation = (locationId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);
  axios
    .patch(
      GLOBAL_URL + "/user/setLocation",
      {
        locationId
      },
      {
        headers: authorization
      }
    )
    .then((data: any) => {
      dispatch(updateUserInfo(data.data.user));
      dispatch(toggleLocationChooserModal(false));
      state.app.dropDownAlertRef.alertWithType(
        "success",
        "",
        locale[state.app.language]["location.changed"]
      );
    })
    .catch(err => {
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["action.error"]
      );
    });
};

export const setHideLocationTooltipPref = (show: boolean) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);
  axios
    .post(
      GLOBAL_URL + "/user/userPreferences/updateLocationTooltip",
      {
        hideLocationTooltip: show
      },
      {
        headers: authorization
      }
    )
    .then((data: any) => {
      dispatch(updateUserPreferences(data.data.userPreferences));
    })
    .catch(err => {
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["action.error"]
      );
    });
};

export const search = (cb?: any) => (dispatch: any, getState: any) => {
  const state = getState();
  const authorization = getAuthorization(state);

  dispatch({
    type: SHOW_SEARCH_RESULTS
  });
  dispatch(toggleSearchingDocuments(true));

  axios
    .get(GLOBAL_URL + "/document/searchByText", {
      params: {
        searchText: state.applicationData.searchText
      },
      headers: authorization
    })
    .then((data: any) => {
      dispatch(updateDocuments(data.data.documents));
      dispatch(setSearchResults(data.data.searchIds));
      if (cb) {
        cb();
      }
    })
    .catch(err => {
      dispatch(toggleSearchingDocuments(false));
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["action.error"]
      );
    });
};

export const loadMoreSearches = (pagination: number, cb?: any) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);

  dispatch(loadingMoreSearches());
  const searchText = state.applicationData.searchText;
  axios
    .get(GLOBAL_URL + "/document/searchByText", {
      params: {
        searchText,
        pagination
      },
      headers: authorization
    })
    .then((data: any) => {
      dispatch(updateDocuments(data.data.documents));
      dispatch(setMoreSearchResults(data.data.searchIds));
      if (cb) {
        cb();
      }
    })
    .catch(err => {
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["action.error"]
      );
    });
};

export const markNotificationsAsSeen = () => (dispatch: any, getState: any) => {
  const state = getState();
  const authorization = getAuthorization(state);
  axios
    .patch(
      GLOBAL_URL + "/notification/seenAll/",
      {},
      {
        headers: authorization
      }
    )
    .then((data: any) => {
      dispatch(fetchNotifications());
    })
    .catch(err => {});
};

export const markNotificationAsChecked = (notificationId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);
  axios
    .patch(
      GLOBAL_URL + "/notification/checked/",
      {
        notificationId
      },
      {
        headers: authorization
      }
    )
    .then((data: any) => {
      dispatch(notificationsFetched(data.data.notifications));
    })
    .catch(err => {});
};

export const editDocument = (
  documentId: number,
  newPrice: number,
  cb?: () => void
) => (dispatch: any, getState: any) => {
  const state = getState();
  const authorization = getAuthorization(state);
  axios
    .patch(
      GLOBAL_URL + "/document/edit/",
      {
        documentId,
        newPrice
      },
      {
        headers: authorization
      }
    )
    .then((data: any) => {
      dispatch(updateDocument(data.data.document));
      state.app.dropDownAlertRef.alertWithType(
        "success",
        "",
        locale[state.app.language]["product.updated"]
      );

      if (cb) {
        cb();
      }
    })
    .catch(err => {
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["action.error"]
      );
    });
};

export const changePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  cb?: () => void
) => (dispatch: any, getState: any) => {
  const state = getState();
  const authorization = getAuthorization(state);
  if (newPassword !== confirmPassword) {
    state.app.dropDownAlertRef.alertWithType(
      "error",
      "",
      locale[state.app.language]["passwords.dont.match"]
    );
  } else if (!validatePassword(newPassword)) {
    state.app.dropDownAlertRef.alertWithType(
      "error",
      "",
      locale[state.app.language]["password.length.text"]
    );
  } else {
    axios
      .patch(
        GLOBAL_URL + "/user/changePassword",
        {
          oldPassword,
          newPassword
        },
        {
          headers: authorization
        }
      )
      .then((data: any) => {
        state.app.dropDownAlertRef.alertWithType(
          "success",
          "",
          locale[state.app.language]["password.changed"]
        );

        if (cb) {
          cb();
        }
      })
      .catch(err => {
        state.app.dropDownAlertRef.alertWithType(
          "error",
          "",
          locale[state.app.language]["incorrect.password"]
        );
      });
  }
};

export const fetchTags = () => (dispatch: any, getState: any) => {
  dispatch(toggleLoadingTags(true));

  const state = getState();
  const authorization = getAuthorization(state);

  axios
    .get(GLOBAL_URL + "/tag/getTags", {
      headers: authorization
    })
    .then(data => {
      dispatch(setTags(data.data.tags));
    })
    .catch(err => {
      dispatch(toggleLoadingTags(false));
      state.app.dropDownAlertRef.alertWithType(
        "error",
        "",
        locale[state.app.language]["tags.fetch.error"]
      );
    });
};
