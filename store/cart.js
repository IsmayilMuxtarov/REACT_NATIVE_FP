import {SET_APP_DATA} from "../api/storeDataAS";

// ACTION TYPES
const DELETE_ITEM_FROM_CART = "DELETE_ITEM_FROM_CART";
const ADD_TO_CART = "ADD_TO_CART";
const INCREASE_CART_ITEM_COUNT = "INCREASE_CART_ITEM_COUNT";
const DECREASE_CART_ITEM_COUNT = "DECREASE_CART_ITEM_COUNT";
const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
const SET_USER_DATA = "SET_USER_DATA";


// SELECTORS
export const MODULE_NAME = 'cart';
export const getCart = (state) => state[MODULE_NAME];

//REDUCER
const initialState = {
    cart: [
        // {
        //     id: `${Math.random()}${Date.now()}`,
        //     name: "Dog dry food - Hills sciense",
        //     status: "",
        //     img: 'https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg',
        //     size: 250,
        //     color: "Red",
        //     price: 130,
        //     count: 1
        // },
        // {
        //     id: `${Math.random()}${Date.now()}`,
        //     name: "Dog dry food - Hills sciense",
        //     status: "70%",
        //     img: 'https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg',
        //     size: 250,
        //     color: "Red",
        //     price: 130,
        //     count: 1
        // },
        // {
        //     id: `${Math.random()}${Date.now()}`,
        //     name: "Dog dry food - Hills sciense",
        //     status: "New",
        //     img: 'https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg',
        //     size: 250,
        //     color: "Red",
        //     price: 130,
        //     count: 1
        // },
        // {
        //     id: `${Math.random()}${Date.now()}`,
        //     name: "Dog dry food - Hills sciense",
        //     status: "30%",
        //     img: 'https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg',
        //     size: 250,
        //     color: "Red",
        //     price: 130,
        //     count: 1
        // },
    ]
};

export function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case DELETE_ITEM_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((cartItem) => cartItem.id !== payload.id),
            };
        case ADD_TO_CART:
            const duplicate = Boolean(state.cart.find(item => item.id === payload.id));
            return {
                ...state,
                cart: duplicate ?
                    [...state.cart]
                    :
                    [...state.cart,
                        {
                            id: payload.id,
                            name: payload.name,
                            status: payload.status,
                            img: payload.img,
                            size: payload.size,
                            color: payload.color,
                            price: payload.price,
                            count: payload.count
                        }]

            };
        case INCREASE_CART_ITEM_COUNT:
            return {
                ...state,
                cart: [
                    ...state.cart.map((item) => {
                        if (item.id === payload.id) {
                            return {
                                ...item,
                                count: item.count + 1
                            }
                        }
                        return item;
                    })
                ]
            };
        case DECREASE_CART_ITEM_COUNT:
            return {
                ...state,
                cart: [
                    ...state.cart.map((item) => {
                        if (item.id === payload.id) {
                            return {
                                ...item,
                                count: item.count - 1
                            }
                        }
                        return item;
                    })
                ]
            };
        case UPDATE_CART_ITEM:
            return {
                ...state,
                cart: [
                    ...state.cart.map((item) => {
                        if (item.id === payload.id) {
                            return {
                                ...payload,
                            }
                        }
                        return item;
                    })
                ]
            };
        case SET_APP_DATA:
            return {...state, ...payload[MODULE_NAME]}
        default:
            return state;
    }
}

// ACTION CREATORS
export const deleteItemFromCart = (payload) => ({
    type: DELETE_ITEM_FROM_CART,
    payload
});
export const addToCart = (payload) => ({
    type: ADD_TO_CART,
    payload
});
export const increaseCartItemCount = (payload) => ({
    type: INCREASE_CART_ITEM_COUNT,
    payload
});
export const decreaseCartItemCount = (payload) => ({
    type: DECREASE_CART_ITEM_COUNT,
    payload
});
export const updateCartItem = (payload) => ({
    type: UPDATE_CART_ITEM,
    payload
});