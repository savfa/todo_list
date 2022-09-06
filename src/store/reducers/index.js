import { combineReducers } from "redux";

import NameSpace from "./NameSpace";
import { reducer as user } from "./user/user";
import { reducer as todos } from "./todos/todos";

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.TODOS]: todos,
});
