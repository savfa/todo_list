import {authAPI, todoAPI} from "../api/api";

const SET_TODO = 'SET_TODO';
const SEARCH_CHANGE = 'SEARCH_CHANGE';
const FILTER_STATUS = 'FILTER_STATUS';
const TOGGLE_DONE = 'TOGGLE_DONE';
const TOGGLE_IMPORTANT = 'TOGGLE_IMPORTANT';
const ON_DELETED = 'ON_DELETED';
const ADDED_MODE = 'ADDED_MODE';
const RENAME_MODE = 'RENAME_MODE';
const ADD_ITEM ='ADD_ITEM';
const GET_USER ='GET_USER';
const IS_FETCHING ='IS_FETCHING';

export const todoDefault = [
    {label: 'Прочитайте 3 новых книги', important: 0, done: 0, id_todo: 1},
    {label: 'Научитесь делать бумажные самолётики', important: 0, done: 0, id_todo: 2},
    {label: 'Займитесь своим хобби', important: 0, done: 0, id_todo: 3},
    {label: 'Устройте пикник', important: 0, done: 0, id_todo: 4},
    {label: 'Покатайтесь на колесе обозрения', important: 0, done: 0, id_todo: 5}
];

let initialState = {
    todo: todoDefault,
    isAuth: false,
    user_id: null,
    user: 'guest',
    email: '',
    isFetching: false,
    addedMode: false,
    phrase: '',
    filterStatus: 'all',
    done: false,
    important: false
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO: {
            return {...state, todo: action.todo}
        }
        case SEARCH_CHANGE: {
            return {...state, phrase: action.phrase.target.value}
        }
        case FILTER_STATUS: {
            return {...state, filterStatus: action.filter}
        }
        case TOGGLE_DONE: {
            return {...state, todo: [...state.todo.map(elem => {
                if (elem.id_todo === action.id) {
                    elem.done = +(!action.done);
                    return elem
                }
                return elem
                })]
            }
        }
        case TOGGLE_IMPORTANT: {
            return {...state, todo: [...state.todo.map(elem => {
                    if (elem.id_todo === action.id) {
                        elem.important = +(!action.important);
                        return elem
                    }
                    return elem
                })]
            }
        }
        case ADD_ITEM: {
            return {...state, todo: [...state.todo, {label: action.data.newItem, important: 0, done: 0, id_todo: Date.now()}]
            }
        }
        case ON_DELETED: {
            return {...state, todo: [...state.todo.filter(elem => elem.id_todo !== action.id)]
            }
        }
        case ADDED_MODE: {
            return {...state, addedMode: !action.addedMode}
        }
        case RENAME_MODE: {
            return {...state, todo: [...state.todo.map(elem => {
                    if (elem.id_todo === action.id) {
                        elem.label = action.data.renameItem;
                        return elem
                    }
                    return elem
                })]
            }
        }
        case GET_USER: {
            return {...state, user_id: action.user_id, user: action.user, email: action.email, isAuth: action.isAuth}
        }
        case IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
};

export const onSearchActionCreator = (phrase) => ({type: SEARCH_CHANGE, phrase});
export const onFilterStatusActionCreator = (filter) => ({type: FILTER_STATUS, filter});
export const onToggleDoneActionCreator = (id, done) => ({type: TOGGLE_DONE, id, done});
export const onToggleImportantActionCreator = (id, important) => ({type: TOGGLE_IMPORTANT, id, important});
export const onDeletedActionCreator = (id) => ({type: ON_DELETED, id});
export const onAddedModeActionCreator = (addedMode) => ({type: ADDED_MODE, addedMode});
export const onRenameModeActionCreator = (id, data) => ({type: RENAME_MODE, id, data});
export const onAddActionCreator = (data) => ({type: ADD_ITEM, data});
export const getUserActionCreator = (user_id, user, email, isAuth) => ({type: GET_USER, user_id, user, email, isAuth});
export const setTodoActionCreator = (todo) => ({type: SET_TODO, todo});
export const isFetchingActionCreator = (isFetching) => ({type: IS_FETCHING, isFetching});

export const onToggleParamThunk = (id, data, user_id, param) => (dispatch) => {
    (typeof data === 'string') ? data = data : data = +(!data);
    todoAPI.updateItem(id, data , user_id, param).then(res => {
        if (res.status === 200) {
            authAPI.userIDTodoData(user_id).then(res => {
                if (res.status === 200) {
                    dispatch(setTodoActionCreator(res.data));
                } else {
                    alert('ошибка получения списка дел')
                }
            });
        }
    })
};

export const onAddThunk = (user_id, data) => (dispatch) => {
    todoAPI.addItem(user_id, data).then(res => {
        if (res.status === 200) {
            authAPI.userIDTodoData(user_id).then(res => {
                if (res.status === 200) {
                    dispatch(setTodoActionCreator(res.data));
                } else {
                    alert('ошибка получения списка дел')
                }
            });
        }
    })
};

export const onDeletedThunk = (id_todo, user_id) => (dispatch) => {
    todoAPI.deleteItem(id_todo).then(res => {
        if (res.status === 200) {
            authAPI.userIDTodoData(user_id).then(res => {
                if (res.status === 200) {
                    dispatch(setTodoActionCreator(res.data));
                } else {
                    alert('ошибка получения списка дел')
                }
            });
        }
    })
};

export default mainReducer;