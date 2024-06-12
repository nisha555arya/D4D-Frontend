import {
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_RESET,
  COMMENT_CREATE_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_RESET,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_RESET,
  REPLY_CREATE_FAIL,
  REPLY_CREATE_REQUEST,
  REPLY_CREATE_RESET,
  REPLY_CREATE_SUCCESS,
} from "./../constants/commentConstants";

export const commentCreateReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return { loading: true, success: false };
    case COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case COMMENT_CREATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const commentListReducer = (state = { commentArr: [] }, action) => {
  switch (action.type) {
    case COMMENT_LIST_REQUEST:
      return { loading: true, commentArr: [] };
    case COMMENT_LIST_SUCCESS:
      return { loading: false, commentArr: action.payload };
    case COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentDeleteReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return { loading: true };
    case COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true, id: action.payload };
    case COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_DELETE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const commentUpdateReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_UPDATE_REQUEST:
      return { loading: true };
    case COMMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case COMMENT_UPDATE_RESET:
      return { loading: false, success: false, comment: {} };
    default:
      return state;
  }
};

export const replyCreateReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case REPLY_CREATE_REQUEST:
      return { loading: true, success: false };
    case REPLY_CREATE_SUCCESS:
      return { loading: false, success: true, reply: action.payload };
    case REPLY_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case REPLY_CREATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};
