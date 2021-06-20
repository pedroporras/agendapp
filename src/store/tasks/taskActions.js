import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
} from "./taskTypes";
import { HTTP_VERBS, requestHttp } from '../../utils/HttpRequest';
import { TASKS } from "../../constants/HttpEndpoints";
import { getToken } from "../../utils/LocalStorageToken";

export const fetchTasks = (filter = {}) => {
  return (dispatch) => {
    dispatch(fetchTaskRequest());    
    const callHttp = async (filter) => {
      try {
        const token = getToken();
        const response = await requestHttp(
            { 
              method: HTTP_VERBS.GET,
              token,
              endpoint: TASKS.getTasks,
              params: filter
            }
        );
        dispatch(fetchTaskSuccess(response.data));
      } catch (error) {
        dispatch(fetchTaskFailure(error.response.statusText));
      }
    };
    callHttp(filter);
  };
};

export const fetchTaskRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST,
  };
};

export const fetchTaskSuccess = (tasks) => {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
};

export const fetchTaskFailure = (error) => {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: error,
  };
};
