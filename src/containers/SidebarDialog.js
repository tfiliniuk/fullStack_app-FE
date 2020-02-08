import React, {useState} from "react";
import { connect } from "react-redux";
import {socket} from "core";
import * as userAxios from "axios/user_axios";
import * as dialogsAxios from "axios/dialogs_axios";

import { SidebarDialog as BaseSidebar } from "components";
const SidebarDialog = (props) => {
  const {user} = props.auth;
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setVisible(false)
  }

  const onShow = () => {
    setVisible(true)
  }

  const onChangeTextArea = e => {
    setMessageText(e.target.value);
  };

  const handleChangeInput = value => {
    setInputValue(value)
  };

  const onSelectUser = userId => {
    setSelectedUserId(userId);
  };

  const onSearch = value => {
    setIsLoading(true);
    userAxios.findUsers(value)
    .then(({data}) => {
      setUsers(data);
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
    });
  };

  const onAddDialog = () => {
  dialogsAxios
    .create({
      partner: selectedUserId,
      text: messageText
    })
    .then(onClose)
    .catch(() => {
      setIsLoading(false);
    });
    socket.on('SERVER:DIALOG_CREATED', ({dialog}) => {
      // console.log(dialog)
    })
};
  return(
    <BaseSidebar
      user={user}
      visible={visible}
      onClose={onClose}
      onShow={onShow}
      onChangeTextArea={onChangeTextArea}
      messageText={messageText}
      inputValue={inputValue}
      onChangeInput={handleChangeInput}
      onSelectUser={onSelectUser}
      selectedUserId={selectedUserId}
      users={users}
      onSearch={onSearch}
      isLoading={isLoading}
      onModalOk={onAddDialog}
    />
  )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(SidebarDialog);
