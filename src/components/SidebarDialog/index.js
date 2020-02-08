import React from 'react';
import { Icon, Button, Modal, Select, Input, Form } from 'antd';
import { Dialogs } from "containers";
import "./SidebarDialog.scss";

const { TextArea } = Input;
const { Option } = Select;

const SidebarDialog = ({
  user,
  visible,
  onClose,
  onShow,
  onChangeTextArea,
  messageText,
  onChangeInput,
  inputValue,
  selectedUserId,
  onSelectUser,
  users,
  onSearch,
  isLoading,
  onModalOk

}) => {
  const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);
  return(
    <div className="chat__sidebar">
      <div className="chat__sidebar-header">
        <div>
          <Icon type="team" />
          <span>Список диалогов</span>
        </div>
        <Button onClick={onShow} type="link" shape="circle" icon="form" />
      </div>

      <div className="chat__sidebar-dialogs">
        <Dialogs userId={user && user.id} />
      </div>

      <Modal
          title="Создать диалог"
          visible={visible}
          footer={[
          <Button key="back" onClick={onClose}>
            Закрыть
          </Button>,
          <Button
            disabled={!messageText}
            key="submit"
            loading={isLoading}
            type="primary"
            onClick={onModalOk}
          >
            Создать
          </Button>,
        ]}
        >
          <Form className="add-dialog-form">
            <Form.Item label="Введите имя пользователя или E-Mail">
            <Select defaultValue="lucy"
              value={inputValue}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              style={{ width: '100%' }}
              placeholder="Введите имя пользователя или почту"
              showArrow={false}
              filterOption={false}
              onSearch={onSearch}
              defaultActiveFirstOption={false}
              showSearch
              >
              {options}
            </Select>
            </Form.Item>
            <Form.Item label="Введите текст сообщения">
              <TextArea
                autoSize={{ minRows: 3, maxRows: 10 }}
                onChange={onChangeTextArea}
                value={messageText}
              />
            </Form.Item>
          </Form>
        </Modal>

    </div>
  )
}

export default SidebarDialog;
