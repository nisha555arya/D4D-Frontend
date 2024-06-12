import {
  LIKED_PROJECT_FAIL,
  LIKED_PROJECT_REQUEST,
  LIKED_PROJECT_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  SEARCH_PROJECT_FAIL,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
  VIEWED_PROJECT_FAIL,
  VIEWED_PROJECT_REQUEST,
  VIEWED_PROJECT_SUCCESS,
} from "../constants/projectConstants";

import axios from "axios";
import { BASE_URL } from "../config";

export const createProject = (userInfo, data) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_ADD_REQUEST });

    const url = `${BASE_URL}/api/project`;
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: PROJECT_ADD_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROJECT_ADD_FAIL,
      payload: err.response.data.message,
    });
  }
};
export const getMostLikedProjects = () => async (dispatch) => {
  try {
    dispatch({ type: LIKED_PROJECT_REQUEST });
    const url = `${BASE_URL}/api/project/most_liked`;
    const res = await axios.get(url);
    dispatch({ type: LIKED_PROJECT_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LIKED_PROJECT_FAIL, payload: err });
  }
};

export const getMostViewedProjects = () => async (dispatch) => {
  try {
    dispatch({ type: VIEWED_PROJECT_REQUEST });
    const url = `${BASE_URL}/api/project/most_viewed`;
    const res = await axios.get(url);
    dispatch({ type: VIEWED_PROJECT_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: VIEWED_PROJECT_FAIL, payload: err });
  }
};

export const getProjects =
  (tech, keyword, pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: SEARCH_PROJECT_REQUEST });

      let url = `${BASE_URL}/api/project/search?page_number=${pageNumber}`;

      if (tech?.trim().length > 0) {
        url += `&required_skills=${tech}`;
      }
      if (keyword?.trim().length > 0) {
        url += `&keyword=${keyword}`;
      }

      const res = await axios.get(url);

      dispatch({ type: SEARCH_PROJECT_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: SEARCH_PROJECT_FAIL, payload: err });
    }
  };
export const getProjectList = (id, userInfo) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST });

    const url = `${BASE_URL}/api/project/all/${id}`;
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: PROJECT_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getProjectDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST });

    const url = `${BASE_URL}/api/project/${id}`;
    const res = await axios.get(url);
    // const url2 = `${BASE_URL}/api/comment/${id}`;
    // const res2 = await axios.get(url2);
    // const output = { ...res.data, ...res2.data };
    // console.log(output);
    dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteProject = (userInfo, id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DELETE_REQUEST });
    const url = `${BASE_URL}/api/project/${id}`;
    const res = await axios.delete(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PROJECT_DELETE_SUCCESS, payload: res.data.id });
  } catch (err) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateProject = (userInfo, form, id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_UPDATE_REQUEST });

    const url = `${BASE_URL}/api/project/${id}`;
    const res = await axios.patch(url, form, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateLikesOfProject = (userInfo, id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_UPDATE_REQUEST });

    const url = `${BASE_URL}/api/project/like/${id}`;
    const res = await axios.post(
      url,
      {},
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};
