import { createSelector } from "reselect";
import { find, values, sortBy } from "lodash";

const getStateChats = (state: any) => state.applicationData.chats;
const getStateMessages = (state: any) => state.applicationData.messages;

export const getChat = createSelector(
  getStateChats,
  (state: any, userId: number) => userId,
  (state: any, userId: number, receiverId: number) => receiverId,
  (chats: any, userId: any, receiverId: any) => {
    return find(
      chats,
      chat =>
        (chat.participant1 === userId && chat.participant2 === receiverId) ||
        (chat.participant1 === receiverId && chat.participant2 === userId)
    );
  }
);

export const getMessagesByChatId = createSelector(
  getStateMessages,
  getChat,
  (messages: any, chat: any) => {
    if (!chat || !messages) {
      return null;
    }

    return messages[chat.id]
      ? sortBy(messages[chat.id], message => message.createdAt).reverse()
      : null;
  }
);
