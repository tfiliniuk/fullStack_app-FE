import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { SidebarDialog, Messages, ChatInput } from "containers";
import "./Chat.scss";

import Actions from "actions/dialogs";

const Chat = (props) => {
  const { setCurrentDialogId, user } = props;
  useEffect(() => {
    const { pathname } = props.location;
    const dialogId = pathname.split('/').pop();
    setCurrentDialogId(dialogId);
  }, [props.location.pathname]);

  return (
    <section className="chat">
      <SidebarDialog />
      {user && (
        <div className="chat__dialog">
          <Messages />
          <div className="chat__dialog-input">
            <ChatInput />
          </div>
        </div>
      )}
    </section>
  )
}


export default withRouter(
  connect(
    ({ auth }) => ({ user: auth.user }),
    Actions,
  )(Chat),
);
