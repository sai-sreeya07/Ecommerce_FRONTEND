import axios from "axios"; // Import axios directly
import { API_BASE_URL } from "../../../config/apiConfig"; // Import API_BASE_URL, not 'api' instance
// Remove the unused import: import { type } from "@testing-library/user-event/dist/type";

import {
    CONFIRMED_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    SHIP_ORDER_FAILURE,
    SHIP_ORDER_REQUEST,
    SHIP_ORDER_SUCCESS,
    // Add other action types if you use them here (PLACED_ORDER, CANCELED_ORDER)
} from "./ActionType";

// Helper function to get auth headers with the latest JWT
const getAuthHeaders = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
        console.error('Authentication required: JWT token not found in localStorage.');
        return null; // Return null if no token is found
    }
    return {
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        }
    };
};

export const getOrders = () => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
        const config = getAuthHeaders();
        if (!config) { // Check if config was successfully created
            dispatch({ type: GET_ORDER_FAILURE, payload: 'Authentication required: JWT token not found.' });
            return; // Stop execution
        }

        const response = await axios.get(`${API_BASE_URL}/api/admin/orders/`, config);
        console.log("get all order ", response.data);
        dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("catch error ", error);
        dispatch({ type: GET_ORDER_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const confirmOrder = (orderId) => async (dispatch) => { // Changed orderid to orderId for consistency
    dispatch({ type: CONFIRMED_ORDER_REQUEST });
    try {
        const config = getAuthHeaders();
        if (!config) {
            dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: 'Authentication required: JWT token not found.' });
            return;
        }

        const response = await axios.put(
            `${API_BASE_URL}/api/admin/orders/${orderId}/confirmed`,
            {}, // Empty body for PUT requests that don't need one
            config
        );
        const data = response.data;
        console.log("confirm_order ", data);
        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const shipOrder = (orderId) => async (dispatch) => { // Changed orderid to orderId for consistency
    dispatch({ type: SHIP_ORDER_REQUEST });
    try {
        const config = getAuthHeaders();
        if (!config) {
            dispatch({ type: SHIP_ORDER_FAILURE, payload: 'Authentication required: JWT token not found.' });
            return;
        }

        const { data } = await axios.put(
            `${API_BASE_URL}/api/admin/orders/${orderId}/ship`,
            {},
            config
        );
        console.log(" shipped order", data);
        dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SHIP_ORDER_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const deliveredOrder = (orderId) => async (dispatch) => { // Changed orderid to orderId for consistency
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    try {
        const config = getAuthHeaders();
        if (!config) {
            dispatch({ type: DELIVERED_ORDER_FAILURE, payload: 'Authentication required: JWT token not found.' });
            return;
        }

        const response = await axios.put(
            `${API_BASE_URL}/api/admin/orders/${orderId}/deliver`,
            {},
            config
        );
        const data = response.data;
        console.log("delivered order", data);
        dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

// Uncommented and fixed deleteOrder action
export const deleteOrder = (orderId) => async (dispatch) => { // Changed reqData to orderId for consistency
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
        const config = getAuthHeaders();
        if (!config) {
            dispatch({ type: DELETE_ORDER_FAILURE, payload: 'Authentication required: JWT token not found.' });
            return;
        }

        await axios.delete(`${API_BASE_URL}/api/admin/orders/${orderId}/delete`, config);
        console.log("delete order ", orderId); // Log the deleted orderId
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId }); // Dispatch orderId to update state
    } catch (error) {
        console.log("catch error ", error);
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

// Keep other commented out actions if you plan to implement them later
// export const cancelOrder = (order_id)=>async (dispatch)=>{
//     dispatch({type:CANCELED_ORDER_REQUEST});
//     try {
//         const config = getAuthHeaders();
//         if (!config) {
//             dispatch({type:CANCELED_ORDER_FAILURE,payload:'Authentication required: JWT token not found.'});
//             return;
//         }
//         const response=await axios.put(`${API_BASE_URL}/api/admin/order/${order_id}/cancel`, {}, config);
//         const data=response.data;
//         dispatch({type:CANCELED_ORDER_SUCCESS,payload:data});
//     } catch (error) {
//         dispatch({type:CANCELED_ORDER_FAILURE,payload:error.message});
//     }
// };