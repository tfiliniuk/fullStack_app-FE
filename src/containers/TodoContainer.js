import React, {useEffect} from "react";
import { fetchTodos } from "actions";
import { Todoitem } from "../components";

const TodoContainer = ({todos, onEdit, onDelete}) => {
  useEffect(() => {
    if(!todos.length) {
      fetchTodos()
    }
  }, [todos]);

  return (
    <div className="container__list">
      <ul>
        {todos.map(todo => (
          <Todoitem
            key={todo._id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}



export default TodoContainer;
