import * as messagesAxios from "axios/messages_axios";
// import { socket } from "core";

const Actions = {
  setMessages: items => ({
    type: "MESSAGES:SET_ITEMS",
    payload: items
  }),
  addMessage: message => (dispatch, getState) => {
    const { dialogs } = getState();
    const { currentDialogId } = dialogs;

    if (currentDialogId === message.dialog._id) {
      dispatch({
        type: "MESSAGES:ADD_MESSAGE",
        payload: message
      });
    }
  },

  fetchSendMessage: ({ text, dialogId, attachments }) => dispatch => {
    return messagesAxios.send(text, dialogId, attachments);
  },
  setIsLoading: bool => ({
    type: "MESSAGES:SET_IS_LOADING",
    payload: bool
  }),
  removeMessageById: id => dispatch => {
    if (window.confirm("Вы действительно хотите удалить сообщение?")) {
      messagesAxios
        .removeById(id)
        .then(({ data }) => {
          dispatch({
            type: "MESSAGES:REMOVE_MESSAGE",
            payload: id
          });
        })
        .catch(() => {
          dispatch(Actions.setIsLoading(false));
        });
    }
  },
  fetchMessages: dialogId => dispatch => {
    dispatch(Actions.setIsLoading(true));
    messagesAxios
      .getAllByDialogId(dialogId)
      .then(({ data }) => {
        dispatch(Actions.setMessages(data));
      })
      .catch(() => {
        dispatch(Actions.setIsLoading(false));
      });
  }
}

export default Actions;
