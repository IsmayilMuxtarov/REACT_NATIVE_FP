// ACTION TYPES
const DELETE_ITEM_FROM_FAVORITES = "DELETE_ITEM_FROM_FAVORITES";
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
// SELECTORS
export const MODULE_NAME = 'favorites';
export const getFavorites = (state) => state[MODULE_NAME];

//REDUCER
const initialState = {
        favorites: [
            // {
            //     id: `${Math.random()}${Date.now()}`,
            //     name: "Fav dry food - Hills sciense",
            //     status: "50%",
            //     img: 'https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg',
            //     size: 250,
            //     color: "Red",
            //     price: 130,
            //     count: 1
            // },
            // {
            //     id: `${Math.random()}${Date.now()}`,
            //     name: "Fav dry food - Hills sciense",
            //     status: "New",
            //     img: 'https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg',
            //     size: 250,
            //     color: "Red",
            //     price: 130,
            //     count: 1
            // },
            // {
            //     id: `${Math.random()}${Date.now()}`,
            //     name: "Fav dry food - Hills sciense",
            //     status: "70%",
            //     img: 'https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg',
            //     size: 250,
            //     color: "Red",
            //     price: 130,
            //     count: 1
            // },
            // {
            //     id: `${Math.random()}${Date.now()}`,
            //     name: "Fav dry food - Hills sciense",
            //     status: "",
            //     img: 'https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg',
            //     size: 250,
            //     color: "Red",
            //     price: 130,
            //     count: 1
            // },
        ]
    }
;

export function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case DELETE_ITEM_FROM_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.filter((cartItem) => cartItem.id !== payload.id),
            };
        case ADD_TO_FAVORITES:
            const duplicate = Boolean(state.favorites.find(item => item.id === payload.id));
            return {
                ...state,
                favorites: duplicate ?
                    [...state.favorites]
                    :
                    [...state.favorites,
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

        default:
            return state;
    }
}

// ACTION CREATORS
export const deleteItemFromFavorites = (payload) => ({
    type: DELETE_ITEM_FROM_FAVORITES,
    payload
});
export const addToFavorites = (payload) => ({
    type: ADD_TO_FAVORITES,
    payload
});