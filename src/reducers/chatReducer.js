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
  MESSAGE_CREATE_RESET,
  CONVERSATION_CREATE_RESET,
} from "../constants/chatConstants";

export const conversationListReducer = (
  state = { conversations: [] },
  action
) => {
  switch (action.type) {
    case CONVERSATION_LIST_REQUEST:
      return { loading: true, conversations: [] };
    case CONVERSATION_LIST_SUCCESS:
      return { loading: false, conversations: action.payload };
    case CONVERSATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const messageListReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MESSAGE_LIST_REQUEST:
      return { loading: true, messages: [] };
    case MESSAGE_LIST_SUCCESS:
      return { loading: false, messages: action.payload };
    case MESSAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const messageCreateReducer = (state = { sentMessage: null }, action) => {
  switch (action.type) {
    case MESSAGE_CREATE_REQUEST:
      return { loading: true };
    case MESSAGE_CREATE_SUCCESS:
      return { loading: false, sentMessage: action.payload };
    case MESSAGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MESSAGE_CREATE_RESET:
      return { loading: false, sentMessage: null };
    default:
      return state;
  }
};

export const conversationCreateReducer = (
  state = { curConversation: null },
  action
) => {
  switch (action.type) {
    case CONVERSATION_CREATE_REQUEST:
      return { loading: true };
    case CONVERSATION_CREATE_SUCCESS:
      return { loading: false, curConversation: action.payload };
    case CONVERSATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CONVERSATION_CREATE_RESET:
      return { loading: false, curConversation: null };
    default:
      return state;
  }
};
