import { combineReducers } from "redux";

import NameSpace from "./NameSpace";
import { reducer as user } from "./user/user";

export default combineReducers({
  [NameSpace.USER]: user,
});
