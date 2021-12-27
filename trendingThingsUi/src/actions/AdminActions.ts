import { GLOBAL_URL } from "./../utils/Globals";
import { getAuthInfo } from "./UtilActions";
import { getAuthorization } from "./../utils/Utils";
import axios from "axios";

import { receivedDocument } from "./AppActions";

export const markEditorChoice = (documentId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);
  axios
    .patch(
      GLOBAL_URL + "/document/markEditorChoice",
      {
        documentId
      },
      {
        headers: authorization
      }
    )
    .then(data => dispatch(receivedDocument(data.data.document)))
    .catch(err => alert(err));
};

export const unmarkEditorChoice = (documentId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const authorization = getAuthorization(state);

  axios
    .patch(
      GLOBAL_URL + "/document/unmarkEditorChoice",
      {
        documentId
      },
      {
        headers: authorization
      }
    )
    .then(data => dispatch(receivedDocument(data.data.document)))
    .catch(err => alert(err));
};
