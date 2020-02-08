import React from 'react';
import { Popover, Button, Icon } from 'antd';
import classNames from 'classnames';

import { Avatar } from '../';

import "./Message.scss";

const Message = ({
  user,
  onRemoveMessage,
  text,
  attachments,
  setPreviewImage,
  isMe
}) => {
  const renderAttachment = item => {
    return (
      <div
        key={item._id}
        onClick={() => setPreviewImage(item.url)}
        className="message__attachments-item">
        <div className="message__attachments-item-overlay">
          <Icon type="eye" style={{ color: 'white', fontSize: 18 }} />
        </div>

        <img src={item.url} alt={item.filename} />
      </div>
    )
  }
  return (
    <div className={classNames("message", {
        "message--isme": isMe,
        "message--image": attachments && attachments.length == 1 && !text
      })}>
      <div className="message__content">
        <Popover
          content={
            <div>
              <Button onClick={onRemoveMessage}>Удалить сообщение</Button>
            </div>
          }
          trigger="click">
          <div className="message__icon-actions">
            <Button type="link" shape="circle" icon="ellipsis" />
          </div>
        </Popover>
        <div className="message__avatar">
          <Avatar user={user} />
        </div>
        <div className="message__info">
          {text && (
            <p className="message__text">{text}</p>
          )}
          {attachments && (
            <div className="message__attachments">
              {attachments.map(item => renderAttachment(item))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Message;
