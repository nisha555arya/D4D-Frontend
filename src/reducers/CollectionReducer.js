import {
  COLLECTION_CREATE_FAIL,
  COLLECTION_CREATE_REQUEST,
  COLLECTION_CREATE_RESET,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_LIST_FAIL,
  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_SUCCESS,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_UPDATE_RESET,
  COLLECTION_DELETE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_RESET,
  COLLECTION_DETAILS_FAIL,
  COLLECTION_DETAILS_REQUEST,
  COLLECTION_DETAILS_SUCCESS,
  COLLECTION_DETAILS_RESET,
  SAVE_PROJECT_FAIL,
  SAVE_PROJECT_REQUEST,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_RESET,
  SAVE_USER_FAIL,
  SAVE_USER_REQUEST,
  SAVE_USER_SUCCESS,
  SAVE_USER_RESET,
} from "./../constants/collectionConstants";

export const collectionCreateReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case COLLECTION_CREATE_REQUEST:
      return { loading: true, success: false };
    case COLLECTION_CREATE_SUCCESS:
      return { loading: false, success: true, collection: action.payload };
    case COLLECTION_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case COLLECTION_CREATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const collectionListReducer = (
  state = { loading: false, collections: [] },
  action
) => {
  switch (action.type) {
    case COLLECTION_LIST_REQUEST:
      return { loading: true, collections: [] };
    case COLLECTION_LIST_SUCCESS:
      return { loading: false, collections: action.payload };
    case COLLECTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const collectionDeleteReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case COLLECTION_DELETE_REQUEST:
      return { loading: true, success: false };
    case COLLECTION_DELETE_SUCCESS:
      return { loading: false, success: true, id: action.payload };
    case COLLECTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COLLECTION_DELETE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const collectionUpdateReducer = (
  state = { collection: {}, loading: false, success: false },
  action
) => {
  switch (action.type) {
    case COLLECTION_UPDATE_REQUEST:
      return { loading: true, collection: {}, success: false };
    case COLLECTION_UPDATE_SUCCESS:
      return { loading: false, success: true, collection: action.payload };
    case COLLECTION_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case COLLECTION_UPDATE_RESET:
      return { loading: false, success: false, collection: {} };
    default:
      return state;
  }
};

export const collectionDetailsReducer = (
  state = { loading: false, collection: {} },
  action
) => {
  switch (action.type) {
    case COLLECTION_DETAILS_REQUEST:
      return { loading: true, collection: {} };
    case COLLECTION_DETAILS_SUCCESS:
      return { loading: false, collection: action.payload };
    case COLLECTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case COLLECTION_DETAILS_RESET:
      return { loading: false, collection: {} };
    default:
      return state;
  }
};

export const saveProjectReducer = (
  state = { loading: false, success: false, collection: {} },
  action
) => {
  switch (action.type) {
    case SAVE_PROJECT_REQUEST:
      return { loading: true, collection: {} };
    case SAVE_PROJECT_SUCCESS:
      return { loading: false, success: true, collection: action.payload };
    case SAVE_PROJECT_FAIL:
      return { loading: false, succes: false, error: action.payload };
    case SAVE_PROJECT_RESET:
      return { loading: false, success: false, collection: {} };
    default:
      return state;
  }
};

export const saveUserReducer = (
  state = { loading: false, success: false, collection: {} },
  action
) => {
  switch (action.type) {
    case SAVE_USER_REQUEST:
      return { loading: true, collection: {} };
    case SAVE_USER_SUCCESS:
      return { loading: false, success: true, collection: action.payload };
    case SAVE_USER_FAIL:
      return { loading: false, succes: false, error: action.payload };
    case SAVE_USER_RESET:
      return { loading: false, success: false, collection: {} };
    default:
      return state;
  }
};
