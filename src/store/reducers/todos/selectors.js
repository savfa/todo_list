import NameSpace from "../NameSpace";

const NAME_SPACE = NameSpace.TODOS;

export const getTodos = (state) => {
  return state[NAME_SPACE].todos;
};

export const a = null;
