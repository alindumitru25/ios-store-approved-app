import { combineReducers } from "redux";

import {
  CONNECTED,
  CONNECT,
  DISCONNECTED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  ERROR,
  LOG_OUT,
  CREATE_USER,
  CREATED_USER,
  SHOW_LOGIN_ERROR_MESSAGE,
  SHOW_REGISTER_ERROR_MESSAGE,
  TOGGLE_AUTH_LOADER,
  FACEBOOK_LOGIN_SUCCESS,
  SET_DROPDOWN_REF,
  TOGGLE_ACTIVATION_MODAL,
  TRY_LOGIN_LOADER,
  SET_LANGUAGE,
  SET_PREDEFINED_LOCATIONS
} from "./../actions/actions";

import {
  GET_INITIAL_DATA,
  RECEIVED_INITIAL_DATA,
  DOCUMENT_SAVE,
  DOCUMENT_SAVED,
  RECEIVED_DOCUMENTS,
  DOCUMENT_LIKE,
  DOCUMENT_LIKED,
  DOCUMENT_DISLIKE,
  DOCUMENT_DISLIKED,
  AVATAR_SAVE,
  AVATAR_SAVED,
  TOGGLE_LOADING_USER_DOCUMENTS,
  RECEIVED_DOCUMENTS_BY_USER,
  FOLLOWED_USER,
  FOLLOW_ACTION_LOADING,
  UNFOLLOWED_USER,
  FEEDBACK_QUALITY_COMPLETE,
  GET_MAP_LOCATIONS_COMPLETE,
  CLEAR_DOCUMENTS_BY_USER_PAGE,
  FETCH_AROUND_LOCATIONS_COMPLETE,
  RECEIVED_OWN_DOCUMENTS,
  RECEIVED_DOCUMENT,
  OPEN_REACTION_PANEL,
  CLOSE_REACTION_PANEL,
  SET_ACTIVE_TAB,
  SHOW_POST_COMMENT_BAR,
  HIDE_POST_COMMENT_BAR,
  SET_POST_COMMENT,
  CLEAR_POST_COMMENT,
  COMMENT_UPDATED,
  COMMENTS_FETCHED,
  CLEAR_COMMENTS,
  REPLY_TO,
  REPLY_TO_REPLY,
  CLEAR_REPLY_TO,
  REPLY_UPDATED,
  CLEAR_COMMENTS_DATA,
  REVIEW_UPDATED,
  REVIEW_FETCHED,
  CLEAR_REVIEWS,
  SET_POST_REVIEW,
  SET_RATING,
  CLEAR_POST_REVIEW,
  TOGGLE_SHOW_FILTER,
  FILTER_UPDATED,
  TOGGLE_SCAN_CAMERA,
  SET_BAR_CODE,
  SCANS_FETCHED,
  TOGGLE_LOADING_SCANS,
  TOGGLE_SHOW_ADD_SCAN,
  TOGGLE_SCAN_LOCATION_CHOOSER,
  CLEAR_BARCODE,
  ADD_LOCATION_TO_BARCODE,
  SCAN_UPDATED,
  CLEAR_ADD_SCAN,
  TOGGLE_SHOW_CREATE_POST,
  SET_SCANS_SORTING,
  SET_TAB_NAVIGATION,
  SET_LAST_TAB,
  LOADING_SHARE_MODAL,
  CLEAR_DOCUMENTS,
  LOADING_DOCUMENTS,
  LOADING_DOCUMENTS_ERROR,
  NOTIFICATIONS_FETCHED,
  TOGGLE_LOADING_NOTIFICATIONS,
  OPEN_MESSAGE_MODAL,
  CLEAR_MESSAGE_MODAL,
  RECEIVED_CHATS,
  RECEIVED_MESSAGES,
  MESSAGES_UPDATE,
  CHATS_UPDATE,
  TOGGLE_LOADING_CHATS,
  TOGGLE_LOADING_MESSAGES,
  SHOW_SEND_PHOTO_MODAL,
  CLOSE_SEND_PHOTO_MODAL,
  TOGGLE_LOADING_SEND_MESSAGE,
  SET_TRENDING_LIST_REF,
  TOGGLE_HIDE_LOCATION_TOOLTIP,
  TOGGLE_LOCATION_CHOOSER_MODAL,
  UPDATE_USER_PREFERENCES,
  SET_SEARCH,
  SET_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  SHOW_SEARCH_RESULTS,
  CLEAR_NOTIFICATIONS_NAV,
  TOGGLE_SEARCH_BAR,
  UPDATE_DOCUMENTS,
  SET_DROPDOWN_ALERT_REF,
  SET_MORE_SEARCH_RESULTS,
  LOADING_MORE_SEARCHES,
  CLEAR_SHARE_MODAL,
  UPDATE_DOCUMENT,
  RESET_STATE,
  RECEIVED_DOCUMENTS_BY_USER_PAGE,
  CLEAR_AROUND_LOCATIONS,
  SET_TAGS,
  TOGGLE_LOADING_TAGS,
  UPDATE_RECEIVER_USER,
  TOGGLE_SEARCHING_DOCUMENTS,
  SET_HIDE_NO_INTERNET_WARNING,
  UPDATE_USER_INFO
} from "./../actions/AppActions";

import {
  SET_POSITION,
  SET_EXISTING_LOCATION,
  SHOW_NEW_MARKER,
  CLEAR_LOCATION_CHOOSER,
  SET_NEW_MARKER,
  SET_CUSTOM_POSITION,
  VIEW_CUSTOM_POSITION,
  SHOW_EXISTING_LOCATION
} from "./../actions/LocationActions";

import {
  NAVIGATE_TRENDING_POST,
  NAVIGATE_TRENDING_WALL,
  NAVIGATE_BACK,
  NAVIGATE_USER_PROFILE,
  NAVIGATE_TO_SETTINGS,
  SR_NAVIGATE_TRENDING_POST,
  SR_NAVIGATE_BACK,
  SR_NAVIGATE_USER_PROFILE,
  SR_NAVIGATE_TO_EDIT_POST,
  RESET_NAVIGATION,
  NAVIGATE_TO_EDIT_POST,
  N_NAVIGATE_TRENDING_POST,
  N_NAVIGATE_BACK,
  N_NAVIGATE_USER_PROFILE,
  N_NAVIGATE_TO_EDIT_POST,
  M_NAVIGATE_TRENDING_POST,
  M_NAVIGATE_BACK,
  M_NAVIGATE_USER_PROFILE,
  M_NAVIGATE_TO_EDIT_POST
} from "./../actions/TrendingNavActions";

import {
  SET_SHARE_MODAL_PHOTO,
  SET_SHARE_MODAL_DESCRIPTION,
  SHOW_TAGS_OVERLAY,
  CLOSE_TAGS_OVERLAY,
  SET_CATEGORY_ID,
  SET_PRICE,
  TOGGLE_SHARE_LOCATION_CHOOSER,
  SET_SHARE_LOCATION_CHOOSER,
  TOGGLE_CATEGORIES_MODAL,
  TOGGLE_TAGS_MODAL,
  SET_TAG,
  UNSET_TAG,
  TOGGLE_EDIT_PRICE_LATER,
  TOGGLE_LOADING_CUSTOM_TAG,
  ADD_CUSTOM_TAG,
  CLEAR_CUSTOM_TAG_FROM_TEXT,
  TOGGLE_CHECK_CUSTOM_TAG
} from "./../actions/ShareModalActions";

import {
  SET_QUESTION_CATEGORY,
  SET_QUESTION,
  CLEAR_QUESTION,
  SUBMIT_QUESTION_COMPLETE,
  SHOW_LOADER,
  HIDE_LOADER,
  GET_QUESTIONS_COMPLETE,
  OPEN_QUESTION,
  CLOSE_QUESTION,
  SHOW_MATCHING_PRODUCTS_LOADER,
  HIDE_MATCHING_PRODUCTS_LOADER,
  GET_MATCHING_PRODUCTS_COMPLETE,
  SET_ATTACHMENT_PHOTO,
  SHOW_COMMENT_LOADER,
  HIDE_COMMENT_LOADER,
  SEND_COMMENT_COMPLETE,
  FETCH_COMMENTS_COMPLETE,
  CONTRACT_ASK,
  EXPAND_ASK,
  SHOW_LOCATION_CHOOSER,
  HIDE_LOCATION_CHOOSER,
  ADD_LOCATION_TO_QUESTION,
  ClEAR_QUESTION_LOCATION,
  SET_QUESTIONS_FILTER,
  UPDATE_QUESTION,
  UPDATE_COMMENT,
  RECEIVED_SOCKET_COMMENT,
  CLEAR_RECEIVED_COMMENT_NOTIFICATION,
  UPDATE_REPLY,
  SHOW_PRODUCT_CHOOSER,
  HIDE_PRODUCT_CHOOSER,
  SELECT_PRODUCT_TO_SHARE,
  CLEAR_PRODUCT_TO_SHARE,
  SHOW_COMMENT_BOX,
  HIDE_COMMENT_BOX
} from "./../actions/WhereActions";

import { TrendingNav } from "./../trending/TrendingThingsPosts";
import { SearchResultsNav } from "./../components/searchResults/SearchResults";
import { NotificationsNav } from "./../trending/notifications/NotificationsNavWrapper";
import { MessagesNav } from "./../trending/messages/MessagesNavWrapper";
import { NavigationActions } from "react-navigation";
import { QuestionsFilterEnum } from "./../utils/enums/Enums";

import { filter, startsWith, forEach } from "lodash";

// @TODO FIX-ME Use spread operators instead of object assign
function authentication(
  state: any = {
    tryLoginLoader: true,
    isConnected: false,
    isAuthenticated: false
  },
  action: any
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return (<any>Object).assign({}, state, {
        loading: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCCESS:
      return (<any>Object).assign({}, state, {
        loading: false,
        isAuthenticated: true,
        errorMessage: "",
        token: action.token,
        userId: action.userId,
        tryLoginLoader: false
      });
    case FACEBOOK_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        errorMessage: "",
        userId: action.userId,
        accessToken: action.accessToken,
        tryLoginLoader: false
      };
    case ERROR:
      return (<any>Object).assign({}, state, {
        loading: false,
        errorMessage: action.message,
        errorType: action.errorType
      });
    case LOG_OUT:
      return (<any>Object).assign({}, state, {
        loading: false,
        isAuthenticated: false
      });
    case CREATE_USER:
      return (<any>Object).assign({}, state, {
        loading: true
      });
    case CREATED_USER:
      return (<any>Object).assign({}, state, {
        loading: false
      });
    case SHOW_LOGIN_ERROR_MESSAGE:
      return {
        ...state,
        loginErrorMessage: action.message,
        loading: action.message ? false : state.loading
      };
    case SHOW_REGISTER_ERROR_MESSAGE:
      return {
        ...state,
        registerErrorMessage: action.message,
        loading: action.message ? false : state.loading
      };
    case TOGGLE_AUTH_LOADER:
      return {
        ...state,
        loading: action.show
      };
    case SET_DROPDOWN_REF:
      return {
        ...state,
        dropdownRef: action.ref
      };
    case TRY_LOGIN_LOADER:
      return {
        ...state,
        tryLoginLoader: action.show
      };
    default:
      return state;
  }
}

function applicationData(
  state: any = {
    openReactionPanel: false
  },
  action: any
) {
  switch (action.type) {
    case GET_INITIAL_DATA:
      return (<any>Object).assign({}, state, {
        loading: true
      });
    case RECEIVED_INITIAL_DATA:
      return (<any>Object).assign({}, state, {
        loading: false,
        initialData: action.initialData
      });
    case DOCUMENT_SAVE:
      return (<any>Object).assign({}, state, {
        loading: true
      });
    case DOCUMENT_SAVED:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.document.id]: action.document
        },
        trendingIds: [action.document.id, ...state.trendingIds],
        initialData: {
          ...state.initialData,
          tags: {
            ...state.initialData.tags,
            ...action.tags
          }
        }
      };
    case LOADING_DOCUMENTS:
      return {
        ...state,
        loadingDocuments: true
      };
    case LOADING_DOCUMENTS_ERROR:
      return {
        ...state,
        loadingDocuments: false
      };
    case RECEIVED_DOCUMENTS:
      return {
        ...state,
        documents: {
          ...state.documents,
          ...action.documents
        },
        userId: action.userId,
        trendingIds: action.trendingDocumentsIds,
        loadingDocuments: false
      };
    case UPDATE_DOCUMENTS:
      return {
        ...state,
        documents: {
          ...state.documents,
          ...action.documents
        }
      };
    case TOGGLE_LOADING_USER_DOCUMENTS: {
      return {
        ...state,
        loadingUserDocuments: action.loading
      };
    }
    case RECEIVED_DOCUMENTS_BY_USER: {
      const loadedDocuments = state.documentsByUser
        ? state.documentsByUser[action.userId]
        : null;
      return {
        ...state,
        documentsByUser: {
          ...state.documentsByUser,
          [action.userId]: {
            ...loadedDocuments,
            ...action.documents
          }
        },
        loadingUserDocuments: false
      };
    }
    case RECEIVED_DOCUMENTS_BY_USER_PAGE: {
      const loadedDocuments = state.documentsByUserPage
        ? state.documentsByUserPage[action.pageId]
        : null;
      return {
        ...state,
        documentsByUserPage: {
          ...state.documentsByUserPage,
          [action.pageId]: {
            ...loadedDocuments,
            ...action.documents
          }
        },
        usersByUserPage: {
          ...state.usersByUserPage,
          [action.pageId]: action.user
        },
        loadingUserDocuments: false
      };
    }
    case CLEAR_DOCUMENTS_BY_USER_PAGE: {
      return {
        ...state,
        documentsByUserPage: {
          ...state.documentsByUserPage,
          [action.pageId]: null
        }
      };
    }
    case RECEIVED_OWN_DOCUMENTS:
      return {
        ...state,
        ownDocuments: action.documents,
        documents: {
          ...state.documents,
          ...action.ownDocuments
        }
      };
    case RECEIVED_DOCUMENT:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.document.id]: action.document
        }
      };
    case DOCUMENT_LIKE:
    case DOCUMENT_DISLIKE:
      return {
        ...state,
        loading: true
      };
    case DOCUMENT_DISLIKED:
    case DOCUMENT_LIKED: {
      if (action.pageId) {
        const loadedDocuments = state.documentsByUserPage
          ? state.documentsByUserPage[action.pageId]
          : null;
        const currentDocumentPos = state.documentsByUserPage[action.pageId]
          ? state.documentsByUserPage[action.pageId][action.document.id]
              .position
          : null;
        return {
          ...state,
          loading: false,
          documentsByUserPage: {
            ...state.documentsByUserPage,
            [action.pageId]: {
              ...loadedDocuments,
              [action.document.id]: {
                ...action.document,
                position: currentDocumentPos
              }
            }
          }
        };
      }
      return {
        ...state,
        loading: false,
        documents: {
          ...state.documents,
          [action.document.id]: action.document
        }
      };
    }
    case AVATAR_SAVE:
      return (<any>Object).assign({}, state, {
        loading: true
      });
    case AVATAR_SAVED:
      return (<any>Object).assign({}, state, {
        loading: false
      });
    case FOLLOW_ACTION_LOADING:
      return {
        ...state,
        followActionLoading: action.loading
      };
    case FOLLOWED_USER:
      return {
        ...state,
        initialData: {
          ...state.initialData,
          followers: {
            ...state.initialData.followers,
            [action.follower.followee]: action.follower
          }
        },
        usersByUserPage: {
          ...state.usersByUserPage,
          [action.pageId]: action.user
        }
      };
    case UNFOLLOWED_USER:
      return {
        ...state,
        initialData: {
          ...state.initialData,
          followers: {
            ...state.initialData.followers,
            [action.followeeId]: undefined
          }
        },
        usersByUserPage: {
          ...state.usersByUserPage,
          [action.pageId]: action.user
        }
      };
    case FEEDBACK_QUALITY_COMPLETE:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.document.id]: action.document
        }
      };
    case GET_MAP_LOCATIONS_COMPLETE: {
      return (<any>Object).assign({}, state, {
        mapLocations: action.locations
      });
    }
    case FETCH_AROUND_LOCATIONS_COMPLETE: {
      return {
        ...state,
        aroundLocations: action.locations
      };
    }
    case CLEAR_AROUND_LOCATIONS: {
      return {
        ...state,
        aroundLocations: null
      };
    }
    case OPEN_REACTION_PANEL:
      return {
        ...state,
        openReactionPanel: true,
        reactionPanelId: action.documentId
      };
    case CLOSE_REACTION_PANEL:
      return {
        ...state,
        openReactionPanel: false,
        reactionPanelId: null
      };
    case COMMENT_UPDATED:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        }
      };
    case REPLY_UPDATED:
      return {
        ...state,
        replies: {
          ...state.replies,
          [action.reply.id]: action.reply
        }
      };
    case COMMENTS_FETCHED:
      return {
        ...state,
        comments: action.comments,
        replies: action.replies
      };
    case REVIEW_FETCHED:
      return {
        ...state,
        reviews: action.reviews
      };
    case REVIEW_UPDATED:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.review.id]: action.review
        }
      };
    case CLEAR_REVIEWS:
      return {
        ...state,
        reviews: undefined
      };
    case FILTER_UPDATED:
      return {
        ...state,
        initialData: {
          ...state.initialData,
          filter: action.filter
        }
      };
    case SCANS_FETCHED:
      return {
        ...state,
        scans: action.scans
      };
    case SCAN_UPDATED:
      return {
        ...state,
        scans: {
          ...state.scans,
          [action.scan.id]: action.scan
        }
      };
    case CLEAR_DOCUMENTS:
      return {
        ...state,
        documents: undefined
      };
    case TOGGLE_LOADING_NOTIFICATIONS:
      return {
        ...state,
        loadingNotifications: true
      };
    case NOTIFICATIONS_FETCHED:
      return {
        ...state,
        loadingNotifications: false,
        notifications: {
          ...state.notifications,
          ...action.notifications
        }
      };
    case RECEIVED_CHATS:
      return {
        ...state,
        chats: {
          ...state.chats,
          ...action.chats
        },
        loadingChats: false
      };
    case RECEIVED_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.chatId]: action.messages
        },
        loadingMessages: false,
        receiverUser: action.receiverUser
      };
    case UPDATE_RECEIVER_USER:
      return {
        ...state,
        receiverUser: action.receiverUser
      };
    case CHATS_UPDATE:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.chat.id]: action.chat
        }
      };
    case MESSAGES_UPDATE:
      if (state.messages && state.messages[action.message.chatId]) {
        return {
          ...state,
          messages: {
            ...state.messages,
            [action.message.chatId]: [
              ...state.messages[action.message.chatId],
              action.message
            ]
          }
        };
      } else {
        const currentMessages =
          state.messages && state.messages[action.message.chatId];
        return {
          ...state,
          messages: {
            ...state.messages,
            [action.message.chatId]: [
              ...(currentMessages || []),
              action.message
            ]
          }
        };
      }
    case TOGGLE_LOADING_CHATS:
      return {
        ...state,
        loadingChats: true
      };
    case TOGGLE_LOADING_MESSAGES:
      return {
        ...state,
        loadingMessages: action.show
      };
    case UPDATE_USER_PREFERENCES:
      return {
        ...state,
        initialData: {
          ...state.initialData,
          userPreferences: action.userPreferences
        }
      };
    case SET_SEARCH:
      return {
        ...state,
        searchText: action.searchText
      };
    case TOGGLE_SEARCHING_DOCUMENTS:
      return {
        ...state,
        searchingDocuments: action.searching
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchIds: action.searchIds,
        searchingDocuments: false
      };
    case SET_MORE_SEARCH_RESULTS:
      return {
        ...state,
        searchIds: [...state.searchIds, ...action.searchIds],
        loadingMoreSearches: false
      };
    case CLEAR_SEARCH_RESULTS: {
      return {
        ...state,
        searchText: undefined,
        searchIds: undefined,
        loadingMoreSearches: false
      };
    }
    case LOADING_MORE_SEARCHES:
      return {
        ...state,
        loadingMoreSearches: true
      };
    case UPDATE_DOCUMENT:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.document.id]: action.document
        }
      };
    case TOGGLE_LOADING_TAGS:
      return {
        ...state,
        loadingTags: action.loading
      };
    case SET_TAGS:
      return {
        ...state,
        initialData: {
          ...state.initialData,
          tags: {
            ...state.initialData.tags,
            ...action.tags
          }
        },
        loadingTags: false
      };
    case SET_PREDEFINED_LOCATIONS:
      return {
        ...state,
        predefinedLocations: action.predefinedLocations
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        initialData: {
          ...state.initialData,
          user: action.user
        }
      };
    default:
      return state;
  }
}

// Location Chooser
function locationChooser(
  state = {
    showNewMarker: true
  },
  action: any
) {
  switch (action.type) {
    case SET_POSITION:
      return {
        ...state,
        position: action.position
      };
    case SET_CUSTOM_POSITION:
      return {
        ...state,
        customPosition: action.customPosition
      };
    case SET_EXISTING_LOCATION:
      return {
        ...state,
        existingLocation: action.existingLocation
      };
    case SET_NEW_MARKER:
      return {
        ...state,
        newMarker: action.newMarker
      };
    case VIEW_CUSTOM_POSITION:
      return {
        ...state,
        viewCustomPosition: action.viewCustomPosition
      };
    case SHOW_NEW_MARKER:
      return {
        ...state,
        showNewMarker: action.showNewMarker
      };
    case CLEAR_LOCATION_CHOOSER:
      return {};
    default:
      return state;
  }
}

const app = (
  state: any = {
    scansSorting: "createdAt",
    language: "en-US"
  },
  action: any
) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.activeTab
      };
    case SHOW_POST_COMMENT_BAR:
      return {
        ...state,
        showPostCommentBar: true
      };
    case HIDE_POST_COMMENT_BAR:
      return {
        ...state,
        showPostCommentBar: false
      };
    case SET_POST_COMMENT:
      return {
        ...state,
        postComment: action.comment
      };
    case CLEAR_POST_COMMENT:
      return {
        ...state,
        postComment: null
      };
    case REPLY_TO:
      return {
        ...state,
        replyTo: action.userId,
        replyToCommentId: action.commentId,
        replyToReplyId: null,
        replyToUsername: action.userName
      };
    case REPLY_TO_REPLY: {
      return {
        ...state,
        replyTo: action.userId,
        replyToReplyId: action.replyId,
        replyToCommentId: action.commentId,
        replyToUsername: action.userName
      };
    }
    case CLEAR_REPLY_TO:
      return {
        ...state,
        replyTo: undefined,
        replyToCommentId: undefined,
        replyToReplyId: undefined
      };
    case CLEAR_COMMENTS_DATA:
      return {
        ...state,
        comments: undefined,
        replies: undefined
      };
    case SET_POST_REVIEW:
      return {
        ...state,
        postReview: action.review
      };
    case SET_RATING:
      return {
        ...state,
        rating: action.rating
      };
    case CLEAR_POST_REVIEW:
      return {
        ...state,
        postReview: undefined
      };
    case TOGGLE_SHOW_FILTER:
      return {
        ...state,
        showFilter: action.show
      };
    case TOGGLE_SCAN_CAMERA:
      return {
        ...state,
        showScanCamera: action.show
      };
    case SET_BAR_CODE:
      return {
        ...state,
        barCode: {
          type: action.codeType,
          code: action.code
        }
      };
    case CLEAR_BARCODE:
      return {
        ...state,
        barCode: undefined,
        barcodeLocation: undefined
      };
    case TOGGLE_LOADING_SCANS:
      return {
        ...state,
        loadingScans: action.show
      };
    case TOGGLE_SHOW_ADD_SCAN:
      return {
        ...state,
        showAddScan: action.show
      };
    case TOGGLE_SCAN_LOCATION_CHOOSER:
      return {
        ...state,
        showScanLocationChooser: action.show
      };
    case ADD_LOCATION_TO_BARCODE:
      return {
        ...state,
        barcodeLocation: action.location
      };
    case CLEAR_ADD_SCAN:
      return {
        ...state,
        barcodeLocation: undefined
      };
    case TOGGLE_SHOW_CREATE_POST:
      return {
        ...state,
        showCreatePostSuggestion: action.show
      };
    case SET_SCANS_SORTING:
      return {
        ...state,
        scansSorting: action.sorting
      };
    case SET_LAST_TAB:
      return {
        ...state,
        lastTab: action.lastTab
      };
    case LOADING_SHARE_MODAL:
      return {
        ...state,
        loadingShareModal: action.loading
      };
    case OPEN_MESSAGE_MODAL:
      return {
        ...state,
        showMessageModal: true,
        messageModalReceiverId: action.userId
      };
    case CLEAR_MESSAGE_MODAL:
      return {
        ...state,
        showMessageModal: false,
        receiverUser: undefined
      };
    case SHOW_SEND_PHOTO_MODAL:
      return {
        ...state,
        showSendPhotoModal: true,
        sendPhoto: action.photo
      };
    case CLOSE_SEND_PHOTO_MODAL:
      return {
        ...state,
        showSendPhotoModal: false,
        sendPhoto: undefined
      };
    case TOGGLE_LOADING_SEND_MESSAGE:
      return {
        ...state,
        loadingSendMessage: action.loading
      };
    case SET_TRENDING_LIST_REF:
      return {
        ...state,
        trendingListRef: action.trendingListRef
      };
    case TOGGLE_HIDE_LOCATION_TOOLTIP:
      return {
        ...state,
        hideLocationTooltip: action.show
      };
    case TOGGLE_LOCATION_CHOOSER_MODAL:
      return {
        ...state,
        showLocationChooserModal: action.show
      };
    case SET_DROPDOWN_ALERT_REF: {
      return {
        ...state,
        dropDownAlertRef: action.ref
      };
    }
    case TOGGLE_ACTIVATION_MODAL: {
      return {
        ...state,
        showActivationModal: action.show,
        activationUrl: action.url
      };
    }
    case SET_LANGUAGE: {
      return {
        ...state,
        language:
          action.language &&
          (startsWith(action.language, "en") ||
            startsWith(action.language, "ro"))
            ? startsWith(action.language, "en") ? "en-US" : "ro"
            : "en-US"
      };
    }
    case SET_HIDE_NO_INTERNET_WARNING:
      return {
        ...state,
        hideNoInternetWarning: action.hide
      };
    default:
      return state;
  }
};

const trendingThingsNavInitialState = TrendingNav.router.getStateForAction(
  TrendingNav.router.getActionForPathAndParams("Home")
);

function trendingThingsNav(
  state = {
    ...trendingThingsNavInitialState,
    expandedSearchBar: false
  },
  action: any
) {
  let nextState;
  switch (action.type) {
    case NAVIGATE_BACK: {
      nextState = TrendingNav.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    }
    case RESET_NAVIGATION: {
      if (state.index === 0) {
        nextState = state;
        break;
      }
      nextState = TrendingNav.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        }),
        state
      );
      break;
    }
    case NAVIGATE_USER_PROFILE: {
      nextState = TrendingNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "UserProfile",
          params: action.params
        }),
        state
      );
      break;
    }
    case NAVIGATE_TRENDING_POST: {
      nextState = TrendingNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "TrendingPost",
          params: action.params
        }),
        state
      );
      break;
    }
    case NAVIGATE_TO_SETTINGS:
      nextState = TrendingNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "Settings"
        }),
        state
      );
      break;
    case SHOW_SEARCH_RESULTS:
      nextState = {
        ...state,
        showSearchResultsBackButton: true
      };
      break;
    case CLEAR_SEARCH_RESULTS: {
      nextState = {
        ...state,
        showSearchResultsBackButton: false
      };
      break;
    }
    case NAVIGATE_TO_EDIT_POST: {
      nextState = TrendingNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "EditPost",
          params: { documentId: action.documentId }
        }),
        state
      );
      break;
    }
    case SET_TAB_NAVIGATION:
      nextState = {
        ...state,
        tabNavigation: action.navigation
          ? action.navigation
          : state.tabNavigation
      };
      break;
    default:
      nextState = TrendingNav.router.getStateForAction(action, state);
      break;
  }

  /**
   * // @WARNING: Might became deprecated, observing implementation
   * Determine if we should show or hide back button based on nested routes
   */
  if (nextState && nextState.routes.length > 1) {
    nextState = {
      ...nextState,
      showBackButton: true
    };
  } else if (nextState && nextState.routes.length === 1) {
    nextState = {
      ...nextState,
      showBackButton: false
    };
  }
  return nextState || state;
}

const searchResultsNavInitialState = SearchResultsNav.router.getStateForAction(
  SearchResultsNav.router.getActionForPathAndParams("Home")
);

function searchResultsNav(
  state = {
    ...searchResultsNavInitialState
  },
  action: any
) {
  let nextState;
  switch (action.type) {
    case SR_NAVIGATE_BACK: {
      nextState = SearchResultsNav.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    }
    case SR_NAVIGATE_USER_PROFILE: {
      nextState = SearchResultsNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "UserProfile",
          params: action.params
        }),
        state
      );
      break;
    }
    case SR_NAVIGATE_TRENDING_POST: {
      nextState = SearchResultsNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "TrendingPost",
          params: action.params
        }),
        state
      );
      break;
    }
    case SR_NAVIGATE_TO_EDIT_POST: {
      nextState = SearchResultsNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "EditPost",
          params: { documentId: action.documentId }
        }),
        state
      );
      break;
    }
    case CLEAR_SEARCH_RESULTS: {
      nextState = searchResultsNavInitialState;
      break;
    }
    default:
      nextState = SearchResultsNav.router.getStateForAction(action, state);
      break;
  }

  /**
   * // @WARNING: Might became deprecated, observing implementation
   * Determine if we should show or hide back button based on nested routes
   */
  if (nextState && nextState.routes.length > 1) {
    nextState = {
      ...nextState,
      showBackButton: true
    };
  } else if (nextState && nextState.routes.length === 1) {
    nextState = {
      ...nextState,
      showBackButton: false
    };
  }
  return nextState || state;
}

const notificationsNavInitialState = NotificationsNav.router.getStateForAction(
  NotificationsNav.router.getActionForPathAndParams("Home")
);

function notificationsNav(
  state = {
    ...notificationsNavInitialState
  },
  action: any
) {
  let nextState;
  switch (action.type) {
    case N_NAVIGATE_BACK: {
      nextState = NotificationsNav.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    }
    case N_NAVIGATE_USER_PROFILE: {
      nextState = NotificationsNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "UserProfile",
          params: action.params
        }),
        state
      );
      break;
    }
    case N_NAVIGATE_TRENDING_POST: {
      nextState = NotificationsNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "TrendingPost",
          params: action.params
        }),
        state
      );
      break;
    }
    case N_NAVIGATE_TO_EDIT_POST: {
      nextState = NotificationsNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "EditPost",
          params: { documentId: action.documentId }
        }),
        state
      );
      break;
    }
    case CLEAR_NOTIFICATIONS_NAV: {
      nextState = notificationsNavInitialState;
      break;
    }
    default:
      nextState = NotificationsNav.router.getStateForAction(action, state);
      break;
  }

  /**
   * // @WARNING: Might became deprecated, observing implementation
   * Determine if we should show or hide back button based on nested routes
   */
  if (nextState && nextState.routes.length > 1) {
    nextState = {
      ...nextState,
      showBackButton: true
    };
  } else if (nextState && nextState.routes.length === 1) {
    nextState = {
      ...nextState,
      showBackButton: false
    };
  }
  return nextState || state;
}

const messagesNavInitialState = MessagesNav.router.getStateForAction(
  NotificationsNav.router.getActionForPathAndParams("Home")
);

function messagesNav(
  state = {
    ...messagesNavInitialState
  },
  action: any
) {
  let nextState;
  switch (action.type) {
    case M_NAVIGATE_BACK: {
      nextState = MessagesNav.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    }
    case M_NAVIGATE_USER_PROFILE: {
      nextState = MessagesNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "UserProfile",
          params: action.params
        }),
        state
      );
      break;
    }
    case M_NAVIGATE_TRENDING_POST: {
      nextState = MessagesNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "TrendingPost",
          params: action.params
        }),
        state
      );
      break;
    }
    case M_NAVIGATE_TO_EDIT_POST: {
      nextState = MessagesNav.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "EditPost",
          params: { documentId: action.documentId }
        }),
        state
      );
      break;
    }
    default:
      nextState = MessagesNav.router.getStateForAction(action, state);
      break;
  }

  /**
   * // @WARNING: Might became deprecated, observing implementation
   * Determine if we should show or hide back button based on nested routes
   */
  if (nextState && nextState.routes.length > 1) {
    nextState = {
      ...nextState,
      showBackButton: true
    };
  } else if (nextState && nextState.routes.length === 1) {
    nextState = {
      ...nextState,
      showBackButton: false
    };
  }
  return nextState || state;
}

function shareModal(state: any = {}, action: any) {
  switch (action.type) {
    case SET_SHARE_MODAL_PHOTO:
      return {
        ...state,
        photo: action.photo
      };
    case SET_SHARE_MODAL_DESCRIPTION:
      return {
        ...state,
        description: action.description
      };
    case SHOW_TAGS_OVERLAY:
      return {
        ...state,
        showTagsOverlay: true
      };
    case CLOSE_TAGS_OVERLAY:
      return {
        ...state,
        showTagsOverlay: false
      };
    case SET_PRICE:
      return {
        ...state,
        price: action.price
      };
    case SET_CATEGORY_ID:
      return {
        ...state,
        categoryId: action.categoryId
      };
    case CLEAR_SHARE_MODAL:
      return {
        ...state,
        photo: undefined,
        price: undefined,
        categoryId: undefined,
        shareLocation: undefined,
        description: undefined,
        tags: undefined,
        showShareLocationChooser: false,
        isEditPriceLaterChecked: false,
        customTags: undefined
      };
    case TOGGLE_SHARE_LOCATION_CHOOSER:
      return {
        ...state,
        showShareLocationChooser: action.show
      };
    case SET_SHARE_LOCATION_CHOOSER:
      return {
        ...state,
        shareLocation: action.location
      };
    case TOGGLE_CATEGORIES_MODAL:
      return {
        ...state,
        showCategoriesModal: action.show
      };
    case TOGGLE_TAGS_MODAL:
      return {
        ...state,
        showTagsModal: action.show
      };
    case SET_TAG:
      return {
        ...state,
        tags: state.tags ? [...state.tags, action.tagId] : [action.tagId]
      };
    case UNSET_TAG:
      return {
        ...state,
        tags: filter(state.tags, id => id !== action.tagId)
      };
    case TOGGLE_EDIT_PRICE_LATER:
      return {
        ...state,
        isEditPriceLaterChecked: action.show
      };
    case TOGGLE_LOADING_CUSTOM_TAG:
      return {
        ...state,
        loadingCustomTag: action.loading
      };
    case ADD_CUSTOM_TAG:
      return {
        ...state,
        customTags: {
          ...state.customTags,
          [action.customTag]: {
            name: action.customTag,
            isChecked: true,
            fromText: action.fromText
          }
        },
        loadingCustomTag: false
      };
    case CLEAR_CUSTOM_TAG_FROM_TEXT: {
      let filteredCustomTags: any;
      forEach(state.customTags, (tag: any) => {
        if (!tag.fromText) {
          filteredCustomTags = {
            ...filteredCustomTags,
            [tag.name]: tag
          };
        }
      });
      return {
        ...state,
        customTags: filteredCustomTags
      };
    }
    case TOGGLE_CHECK_CUSTOM_TAG:
      return {
        ...state,
        customTags: {
          ...state.customTags,
          [action.tagName]: {
            name: action.tagName,
            isChecked: action.isChecked
          }
        }
      };
    default:
      return state;
  }
}

function where(
  state: any = {
    question: "Unde găsesc...",
    questionsFilter: QuestionsFilterEnum.TRENDING,
    showCommentBox: false
  },
  action: any
) {
  switch (action.type) {
    case SET_QUESTION_CATEGORY:
      return {
        ...state,
        selectedCategory: action.id
      };
    case SET_QUESTION: {
      let question = action.value;
      if (action.value.length < 13) {
        question = "Unde găsesc ";
      }

      return {
        ...state,
        question
      };
    }
    case CLEAR_QUESTION:
      return {
        ...state,
        selectedCategory: null,
        question: "Unde găsesc "
      };
    case SUBMIT_QUESTION_COMPLETE:
      return {
        ...state,
        loading: false,
        isAskExpanded: false,
        questions: {
          ...state.questions,
          [action.question.id]: action.question
        }
      };
    case SHOW_LOADER:
      return {
        ...state,
        loading: true
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: false
      };
    case GET_QUESTIONS_COMPLETE:
      return {
        ...state,
        loading: false,
        questions: action.questions
      };
    case OPEN_QUESTION:
      return {
        ...state,
        selectedQuestion: action.question,
        showQuestion: true
      };
    case CLOSE_QUESTION:
      return {
        ...state,
        selectedQuestion: null,
        showQuestion: false
      };
    case SHOW_MATCHING_PRODUCTS_LOADER:
      return {
        ...state,
        showMatchingProductsLoader: true
      };
    case HIDE_MATCHING_PRODUCTS_LOADER:
      return {
        ...state,
        showMatchingProductsLoader: false
      };
    case GET_MATCHING_PRODUCTS_COMPLETE:
      return {
        ...state,
        showMatchingProductsLoader: false,
        matchingProducts: action.matchingProducts
      };
    case SET_ATTACHMENT_PHOTO:
      return {
        ...state,
        photoName: action.name,
        photo: action.photo
      };
    case SHOW_COMMENT_LOADER:
      return {
        ...state,
        showCommentLoader: true
      };
    case HIDE_COMMENT_LOADER:
      return {
        ...state,
        showCommentLoader: false
      };
    case SEND_COMMENT_COMPLETE: {
      return {
        ...state,
        showCommentLoader: false,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        }
      };
    }
    case FETCH_COMMENTS_COMPLETE:
      return {
        ...state,
        showCommentLoader: false,
        comments: action.comments
      };
    case EXPAND_ASK:
      return {
        ...state,
        isAskExpanded: true
      };
    case CONTRACT_ASK:
      return {
        ...state,
        isAskExpanded: false
      };
    case SHOW_LOCATION_CHOOSER:
      return {
        ...state,
        showLocationChooser: true
      };
    case HIDE_LOCATION_CHOOSER:
      return {
        ...state,
        showLocationChooser: false
      };
    case ADD_LOCATION_TO_QUESTION:
      return {
        ...state,
        questionsAddedLocations: {
          ...state.questionsAddedLocations,
          [action.questionId]: action.location
        }
      };
    case ClEAR_QUESTION_LOCATION:
      return {
        ...state,
        questionsAddedLocations: {
          ...state.questionsAddedLocations,
          [action.questionId]: undefined
        }
      };
    case SET_QUESTIONS_FILTER:
      return {
        ...state,
        questionsFilter: action.questionsFilter
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.question.id]: action.question
        }
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        }
      };
    case RECEIVED_SOCKET_COMMENT:
      return {
        ...state,
        showReceivedCommentNotification: {
          comment: action.comment
        },
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        }
      };
    case CLEAR_RECEIVED_COMMENT_NOTIFICATION:
      return {
        ...state,
        showReceivedCommentNotification: null
      };
    case UPDATE_REPLY:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.reply.commentId]: {
            ...state.comments[action.reply.commentId],
            replies: state.comments[action.reply.commentId].replies.map(
              (item: any) => {
                if (item.id !== action.reply.id) {
                  return item;
                }

                return action.reply;
              }
            )
          }
        }
      };
    case SHOW_PRODUCT_CHOOSER:
      return {
        ...state,
        showProductChooser: true
      };
    case HIDE_PRODUCT_CHOOSER:
      return {
        ...state,
        showProductChooser: false
      };
    case SELECT_PRODUCT_TO_SHARE:
      return {
        ...state,
        productToShare: action.product
      };
    case CLEAR_PRODUCT_TO_SHARE:
      return {
        ...state,
        productToShare: null
      };
    case SHOW_COMMENT_BOX:
      return {
        ...state,
        showCommentBox: true
      };
    case HIDE_COMMENT_BOX:
      return {
        ...state,
        showCommentBox: false
      };
    default:
      return state;
  }
}

const appReducer = combineReducers({
  authentication,
  app,
  applicationData,
  locationChooser,
  trendingThingsNav,
  searchResultsNav,
  notificationsNav,
  messagesNav,
  shareModal,
  where
});

const reducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    state = {
      authentication: {
        tryLoginLoader: false
      },
      app: {
        language: state.app.language
      }
    };
  }

  return appReducer(state, action);
};

export default reducer;
