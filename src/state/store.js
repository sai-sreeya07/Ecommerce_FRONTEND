// src/state/store.js

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer"; // Assuming this path is correct for your auth reducer
import { customerProductReducer } from "./Product/Reducer"; // Assuming this path is correct for your product reducer
import { cartReducer } from "./Cart/Reducer"; // Assuming this path is correct for your cart reducer
import { orderReducer } from "./Order/Reducer"; // Assuming this path is correct for your main order reducer
import adminOrderReducer from "./Admin/order/Reducer"; // Correct path for the admin order reducer

export const rootReducers = combineReducers({
    auth: authReducer,
    products: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer // This is where the admin order state will reside
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));