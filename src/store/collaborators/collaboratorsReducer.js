import {
    FETCH_COLLABORATORS_FAILURE,
    FETCH_COLLABORATORS_REQUEST,
    FETCH_COLLABORATORS_SUCCESS,
  } from "./collaboratorsTypes";
  
  const initialState = {
    loading: false,
    collaborators: [],
    error: "",
  };

  const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_COLLABORATORS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_COLLABORATORS_SUCCESS:
            return {
                loading: false,
                error: "",
                collaborators: action.payload,
            };
        case FETCH_COLLABORATORS_FAILURE:
            return {
                loading: false,
                collaborators: [],
                error: action.payload
            };
        default: return state;
    }
  };

  export default reducer;
