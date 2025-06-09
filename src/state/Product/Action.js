import { colors } from "@mui/material"
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, SEARCH_PRODUCTS_FAILURE, SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS } from "./ActionType";
import { API_BASE_URL, api } from "../../config/apiConfig";
import Product from "../../customer/components/Product/Product";
import { type } from "@testing-library/user-event/dist/type";


export const findProducts=(reqData)=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCTS_REQUEST})
    const {colors,sizes,minPrice,maxPrice,minDiscount,category,stock,sort,pageNumber,pageSize}=reqData;
    try {
        const {data}= await api.get(`/api/admin/products/all`)
        console.log("product data ",data);
        dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message})
    }
};


// --- NEW ACTION FOR SEARCH FUNCTIONALITY ---
// This action will hit your specific search endpoint
export const searchProducts=(query)=>async(dispatch)=>{
    dispatch({type:SEARCH_PRODUCTS_REQUEST})
    try {
        // Make sure API_BASE_URL is defined in apiConfig.js
        const {data}= await api.get(`${API_BASE_URL}/api/products/search?query=${query}`);
        console.log("search products data ",data);
        dispatch({type:SEARCH_PRODUCTS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:SEARCH_PRODUCTS_FAILURE,payload:error.message})
    }
};


export const findProductsById=(reqData)=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST})
    const {productId}=reqData;
    console.log("Product Id",productId)
    try {
        const data=await api.get(`/api/products/id/${productId}`)
        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data})
        console.log("data",data)
    } catch (error) {
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message})
    }
}

export const createProduct=(product)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_PRODUCT_REQUEST})

        const {data}=await api.post(`${API_BASE_URL}/api/admin/products/`,product);
        console.log("created products", data)
        dispatch({
            type:CREATE_PRODUCT_SUCCESS,
            payload:data,
        })

    } catch (error) {
        dispatch({type:CREATE_PRODUCT_FAILURE,payload:error.message})
    }
}

export const deleteProduct=(productId)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})

        const {data}=await api.delete(`${API_BASE_URL}/api/admin/products/${productId}/delete`);

        console.log("delete product ",data)
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:productId,
        })

    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAILURE,payload:error.message})
    }
}