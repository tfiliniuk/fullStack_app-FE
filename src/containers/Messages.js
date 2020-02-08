import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';
import find from 'lodash/find';

import Actions from "actions/messages";
import socket from 'core/socket';

import {Messages as BaseMessages } from "components";

const Messages = ({
  currentDialog,
  fetchMessages,
  addMessage,
  items,
  user,
  isLoading,
  removeMessageById,
  attachments
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [blockHeight, setBlockHeight] = useState(135);

  const messagesRef = useRef(null);

  const onNewMessage = data => {
    addMessage(data);
  };

  useEffect(() => {
    if(attachments.length) {
      setBlockHeight(245);
    } else {
      setBlockHeight(135);
    }
  }, [attachments]);

  useEffect(() => {
    if (currentDialog) {
        fetchMessages(currentDialog._id);
    }
    socket.on('SERVER:NEW_MESSAGE', onNewMessage);

    return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
  }, [currentDialog]);

  useEffect(() => {
    // messagesRef.current.scrollTo(0, 999999);
    // window.scrollTo(0, messagesRef.current.offsetHeight);
    if(messagesRef.current !== null) {
      messagesRef.current.scrollTo(0, 999999);
    }
  }, [items]);

  if(!currentDialog) {
    return <Empty description="Откройте диалог" />
  }
  return (
    <BaseMessages
      user={user}
      items={items}
      isLoading={isLoading && !user}
      onRemoveMessage={removeMessageById}
      setPreviewImage={setPreviewImage}
      previewImage={previewImage}
      blockHeight={blockHeight}
      blockRef={messagesRef}
      partner={
        user._id !== currentDialog.partner._id ? currentDialog.author : currentDialog.partner
      }
    />
  )
};

export default connect(
  ({ dialogs, messages, auth, attachments }) => ({
    currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
    items: messages.items,
    isLoading: messages.isLoading,
    user: auth.user,
    attachments: attachments.items

  }),
  Actions,
)(Messages);
