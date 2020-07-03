// ACTION TYPES
import { SET_APP_DATA } from "../api/storeDataAS";
const SET_USER_DATA = "SET_USER_DATA";
const USER_LOGOUT = "USER_LOGOUT";

export const MODULE_NAME = "user";
export const getUserData = (state) => state[MODULE_NAME];

// REDUCER
const initialState = { authStatus:false };
export function reducer(state=initialState,{type,payload}){
    switch(type){
        case SET_APP_DATA:
            return {...state,...payload[MODULE_NAME]}
        case SET_USER_DATA:
            return {...state,authStatus:true,...payload} 
        case USER_LOGOUT:
            return {...state,...initialState}
        default:
            return state;
    }
}

//ACTION CREATOR
export const setUserData = payload => ({type:SET_USER_DATA,payload});
export const userLogOut = () => ({type:USER_LOGOUT});
 

//MIDLEWARE
const apiUrl = "http://petsco.justportfolio.tk/api/auth/login";

export const singIn = (email,password) => async dispatch => {
    console.log('singIn de')
    try {
        const response = await fetch(apiUrl,
            {method:'POST',headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,password})}
            );
        const result = await response.json();
            dispatch(setUserData({...result}));
    } catch(error){console.log('sing in error',error);}
}


