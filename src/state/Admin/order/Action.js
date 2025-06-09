import axios from "axios";

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

} from "./ActionType";
import { type } from "@testing-library/user-event/dist/type";
import { api } from "../../../config/apiConfig";




export const getOrders=() => {
    console.log("get all order ");
    return async (dispatch) => {
        dispatch({type:GET_ORDER_REQUEST});
        try {
            
            const response = await api.get(`/api/admin/orders/`);
            console.log("get all order ", response.data);
            dispatch({type:GET_ORDER_SUCCESS,payload:response.data});
        } catch (error) {

            console.log("catch error ",error);
            dispatch({type:GET_ORDER_FAILURE,payload:error.message});
        }
    };
};

export const confirmOrder = (orderid) => async (dispatch)=>{
    dispatch({type:CONFIRMED_ORDER_REQUEST});

    try {
        const response =await api.put(`/api/admin/orders/${orderid}/confirmed`);
        const data = response.data;
        console.log("confirm_order ",data)
        dispatch({type:CONFIRMED_ORDER_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:CONFIRMED_ORDER_FAILURE,payload:error.message});
    }
};

export const shipOrder = (orderid)=>{
    return async (dispatch)=>{
        try {
            dispatch({type:SHIP_ORDER_REQUEST});
            const {data} =await api.put(`/api/admin/orders/${orderid}/ship`);
            console.log(" shipped order",data)
            dispatch({type:SHIP_ORDER_SUCCESS,payload:data});
        } catch (error) {
            dispatch({type:SHIP_ORDER_FAILURE,payload:error.message});
        }
    };
};

export const deliveredOrder = (orderid)=>async (dispatch)=>{
    dispatch({type:DELIVERED_ORDER_REQUEST});

    try {
        const response=await api.put(`/api/admin/orders/${orderid}/deliver`);
        const data=response.data;
        console.log("delivered order",data)
        dispatch({type:DELIVERED_ORDER_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:DELIVERED_ORDER_FAILURE,payload:error.message});
    }
};

// export const cancelOrder = (order_id)=>async (dispatch)=>{
//     dispatch({type:CANCELED_ORDER_REQUEST});

//     try {
//         const response=await api.put(`/api/admin/order/${order_id}/cancel`);
//         const data=response.data;
//         // console.log("delivered order",data)
//         dispatch({type:CANCELED_ORDER_SUCCESS,payload:data});
//     } catch (error) {
//         dispatch({type:CANCELED_ORDER_FAILURE,payload:error.message});
//     }
// };

// export const deleteOrder=(reqData) => {
//     console.log("get all order ",reqData);
//     return async (dispatch) => {
//         dispatch({type:DELETE_ORDER_REQUEST});
//         try {
            
//             const {data}=await api.delete(`/api/admin/order/${orderid}/delete`);
//             console.log("delete order ",data);
//             dispatch({type:DELETE_ORDER_SUCCESS,payload:data});
//         } catch (error) {

//             console.log("catch error ",error);
//             dispatch({type:DELETE_ORDER_FAILURE,payload:error.message});
//         }
//     };
// };
