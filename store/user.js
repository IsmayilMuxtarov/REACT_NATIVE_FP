// ACTION TYPES
import { SET_APP_DATA } from "../api/storeDataAS";
import { signInFetchAPI, signUpFetchAPI } from "../api";
const SET_USER_DATA = "SET_USER_DATA";
const USER_LOGOUT = "USER_LOGOUT";
const SET_AUTH_STATUS = "SET_AUTH_STATUS";
const ADD_USER_ADDRESS = "ADD_USER_ADDRESS";
const DELETE_USER_ADDRESS = "DELETE_USER_ADDRESS";
const ADD_USER_PETS = "ADD_USER_PETS";
const DELETE_USER_PETS = "DELETE_USER_PETS";


export const MODULE_NAME = "user";
export const getUserData = (state) => state[MODULE_NAME];
export const getUserPets = (state) => state[MODULE_NAME].pets;
export const getUserAddress = (state) => state[MODULE_NAME].address;
export const getUserAuthStatus = (state) => state[MODULE_NAME].authStatus;
export const getUserAccessToken = (state) => state[MODULE_NAME].accessToken;

// REDUCER
const initialState = { authStatus:false,email:'',name:'',accessToken:'',pets:[],address:[] };
export function reducer(state=initialState,{type,payload}){
    switch(type){
        case SET_APP_DATA:
            return {...state,...payload[MODULE_NAME]}
        case SET_USER_DATA:
            return {...state,...payload};
        case ADD_USER_ADDRESS:
            return {...state,address:[...state.address,{id: `${Math.random()}${Date.now()}`,name: payload.name,description:payload.description}]}
        case DELETE_USER_ADDRESS:
            return {...state,address:state.address.filter((addres)=>addres.id!==payload.addresID)};
        case ADD_USER_PETS:
            return {...state,pets:[...state.pets,{id: `${Math.random()}${Date.now()}`,name: payload.name,age:{years:payload.years,months:payload.months},}]}
        case DELETE_USER_PETS:
            return {...state,pets:state.pets.filter((pet)=>pet.id!==payload.petID)};
        case SET_AUTH_STATUS:
            return {...state,authStatus:true}
        case USER_LOGOUT:
            return {...initialState}
        default: return state;
    }
}

//ACTION CREATOR
export const setUserData = payload => ({type:SET_USER_DATA,payload});
export const userLogOut = (payload) => ({type:USER_LOGOUT});
export const setAuthStatus = () => ({type:SET_AUTH_STATUS});

export const addUserAddress = payload => ({type:ADD_USER_ADDRESS,payload});
export const DeleteUserAddress = payload => ({type:DELETE_USER_ADDRESS,payload});
export const addUserPets = payload => ({type:ADD_USER_PETS,payload});
export const deleteUserPets = payload => ({type:DELETE_USER_PETS,payload});
 

//MIDLEWARE

export const singIn = (email,password) => async dispatch => {
    try {
        const result = await signInFetchAPI("",{email,password});
        console.log(result)
        if(result.success){
            const petsData = JSON.parse(result.data.user_pets).pets || [];
            const addressData = JSON.parse(result.data.user_address).address || [];
            dispatch(setUserData({authStatus:true,email:result.data.email,name:result.data.name,accessToken:result.data.api_token,pets:petsData,address:addressData}));
        }else{alert(result.message);}
    } catch(error){console.log('sing in error',error);}
}

export const singUp = (email,password,name) => async dispatch => {
    try {
        const result = await signUpFetchAPI("",{email,password,name});
        if(result.success){
            dispatch(setUserData({authStatus:false,email:result.data.email,name:result.data.name,accessToken:result.data.api_token,}));
        }else{console.log(result.error);}
    } catch(error){console.log('sing up error',error);}
}
