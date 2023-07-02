//중앙 데이터 관리소(store)를 설정하는 부분
import { createStore, combineReducers } from "redux";
import feed from "../modules/feed";
import comments from "../modules/comments";
import user from "../modules/user";

const rootReducer = combineReducers({
  feed,
  comments,
  user,
});
const store = createStore(rootReducer);

export default store;
