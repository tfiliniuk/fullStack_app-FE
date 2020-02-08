import React, {useState } from "react";

import classnames from "classnames";

import { Button, Checkbox, Icon, Menu, Dropdown, DatePicker, Input } from "antd";

import { getMessageTime } from "utils";

const Todoitem = (
  {todo:
    {task, completed, _id, important, date, category},
    onEdit,
    onDelete
  }
) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setUpdate] = useState(task);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Icon type="edit" /> <Button onClick={toggleEdit}size="large" type="primary">Edit</Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Icon type="delete" /> <Button onClick={() =>onDelete(_id)} size="large" type="danger">Delete</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <li>
    <div className="todo__item">
      <div className="todo__item-block">
        <div className="todo__item-toggle">
          <Checkbox defaultChecked = {completed ? true : false} onChange={() => onEdit(_id, {completed: !completed})}></Checkbox>
        </div>
        <div className="todo__item-content">
          {isEdit ? (
            <div>
            <Input
              onChange={e => setUpdate(e.target.value)}
               value={isUpdate}
               type="text"
               />
            <Button
              onClick={() =>{
                onEdit(_id, {task: isUpdate})
                toggleEdit();
              }}
               size="large" type="danger">Update</Button>
             </div>
            ) : (
            <Dropdown overlayClassName="todo__item-content-dropdown" overlay={menu} trigger={['click']}>
               <Button className="ant-dropdown-link">
                 {isUpdate}<Icon type="down" />
               </Button>
            </Dropdown>
          )}

          <div className="todo__item-options">
            <span className="todo__item-categoty">
              {category}
              <Icon type="profile" />
            </span>
            <div className="todo__item-date">
              {getMessageTime(date)}
              <DatePicker
                onChange={(newDate) => {
                  date = newDate._d;
                  onEdit(_id, {date: newDate._d})
                }}
              />
            </div>
            <div className="todo__item-important ">
              <Button
                className={classnames("", {"important" : important})}
                type="primary"
                shape="circle"
                icon="star"
                onClick={() => {
                  onEdit(_id, {important: !important});
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
  )
}

export default Todoitem;
