import {createStore,combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from 'redux-form';
import thunk from "redux-thunk";
import mainReducer from "./mainReducer";
import loginReducer from "./loginReducer";
import registrationReducer from "./registrationReducer";

let reducers = combineReducers({
    mainPage: mainReducer,
    loginPage: loginReducer,
    registrationPage: registrationReducer,
    form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
