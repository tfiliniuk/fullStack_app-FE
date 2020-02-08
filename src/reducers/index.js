import { combineReducers } from "redux";
import todos from "./todos";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import visibilityFilter  from "./visibilityFilter";
import users from "./usersReducer";
import dialogs from "./dialogs";
import messages from "./messages";
import attachments from "./attachments";

export default combineReducers({
  todos,
  auth: authReducers,
  errors: errorReducers,
  visibilityFilter,
  users,
  dialogs,
  messages,
  attachments
})
