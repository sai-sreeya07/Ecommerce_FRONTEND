import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,  // ✅ ADD THIS LINE
} from './ActionType';

const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
    case GET_ORDER_HISTORY_REQUEST:  // ✅ HANDLE REQUEST STATE
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ORDER_SUCCESS:
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
        error: null,
      };

    case GET_ORDER_HISTORY_SUCCESS:  // ✅ FIX: ADD THIS CASE
      return {
        ...state,
        loading: false,
        orders: action.payload,  // ✅ Save fetched orders here
        error: null,
      };

    case CREATE_ORDER_FAILURE:
    case GET_ORDER_BY_ID_FAILURE:
    case GET_ORDER_HISTORY_FAILURE:  // ✅ Handle failure state
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
