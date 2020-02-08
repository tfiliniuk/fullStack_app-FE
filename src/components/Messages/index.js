import React from 'react';
import { Empty, Modal } from 'antd';
import classNames from 'classnames';

import { Message } from "../";

const Messages = ({
  user,
  items,
  partner,
  isLoading,
  onRemoveMessage,
  previewImage,
  setPreviewImage,
  blockHeight,
  blockRef
}) => {
  return (
    <div className="chat__dialog-messages" style={{ height: `calc(100% - ${blockHeight}px)` }}>
      <div ref={blockRef} className={classNames('messages', { 'messages--loading': isLoading })}>
      {items.length > 0 ? (
        items.map(item => (
          <Message
          {...item}
          key={item._id}
          onRemoveMessage={onRemoveMessage.bind(this, item._id)}
          isMe={user.id === item.user._id}
          setPreviewImage={setPreviewImage}
          />

        ))

      ) : (
        <Empty description="Диалог пуст" />
      )}
        <Modal visible={!!previewImage} onCancel={() => setPreviewImage(null)} footer={null}>
          <img src={previewImage} style={{ width: '100%' }} alt="Preview" />
        </Modal>
      </div>
    </div>
  )
}

export default Messages;
