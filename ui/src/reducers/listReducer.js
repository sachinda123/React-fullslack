import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE, FETCH_LIST_ADD_SUCCESS, FETCH_LIST_RESET_ERROR } from "../actions/listActions";

const initialState = {
  loading: false,
  data: [],
  error: null,
  successfully_add: false,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_LIST_ADD_SUCCESS:
      return {
        ...state,
        successfully_add: true,
      };
    case FETCH_LIST_RESET_ERROR:
      return {
        ...state,
        error: null,
        successfully_add: false,
      };
    default:
      return state;
  }
};

export default listReducer;
