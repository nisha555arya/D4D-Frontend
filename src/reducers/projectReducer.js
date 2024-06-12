import {
  LIKED_PROJECT_FAIL,
  LIKED_PROJECT_REQUEST,
  LIKED_PROJECT_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_RESET,
  PROJECT_ADD_SUCCESS,
  SEARCH_PROJECT_FAIL,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_RESET,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_RESET,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_RESET,
  VIEWED_PROJECT_FAIL,
  VIEWED_PROJECT_REQUEST,
  VIEWED_PROJECT_SUCCESS,
} from "./../constants/projectConstants";

export const projectCreateReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case PROJECT_ADD_REQUEST:
      return { loading: true, success: false };
    case PROJECT_ADD_SUCCESS:
      return { loading: false, success: true, projectInfo: action.payload };
    case PROJECT_ADD_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PROJECT_ADD_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true, projects: [] };
    case PROJECT_LIST_SUCCESS:
      return { loading: false, projects: action.payload };
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const likedProjectReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case LIKED_PROJECT_REQUEST:
      return { loading: true, success: false };
    case LIKED_PROJECT_SUCCESS:
      return { loading: false, success: true, projects: action.payload };
    case LIKED_PROJECT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const projectDetailsReducer = (
  state = { loading: false, projectInfo: { comments: [] } },
  action
) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PROJECT_DETAILS_SUCCESS:
      return { loading: false, projectInfo: action.payload, success: true };
    case PROJECT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_DETAILS_RESET:
      return { loading: false, projectInfo: { comments: [] } };
    default:
      return state;
  }
};

export const projectDeleteReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true };
    case PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true, id: action.payload };
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_DELETE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const projectUpdateReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true, success: false };
    case PROJECT_UPDATE_SUCCESS:
      return { loading: false, success: true, project: action.payload };
    case PROJECT_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PROJECT_UPDATE_RESET:
      return { loading: false, success: false, project: {} };
    default:
      return state;
  }
};

export const viewedProjectReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case VIEWED_PROJECT_REQUEST:
      return { loading: true, success: false };
    case VIEWED_PROJECT_SUCCESS:
      return { loading: false, success: true, projects: action.payload };
    case VIEWED_PROJECT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const searchProjectReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case SEARCH_PROJECT_REQUEST:
      return { loading: true, success: false };
    case SEARCH_PROJECT_SUCCESS:
      return { loading: false, success: true, projects: action.payload };
    case SEARCH_PROJECT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
