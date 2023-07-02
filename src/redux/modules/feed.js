const SETPOSTS = "posts/SET";
const ADD_POST = "ADD_POST";
const UPDATE_CONTENTS = "UPDATE_CONTENTS";

export const setPosts = (posts) => {
  return {
    type: SETPOSTS,
    payload: posts,
  };
};

export const addPost = (newPost) => {
  return {
    type: ADD_POST,
    payload: newPost,
  };
};

const initialState = [];

const feed = (state = initialState, action) => {
  switch (action.type) {
    case SETPOSTS:
      return action.payload;
    case ADD_POST:
      return [...state, action.payload]; // 새로운 포스트 추가

    default:
      return state;
  }
};

export default feed;
