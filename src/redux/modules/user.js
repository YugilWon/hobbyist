const SETUSERS = "users/SET";

export const setUsers = (users) => {
  return {
    type: SETUSERS,
    payload: users,
  };
};

const initialState = [];

const user = (state = initialState, action) => {
  switch (action.type) {
    case SETUSERS:
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default user;
