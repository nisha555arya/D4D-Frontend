import {
  COLLECTION_CREATE_FAIL,
  COLLECTION_CREATE_REQUEST,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_LIST_FAIL,
  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_SUCCESS,
  COLLECTION_DELETE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_DETAILS_FAIL,
  COLLECTION_DETAILS_REQUEST,
  COLLECTION_DETAILS_SUCCESS,
  SAVE_PROJECT_FAIL,
  SAVE_PROJECT_REQUEST,
  SAVE_PROJECT_SUCCESS,
  SAVE_USER_FAIL,
  SAVE_USER_REQUEST,
  SAVE_USER_SUCCESS,
} from "../constants/collectionConstants";
import axios from "axios";
import { BASE_URL } from "../config";
export const createCollection = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: COLLECTION_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const url = `${BASE_URL}/api/collections`;
    const res = await axios.post(url, data, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COLLECTION_CREATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COLLECTION_CREATE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getAllCollections = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COLLECTION_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const url = `${BASE_URL}/api/collections`;
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: COLLECTION_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COLLECTION_LIST_FAIL,
      payload: err.response?.data?.message,
    });
  }
};

export const getCollection = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COLLECTION_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const url = `${BASE_URL}/api/collections/${id}`;
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COLLECTION_DETAILS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COLLECTION_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteCollection =
  (collectionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: COLLECTION_DELETE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const url = `${BASE_URL}/api/collections/${collectionId}`;
      const res = await axios.delete(url, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: COLLECTION_DELETE_SUCCESS, payload: res.data.id });
    } catch (err) {
      dispatch({
        type: COLLECTION_DELETE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const updateCollection = (data, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COLLECTION_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const url = `${BASE_URL}/api/collections/${id}`;
    const res = await axios.patch(url, data, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COLLECTION_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COLLECTION_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const saveProjectById =
  (projectId, collectionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: SAVE_PROJECT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const url = `${BASE_URL}/api/collections/${projectId}/${collectionId}`;
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: SAVE_PROJECT_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: SAVE_PROJECT_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const saveUserById =
  (userId, collectionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: SAVE_USER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const url = `${BASE_URL}/api/collections/user/${userId}/${collectionId}`;
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: SAVE_USER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: SAVE_USER_FAIL,
        payload: err.response.data.message,
      });
    }
  };
