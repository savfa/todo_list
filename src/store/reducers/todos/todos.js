import { ServerURL } from "../../../assets/services/consts/routes";
import {
  extendObject,
  ReplaceParameterInUrl,
} from "../../../assets/services/utils/common";
import { getTodos } from "./selectors";

const initialState = {
  todos: [],
};

const ActionType = {
  SET_TODOS: `SET_TODOS`,
};

const ActionCreator = {
  setTodos: (todos) => ({
    type: ActionType.SET_TODOS,
    payload: todos,
  }),
};

const Operation = {
  fetchTodos: () => (dispatch, getState, api) => {
    return api.get(ServerURL.TODOS).then((response) => {
      const { data: todos } = response.data;

      dispatch(ActionCreator.setTodos(todos));
    });
  },
  addTodo: (todoText) => (dispatch, getState, api) => {
    return api.post(ServerURL.TODOS, { label: todoText }).then((response) => {
      const { data: todo } = response.data;
      const currentTodos = getTodos(getState());

      dispatch(ActionCreator.setTodos([...currentTodos, todo]));

      return todo;
    });
  },
  updateTodo: (todoId, updateObj) => (dispatch, getState, api) => {
    return api
      .put(ReplaceParameterInUrl.id(ServerURL.TODO, todoId), updateObj)
      .then((response) => {
        const { data: todo } = response.data;

        const currentTodos = getTodos(getState());
        const oldTodoIndex = currentTodos.findIndex((it) => +it.id === +todoId);

        if (oldTodoIndex > -1) {
          const updatedTodos = [
            ...currentTodos.slice(0, oldTodoIndex),
            todo,
            ...currentTodos.slice(oldTodoIndex + 1),
          ];

          dispatch(ActionCreator.setTodos(updatedTodos));
        }

        return todo;
      });
  },
  sortTodos: (sortTodos) => (dispatch, getState, api) => {
    return api.put(ServerURL.SORT_TODOS, { sortTodos }).then((response) => {
      const { data: success } = response.data;

      return success;
    });
  },
  deleteTodo: (todoId) => (dispatch, getState, api) => {
    return api
      .delete(ReplaceParameterInUrl.id(ServerURL.TODO, todoId))
      .then((response) => {
        const { data: todo } = response.data;

        const currentTodos = getTodos(getState());
        const oldTodoIndex = currentTodos.findIndex((it) => +it.id === +todoId);

        if (oldTodoIndex > -1) {
          const updatedTodos = [
            ...currentTodos.slice(0, oldTodoIndex),
            ...currentTodos.slice(oldTodoIndex + 1),
          ];

          dispatch(ActionCreator.setTodos(updatedTodos));
        }

        return todo;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_TODOS:
      return extendObject(state, {
        todos: action.payload,
      });
    default:
      return state;
  }
};

export {
  reducer,
  ActionType,
  ActionCreator as TodosActionCreator,
  Operation as TodosOperation,
};
