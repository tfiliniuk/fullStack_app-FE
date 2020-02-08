import React from "react";
import { Sidebar, VisibleTodoList } from "containers";
import { AddTodo} from "components";

import "./Todo.scss";

const Todo = () => {
  return (
  <section className="todo">
    <div className="todo__wrapper">
      <div className="todo__sidebar">
        <Sidebar />
      </div>
      <div className="todo__content">
        <div className="todo__header">

        </div>
        <div className="todo__container">
          <VisibleTodoList />
          <AddTodo />
        </div>
      </div>
    </div>
  </section>
  )
};

export default Todo;
