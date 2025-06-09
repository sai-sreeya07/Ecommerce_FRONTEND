import { DELETE_PRODUCT_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS } from "./ActionType"

const initialstate={
    products:[],
    product:null,
    loading:false,
    error:null
    
}
export const customerProductReducer=(state=initialstate,action)=>{
    switch(action.type){
        case FIND_PRODUCTS_REQUEST:
            case FIND_PRODUCT_BY_ID_REQUEST:
                case SEARCH_PRODUCTS_REQUEST:
                return {... state,loading:true, error:null}

        case FIND_PRODUCTS_SUCCESS:
            return {...state,loading:false,error:null,products:action.payload}
            case SEARCH_PRODUCTS_SUCCESS: // <-- NEW: Handle successful search
            // Assuming payload is { content: [...], totalPages: N, totalElements: M }
            return {
                ...state,
                loading:false,
                error:null,
                products:action.payload.content, // Store content array from search
                totalPages:action.payload.totalPages, // Store totalPages from search
                totalElements:action.payload.totalElements, // Store totalElements from search
            }    
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state,loading:false,error:null,product:action.payload} 
        case DELETE_PRODUCT_SUCCESS:
            return{...state, loading:false,error:null,products: state.products.filter((item)=>item.id!==action.payload)}
        case FIND_PRODUCTS_FAILURE:
            case FIND_PRODUCT_BY_ID_FAILURE:
            return {...state,loading:false,error:action.payload}     
        
        default:
            return state;

    }
}