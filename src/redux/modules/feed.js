const SETPOSTS = "posts/SET";
const ADD_POST = "ADD_POST";
const TOGGLE_LIKE = "main/TOGGLE_LIKE";
const TOGGLE_BOOKMARK = "main/TOGGLE_BOOKMARK";

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

export const toggleLike = (postId) => {
  return {
    type: TOGGLE_LIKE,
    payload: postId,
  };
};

export const toggleBookmark = (postId) => {
  return {
    type: TOGGLE_BOOKMARK,
    payload: postId,
  };
};

const initialState = [];

const feed = (state = initialState, action) => {
  switch (action.type) {
    case SETPOSTS:
      return action.payload;
    case ADD_POST:
      return [...state, action.payload]; // 새로운 포스트 추가
    // case TOGGLE_LIKE:
    //   return {
    //   if (likesByUser && likesByUser[uid]) {
    //     // 이미 해당 사용자가 좋아요를 누른 경우, 좋아요 취소 처리
    //     delete likesByUser[uid];
    //     await updateDoc(postRef, {
    //       likesByUser: { ...likesByUser },
    //       likeCount: likeCount - 1,
    //     });
    //   } else {
    //     // 해당 사용자가 좋아요를 누르지 않은 경우, 좋아요 처리
    //     await updateDoc(postRef, {
    //       likesByUser: {
    //         ...likesByUser,
    //         [uid]: true,
    //       },
    //       likeCount: likeCount + 1,
    //     });
    //   }}
    // case TOGGLE_BOOKMARK:
    //   return state.map((post) => {
    //     if (post.id === action.payload) {
    //       return { ...post.BookedbyUsers, uid: !uid };
    //     }
    //     return post;
    //   })

    default:
      return state;
  }
};

export default feed;
