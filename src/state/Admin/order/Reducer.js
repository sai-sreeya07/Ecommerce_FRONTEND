// src/state/Admin/order/Reducer.js

import {
    CANCELED_ORDER_FAILURE, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS,
    CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS,
    GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS,
    PLACED_ORDER_FAILURE, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS,
    SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS
} from "./ActionType";

export const initialState = {
    loading: false,
    orders: [],
    error: null, // Change "" to null for consistency with error handling
};

export const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
        case CONFIRMED_ORDER_REQUEST: // Added to set loading true for specific status updates
        case PLACED_ORDER_REQUEST:    // Added to set loading true for specific status updates
        case DELIVERED_ORDER_REQUEST: // Added to set loading true for specific status updates
        case CANCELED_ORDER_REQUEST:  // Added to set loading true for specific status updates
        case SHIP_ORDER_REQUEST:      // Added to set loading true for specific status updates
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload, // This should be an array of orders from the backend
                error: null,
            };

        // All SUCCESS cases for individual order status updates and deletion
        case CONFIRMED_ORDER_SUCCESS:
        case PLACED_ORDER_SUCCESS:
        case DELIVERED_ORDER_SUCCESS:
        case CANCELED_ORDER_SUCCESS:
        case SHIP_ORDER_SUCCESS:
            // When an order's status is updated, action.payload should be the NEWLY UPDATED ORDER OBJECT
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                ),
                error: null,
            };

        case DELETE_ORDER_SUCCESS:
            // For delete, action.payload is typically the ID of the deleted order
            return {
                ...state,
                loading: false,
                orders: state.orders.filter((order) => order.id !== action.payload),
                error: null,
            };


        // All FAILURE cases (combined)
        case GET_ORDER_FAILURE:
        case DELETE_ORDER_FAILURE:
        case CONFIRMED_ORDER_FAILURE:
        case PLACED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELED_ORDER_FAILURE:
        case SHIP_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                // orders: [], // Removed: Don't clear orders on generic failure. Keep existing data.
                error: action.payload,
            };

        default:
            return state;
    }
};

export default adminOrderReducer;