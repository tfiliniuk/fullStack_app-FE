import React, {useState} from "react";

import { Modal, Button } from 'antd';

import { Todoinput } from "../";

const AddTodo = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="todo__add">
      <Button type="primary" onClick={showModal}>
        Add Task
      </Button>
      <Modal
        title="Add Task"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Todoinput />
      </Modal>
    </div>
  );
};

export default AddTodo;
