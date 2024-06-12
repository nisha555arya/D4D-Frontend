import {
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  REPLY_CREATE_FAIL,
  REPLY_CREATE_REQUEST,
  REPLY_CREATE_SUCCESS,
} from "../constants/commentConstants";
import axios from "axios";
import { BASE_URL } from "../config";

export const createComment =
  (userInfo, data, project_id) => async (dispatch) => {
    try {
      dispatch({ type: COMMENT_CREATE_REQUEST });

      const url = `${BASE_URL}/api/comment/${project_id}`;
      const res = await axios.post(url, data, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: COMMENT_CREATE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: COMMENT_CREATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const getAllComments = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_LIST_REQUEST });

    const url = `${BASE_URL}/api/comment/${projectId}`;
    const res = await axios.get(url);

    dispatch({ type: COMMENT_LIST_SUCCESS, payload: res.data.comments });
  } catch (err) {
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteComment = (userInfo, id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST });

    const url = `${BASE_URL}/api/comment/${id}`;
    const res = await axios.delete(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COMMENT_DELETE_SUCCESS, payload: res.data.id });
  } catch (err) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateComment = (userInfo, data, id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_UPDATE_REQUEST });

    const url = `${BASE_URL}/api/comment/${id}`;
    const res = await axios.patch(url, data, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const createReply = (userInfo, data, comment_id) => async (dispatch) => {
  try {
    dispatch({ type: REPLY_CREATE_REQUEST });

    const url = `${BASE_URL}/api/comment/reply/${comment_id}`;
    const res = await axios.post(url, data, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: REPLY_CREATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: REPLY_CREATE_FAIL,
      payload: err.response.data.message,
    });
  }
};
