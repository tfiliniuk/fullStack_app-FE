import React, {useEffect} from 'react';
import classNames from 'classnames';
// import format from 'date-fns/format';
// import isToday from 'date-fns/is_today';
import { Link } from 'react-router-dom';

// const getMessageTime = createdAt => {
//   if (isToday(createdAt)) {
//     return format(createdAt, 'HH:mm');
//   } else {
//     return format(createdAt, 'DD.MM.YYYY');
//   }
// };

const renderLastMessage = (message, userId) => {
  let text = '';
  if (!message.text && message.attachments.length) {
    text = 'прикрепленный файл';
  } else {
    text = message.text;
  }

  return `${message.user._id === userId ? 'Вы: ' : ''}${text}`;
};

const DialogItem = ({
  _id,
  readed,
  created_at,
  text,
  isMe,
  currentDialogId,
  partner,
  lastMessage,
  userId,
  author
}) => {
  // console.log(lastMessage)
  return (
    <div className="dialogs__list">
      <Link to={`/chat/${_id}`}>
        <div className={classNames("dialogs__item", {
          "dialogs__item--online": partner.isOnline,
          "dialogs__item--selected": currentDialogId === _id,
          "dialogs__item--unreaded": lastMessage.readed === false
        })}>
          <div className="dialogs__item-avatar">

          </div>
          <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
              { isMe ? (
                <b> {partner.fullname} </b>
                ) : (
                <b> {author.fullname} </b>
                )
              }
            </div>
            <div className="dialogs__item-info-bottom">
              <p>{lastMessage && renderLastMessage(lastMessage, userId)}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DialogItem;
