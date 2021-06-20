import {
    FETCH_COLLABORATORS_FAILURE,
    FETCH_COLLABORATORS_REQUEST,
    FETCH_COLLABORATORS_SUCCESS,
  } from "./collaboratorsTypes";
  import { HTTP_VERBS, requestHttp } from '../../utils/HttpRequest';
  import { COLLABORATORS } from "../../constants/HttpEndpoints";
  import { getToken } from "../../utils/LocalStorageToken";

export const fetchCollaborators = ()  => {
    return (dispacth) => {
        dispacth(fetchCollaboratorsRequest());
        const callHttp = async () => {
            try{
                const token = getToken();

                const response = await requestHttp(
                    { 
                      method: HTTP_VERBS.GET,
                      token,
                      endpoint: COLLABORATORS.getCollaborators,
                    }
                );

                dispacth(fetchCollaboratorsSuccess(response.data));
            } catch (error) {
                dispacth(fetchCollaboratorsFailure(error.response.statusText));
            }
        };
        callHttp();
    }
};

export const fetchCollaboratorsRequest = () => {
    return {
        type: FETCH_COLLABORATORS_REQUEST,
      };
};

export const fetchCollaboratorsSuccess = (collaborators) => {
    const data_collaborators = collaborators.map(({name, _id}) => {
        return {
            id: _id,
            name: name
        }
    });
    return {
        type: FETCH_COLLABORATORS_SUCCESS,
        payload: data_collaborators,
      };
};

export const fetchCollaboratorsFailure = (error) => {
    return {
        type: FETCH_COLLABORATORS_FAILURE,
        payload: error,
      };
};
