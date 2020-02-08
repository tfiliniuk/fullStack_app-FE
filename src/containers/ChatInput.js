import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';
import { socket } from "core";

import * as filesApi from "axios/files_axios";
import { ChatInput as ChatInputBase } from "components";

import Actions from "actions/messages";
import attachmentsActions from "actions/attachments";


const ChatInput = ({
  user,
  dialogs,
  fetchSendMessage,
  setAttachments,
  attachments,
  removeAttachment
}) => {
  const [value, setValue] = useState('');
  if(!dialogs.currentDialogId) {
    return null;
  }
  const sendMessage = () => {
    if(value || attachments.length) {
      fetchSendMessage({
        text: value,
        dialogId: dialogs.currentDialogId,
        attachments: attachments.map(file => file.uid)
      });
      setValue('');
      setAttachments([]);
    }
  };

  const handleSendMessage = e => {
    socket.emit('DIALOGS:TYPING', { dialogId: dialogs.currentDialogId, user });
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  const onSelectFiles = async files => {
    let uploaded = [];
    for(let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: "uploading"
        }
      ];

      setAttachments(uploaded);
      await filesApi.upload(file).then(({data}) => {
        uploaded = uploaded.map(item => {
          if(item.uid === uid) {
            return {
              status: "done",
              uid: data.file._id,
              name: data.file.filename,
              url: data.file.url
            };
          }
          return item;
        });
      });
    }
    setAttachments(uploaded);
  }

  return (
    <ChatInputBase
      value={value}
      setValue={setValue}
      handleSendMessage={handleSendMessage}
      sendMessage={sendMessage}
      onSelectFiles={onSelectFiles}
      attachments={attachments}
      removeAttachment={removeAttachment}

    />
  )
}

export default connect(
  ({ dialogs, auth, attachments }) => ({
    dialogs,
    user: auth.user,
    attachments: attachments.items
  }),
  {...Actions, ...attachmentsActions}
)(ChatInput);
