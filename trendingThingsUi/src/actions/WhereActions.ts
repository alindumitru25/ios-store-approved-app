import * as io from "socket.io-client";
import axios from "axios";
import { setAuthInfo, removeAuthInfo, getAuthInfo } from "./UtilActions";
import { GLOBAL_URL } from "./../utils/Globals";

export const SET_QUESTION_CATEGORY = "WHERE/SET_QUESTION_CATEGORY";
export const SET_QUESTION = "WHERE/SET_QUESTION";
export const CLEAR_QUESTION = "WHERE/CLEAR_QUESTION";
export const SHOW_LOADER = "WHERE/SHOW_LOADER";
export const HIDE_LOADER = "WHERE/HIDE_LOADER";
export const SUBMIT_QUESTION_COMPLETE = "WHERE/SUBMIT_QUESTION_COMPLETE";
export const GET_QUESTIONS_COMPLETE = "WHERE/GET_QUESTIONS_COMPLETE";
export const OPEN_QUESTION = "WHERE/OPEN_QUESTION";
export const CLOSE_QUESTION = "WHERE/CLOSE_QUESTION";
export const SHOW_MATCHING_PRODUCTS_LOADER = "WHERE/MATCHING_PRODUCTS_LOADER";
export const HIDE_MATCHING_PRODUCTS_LOADER =
  "WHERE/HIDE_MATCHING_PRODUCTS_LOADER";
export const GET_MATCHING_PRODUCTS_COMPLETE =
  "WHERE/GET_MATCHING_PRODUCTS_COMPLETE";
export const SET_ATTACHMENT_PHOTO = "WHERE/SET_ATACHMENT_PHOTO";
export const SHOW_COMMENT_LOADER = "WHERE/SHOW_COMMENT_LOADER";
export const HIDE_COMMENT_LOADER = "WHERE/HIDE_COMMENT_LOADER";
export const SEND_COMMENT_COMPLETE = "WHERE/SEND_COMMENT_COMPLETE";
export const FETCH_COMMENTS_COMPLETE = "WHERE/FETCH_COMMENTS_COMPLETE";
export const EXPAND_ASK = "WHERE/EXPAND_ASK";
export const CONTRACT_ASK = "WHERE/CONTRACT_ASK";
export const SHOW_LOCATION_CHOOSER = "WHERE/SHOW_LOCATION_CHOOSER";
export const HIDE_LOCATION_CHOOSER = "WHERE/HIDE_LOCATION_CHOOSER";
export const ADD_LOCATION_TO_QUESTION = "WHERE/ADD_LOCATION_TO_QUESTION";
export const ClEAR_QUESTION_LOCATION = "WHERE/CLEAR_QUESTION_LOCATION";
export const SET_QUESTIONS_FILTER = "WHERE/SET_QUESTiONS_FILTER";
export const UPDATE_QUESTION = "WHERE/UPDATE_QUESTION";
export const UPDATE_COMMENT = "WHERE/UPDATE_COMMENT";
export const RECEIVED_SOCKET_COMMENT = "WHERE/RECEIVED_SOCKET_COMMENT";
export const CLEAR_RECEIVED_COMMENT_NOTIFICATION =
  "WHERE/CLEAR_RECEIVED_COMMENT_NOTIFICATION";
export const SEND_REPLY_COMPLETE = "WHERE/SEND_REPLY_COMPLETE";
export const UPDATE_REPLY = "WHERE/UPDATE_REPLY";
export const SHOW_PRODUCT_CHOOSER = "WHERE/SHOW_PRODUCT_CHOOSER";
export const HIDE_PRODUCT_CHOOSER = "WHERE/HIDE_PRODUCT_CHOOSER";
export const SELECT_PRODUCT_TO_SHARE = "WHERE/SELECT_PRODUCT_TO_SHARE";
export const CLEAR_PRODUCT_TO_SHARE = "WHERE/CLEAR_PRODUCT_TO_SHARE";
export const SHOW_COMMENT_BOX = "WHERE/SHOW_COMMENT_BOX";
export const HIDE_COMMENT_BOX = "WHERE/HIDE_COMMENT_BOX";
export const SET_TAB_NAVIGATION = "WHERE/SET_TAB_NAVIGATION";

const SOCKET_COMMENT_UPDATE = "SOCKET/COMMENT_UPDATE";
const DISMISS_NOTIF_TIMEOUT = 8000;

export const setQuestionCategory = (id: number) => ({
  id,
  type: SET_QUESTION_CATEGORY
});

export const setQuestion = (value: string) => ({
  value,
  type: SET_QUESTION
});

export const clearQuestion = () => ({
  type: CLEAR_QUESTION
});

export const setAttachmentPhoto = (photo: any) => ({
  photo,
  type: SET_ATTACHMENT_PHOTO,
  name: photo.name
});

const showLoader = () => ({
  type: SHOW_LOADER
});

const hideLoader = () => ({
  type: HIDE_LOADER
});

const submitQuestionComplete = (data: any) => ({
  type: SUBMIT_QUESTION_COMPLETE,
  question: data ? data.question : null
});

const getQuestionsComplete = (data: any) => ({
  type: GET_QUESTIONS_COMPLETE,
  questions: data.questions
});

const showMatchingProductsLoader = () => ({
  type: SHOW_MATCHING_PRODUCTS_LOADER
});

const hideMatchingProductsLoader = () => ({
  type: HIDE_MATCHING_PRODUCTS_LOADER
});

const getMatchingProductsComplete = (data: any) => ({
  matchingProducts: data.documents,
  type: GET_MATCHING_PRODUCTS_COMPLETE
});

export const openQuestion = (question: any) => ({
  question,
  type: OPEN_QUESTION
});

export const closeQuestion = () => ({
  type: CLOSE_QUESTION
});

const showCommentLoader = () => ({
  type: SHOW_COMMENT_LOADER
});

const hideCommentLoader = () => ({
  type: HIDE_COMMENT_LOADER
});

const sendCommentComplete = (data: any) => ({
  type: SEND_COMMENT_COMPLETE,
  comment: data.comment
});

const sendReplyComplete = (data: any) => ({
  type: SEND_REPLY_COMPLETE,
  reply: data.reply
});

const fetchCommentsComplete = (data: any) => ({
  type: FETCH_COMMENTS_COMPLETE,
  comments: data.comments
});

export const expandAsk = () => ({
  type: EXPAND_ASK
});

export const contractAsk = () => ({
  type: CONTRACT_ASK
});

export const showLocationChooser = () => ({
  type: SHOW_LOCATION_CHOOSER
});

export const hideLocationChooser = () => ({
  type: HIDE_LOCATION_CHOOSER
});

export const addLocationToQuestion = (questionId: number, location: any) => ({
  questionId,
  location,
  type: ADD_LOCATION_TO_QUESTION
});

export const clearQuestionLocation = (questionId: number) => ({
  questionId,
  type: ClEAR_QUESTION_LOCATION
});

export const setQuestionsFilter = (filter: any) => ({
  type: SET_QUESTIONS_FILTER,
  questionsFilter: filter
});

const updateQuestion = (data: any) => ({
  type: UPDATE_QUESTION,
  question: data.question
});

const updateComment = (data: any) => ({
  type: UPDATE_COMMENT,
  comment: data.comment
});

const updateReply = (data: any) => ({
  type: UPDATE_REPLY,
  reply: data.reply
});

const receivedSocketComment = (data: any) => ({
  type: RECEIVED_SOCKET_COMMENT,
  comment: data.comment
});

export const clearReceivedCommentNotification = () => ({
  type: CLEAR_RECEIVED_COMMENT_NOTIFICATION
});

export const showProductChooser = () => ({
  type: SHOW_PRODUCT_CHOOSER
});

export const hideProductChooser = () => ({
  type: HIDE_PRODUCT_CHOOSER
});

export const selectProductToShare = (product: any) => ({
  type: SELECT_PRODUCT_TO_SHARE,
  product
});

export const clearProductToShare = () => ({
  type: CLEAR_PRODUCT_TO_SHARE
});

export const showCommentBox = () => ({
  type: SHOW_COMMENT_BOX
});

export const hideCommentBox = () => ({
  type: HIDE_COMMENT_BOX
});

export const setTabNavigation = (navigation: any) => ({
  type: SET_TAB_NAVIGATION,
  navigation
});

export const submitQuestion = () => {
  return (dispatch: any, getState: any) => {
    getAuthInfo()
      .then((info: any) => {
        const { token } = info;
        dispatch(showLoader());
        const { question, selectedCategory, photo } = getState().where;
        let attachedPhoto;

        if (photo) {
          attachedPhoto = {
            uri: photo.path,
            type: "image/jpeg",
            name: "attachedPhoto.jpg"
          };
        }

        // send file as formData / accompanied by according fields
        const formData = new FormData();
        formData.append("question", question);
        formData.append("selectedCategory", selectedCategory);
        formData.append("attachedPhoto", attachedPhoto as any);
        axios
          .post(GLOBAL_URL + "/question/create", formData, {
            headers: { Authorization: "JWT " + token }
          })
          .then((data: any) => {
            dispatch(submitQuestionComplete(data.data));
            dispatch(clearQuestion());
          })
          .catch(err => {
            alert(err);
            dispatch(hideLoader());
          });
      })
      .catch(() => {});
  };
};

export const getInitialQuestions = () => {
  return (dispatch: any) => {
    getAuthInfo()
      .then((info: any) => {
        const { token } = info;
        dispatch(showLoader());

        axios
          .get(GLOBAL_URL + "/question/getInitialQuestions", {
            headers: { Authorization: "JWT " + token }
          })
          .then((data: any) => {
            dispatch(getQuestionsComplete(data.data));
          })
          .catch(err => {
            alert(err);
            dispatch(hideLoader());
          });
      })
      .catch(err => {
        alert(err);
      });
  };
};

export const getMatchingProducts = (question: string) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      dispatch(showMatchingProductsLoader());

      axios
        .get(GLOBAL_URL + "/question/getMatchingProducts", {
          params: {
            question
          },
          headers: { Authorization: "JWT " + token }
        })
        .then((data: any) => {
          dispatch(getMatchingProductsComplete(data.data));
        })
        .catch(err => {
          dispatch(hideMatchingProductsLoader());
        });
    });
  };
};

export const sendComment = (
  questionId: number,
  comment: string,
  location: any,
  productToShare: any,
  cb: () => void
) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      dispatch(showCommentLoader());
      axios
        .post(
          GLOBAL_URL + "/questionComment/create",
          {
            questionId,
            comment,
            location,
            productToShare
          },
          {
            headers: { Authorization: "JWT " + token }
          }
        )
        .then((data: any) => {
          cb();
          dispatch(sendCommentComplete(data.data));
        })
        .catch(err => {
          alert(err);
          dispatch(hideCommentLoader());
        });
    });
  };
};

export const sendReply = (
  questionId: number,
  commentId: number,
  comment: string,
  location: any,
  reply: any,
  productToShare: any,
  cb: () => void
) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      dispatch(showCommentLoader());
      axios
        .post(
          GLOBAL_URL + "/questionComment/reply",
          {
            questionId,
            commentId,
            comment,
            location,
            reply,
            productToShare
          },
          {
            headers: { Authorization: "JWT " + token }
          }
        )
        .then((data: any) => {
          cb();
          dispatch(sendCommentComplete(data.data));
        })
        .catch(err => {
          alert(err);
          dispatch(hideCommentLoader());
        });
    });
  };
};

export const fetchComments = (questionId: number) => {
  return (dispatch: any) => {
    getAuthInfo()
      .then((info: any) => {
        const { token } = info;
        dispatch(showCommentLoader());
        axios
          .get(GLOBAL_URL + "/questionComment/comments", {
            params: {
              questionId
            },
            headers: { Authorization: "JWT " + token }
          })
          .then((data: any) => {
            dispatch(fetchCommentsComplete(data.data));
          })
          .catch(err => {
            alert(err);
            dispatch(hideCommentLoader());
          });
      })
      .catch(err => {});
  };
};

export const likeQuestion = (questionId: number) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      axios
        .put(
          GLOBAL_URL + "/question/like",
          {
            questionId
          },
          {
            headers: { Authorization: "JWT " + token }
          }
        )
        .then((data: any) => {
          dispatch(updateQuestion(data.data));
        })
        .catch(err => alert(err));
    });
  };
};

export const dislikeQuestion = (questionId: number) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      axios
        .put(
          GLOBAL_URL + "/question/dislike",
          {
            questionId
          },
          {
            headers: { Authorization: "JWT " + token }
          }
        )
        .then((data: any) => {
          dispatch(updateQuestion(data.data));
        })
        .catch(err => alert(err));
    });
  };
};

export const likeComment = (commentId: number) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      axios
        .put(
          GLOBAL_URL + "/questionComment/like",
          {
            commentId
          },
          {
            headers: { Authorization: "JWT " + token }
          }
        )
        .then((data: any) => {
          dispatch(updateComment(data.data));
        })
        .catch(err => alert(err));
    });
  };
};

export const dislikeComment = (commentId: number) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      axios
        .put(
          GLOBAL_URL + "/questionComment/dislike",
          {
            commentId
          },
          {
            headers: { Authorization: "JWT " + token }
          }
        )
        .then((data: any) => {
          dispatch(updateComment(data.data));
        })
        .catch(err => alert(err));
    });
  };
};

export const likeReply = (replyId: number) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      axios
        .put(
          GLOBAL_URL + "/questionComment/likeReply",
          {
            replyId
          },
          {
            headers: { Authorization: "JWT " + token }
          }
        )
        .then((data: any) => {
          dispatch(updateReply(data.data));
        })
        .catch(err => alert(err));
    });
  };
};

export const dislikeReply = (replyId: number) => {
  return (dispatch: any) => {
    getAuthInfo().then((info: any) => {
      const { token } = info;
      axios
        .put(
          GLOBAL_URL + "/questionComment/dislikeReply",
          {
            replyId
          },
          {
            headers: { Authorization: "JWT " + token }
          }
        )
        .then((data: any) => {
          dispatch(updateReply(data.data));
        })
        .catch(err => alert(err));
    });
  };
};

export const subscribeToQuestionCommentsUpdate = (questionId: number) => {
  return (dispatch: any, getState: any, socketConnection: any) => {
    socketConnection
      .getSocket()
      .on(`${SOCKET_COMMENT_UPDATE}/${questionId}`, (message: any) => {
        dispatch(receivedSocketComment(message));
        setTimeout(() => {
          dispatch(clearReceivedCommentNotification());
        }, DISMISS_NOTIF_TIMEOUT);
      });
  };
};

export const unsubscribeToQuestionCommentsUpdate = (questionId: number) => {
  return (dispatch: any, getState: any, socketConnection: any) => {
    socketConnection.getSocket().off(`${SOCKET_COMMENT_UPDATE}/${questionId}`);
  };
};
