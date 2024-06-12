import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateReducer,
  searchProfileReducer,
} from "./reducers/userReducers";
import {
  projectDetailsReducer,
  projectListReducer,
  projectCreateReducer,
  projectUpdateReducer,
  projectDeleteReducer,
  likedProjectReducer,
  viewedProjectReducer,
  searchProjectReducer,
} from "./reducers/projectReducer";
import {
  commentListReducer,
  commentCreateReducer,
  commentDeleteReducer,
  commentUpdateReducer,
  replyCreateReducer,
} from "./reducers/CommentReducers";
import {
  collectionCreateReducer,
  collectionDeleteReducer,
  collectionDetailsReducer,
  collectionListReducer,
  collectionUpdateReducer,
  saveProjectReducer,
  saveUserReducer,
} from "./reducers/CollectionReducer";
import {
  conversationListReducer,
  messageListReducer,
  messageCreateReducer,
  conversationCreateReducer,
} from "./reducers/chatReducer";

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  projectDetails: projectDetailsReducer,
  projectList: projectListReducer,
  projectCreate: projectCreateReducer,
  projectUpdate: projectUpdateReducer,
  projectDelete: projectDeleteReducer,
  commentCreate: commentCreateReducer,
  commentList: commentListReducer,
  commentDelete: commentDeleteReducer,
  commentUpdate: commentUpdateReducer,
  likedProjects: likedProjectReducer,
  viewedProjects: viewedProjectReducer,
  searchProjects: searchProjectReducer,
  searchProfiles: searchProfileReducer,
  replyCreate: replyCreateReducer,
  collectionCreate: collectionCreateReducer,
  collectionUpdate: collectionUpdateReducer,
  collectionDelete: collectionDeleteReducer,
  collectionList: collectionListReducer,
  collectionDetails: collectionDetailsReducer,
  saveProject: saveProjectReducer,
  saveUser: saveUserReducer,
  conversationList: conversationListReducer,
  messageList: messageListReducer,
  messageCreate: messageCreateReducer,
  conversationCreate: conversationCreateReducer,
});

const userInfoFromStorage =
  JSON.parse(localStorage.getItem("userInfo")) || null;

const userFromStorage = JSON.parse(localStorage.getItem("userDetails")) || null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userDetails: { user: userFromStorage },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
