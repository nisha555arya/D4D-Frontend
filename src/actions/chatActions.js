import {
  CONVERSATION_CREATE_FAIL,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_LIST_FAIL,
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_SUCCESS,
  MESSAGE_CREATE_FAIL,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_LIST_FAIL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
} from "../constants/chatConstants";
import axios from "axios";
import { BASE_URL } from "../config";
export const getAllConversations = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: CONVERSATION_LIST_REQUEST });
    const url = `${BASE_URL}/api/conversation/`;

    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: CONVERSATION_LIST_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: CONVERSATION_LIST_FAIL });
  }
};

export const getAllMessages = (userInfo, id) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_LIST_REQUEST });
    const url = `${BASE_URL}/api/message/${id}`;

    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: MESSAGE_LIST_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: MESSAGE_LIST_FAIL });
  }
};

export const createMessage = (data, userInfo) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_CREATE_REQUEST });
    const url = `${BASE_URL}/api/message/`;

    const response = await axios.post(url, data, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: MESSAGE_CREATE_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: MESSAGE_CREATE_FAIL, payload: err });
  }
};

export const createConversation =
  (member2_id, userInfo) => async (dispatch) => {
    try {
      dispatch({ type: CONVERSATION_CREATE_REQUEST });
      const url = `${BASE_URL}/api/conversation/`;

      const response = await axios.post(
        url,
        { member2_id },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: CONVERSATION_CREATE_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: CONVERSATION_CREATE_FAIL, payload: err });
    }
  };
