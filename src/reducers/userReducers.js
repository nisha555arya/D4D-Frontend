import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_UPDATE_FAIL,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_RESET,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  SEARCH_PROFILE_REQUEST,
  SEARCH_PROFILE_SUCCESS,
  SEARCH_PROFILE_FAIL,
  SEARCH_PROFILE_RESET,
} from "./../constants/userConstants";
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { loading: true, success: false, user: null },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, success: false, user: null };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { loading: true, success: false, user: null };
    default:
      return state;
  }
};

export const userUpdateReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_UPDATE_REQUEST:
      return { loading: true, success: false };
    case USER_DETAILS_UPDATE_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_DETAILS_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_DETAILS_UPDATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, profileInfo: action.payload };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const searchProfileReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case SEARCH_PROFILE_REQUEST:
      return { loading: true };
    case SEARCH_PROFILE_SUCCESS:
      return { loading: false, profiles: action.payload };
    case SEARCH_PROFILE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case SEARCH_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
