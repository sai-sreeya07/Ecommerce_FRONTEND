import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState={
    user:null,
    isLoading:false,
    error:null,
    jwt:null
}

// export const authReducer=(state=initialState,action)=>{
//     switch(action.type){
//         case REGISTER_REQUEST:
//         case LOGIN_REQUEST:
//         case GET_USER_REQUEST:
//              return {...state,isLoading:true,error:null}
//         case REGISTER_SUCCESS:
//         case LOGIN_SUCCESS:
//                 return {...state, isLoading:false,error:null,jwt:action.payload,user: action.payload.user}  
//         case GET_USER_SUCCESS:
//                 return {...state,isLoading:false,error:null,user:action.payload}   
//         case REGISTER_FAILURE:
//         case LOGIN_FAILURE:
//         case GET_USER_FAILURE:
//                     return {...state,isLoading:false,error:action.payload}   
//         case LOGOUT:
//             return {
//                 ...initialState,
//                 jwt: null,
//               };     
//         default:
//             return state;     
//     }

// }


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
        return { ...state, isLoading: true, error: null };
  
      case REGISTER_SUCCESS:
        return { ...state, isLoading: false };
      case REGISTER_FAILURE:
      case LOGIN_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
      case LOGIN_SUCCESS:
        return { ...state, isLoading: false };
      case GET_USER_REQUEST:
        return { ...state, isLoading: true, error: null,fetchingUser:true };
      case GET_USER_SUCCESS:
        return { ...state, isLoading: false, user: action.payload,fetchingUser:false };
      case GET_USER_FAILURE:
        return { ...state, isLoading: false, error: action.payload,fetchingUser:false };
        case LOGOUT:
          localStorage.removeItem("jwt");
          return { ...state, jwt: null, user: null };
      default:
        return state;
    }
  };