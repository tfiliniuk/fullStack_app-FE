import { connect } from 'react-redux'
import { TodoContainer } from "./";
import { VisibilityFilters, editTodo, deleteTodo } from "actions";


const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_IMPORTANT:
      return todos.filter(t => t.important);
    default:
      throw new Error("Unknow filter " + filter);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  onEdit: (id, completed) => dispatch(editTodo(id, completed)),
  onDelete: id => dispatch((deleteTodo(id)))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContainer)
