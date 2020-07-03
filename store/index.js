import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer as userReducer,MODULE_NAME as userModuleName } from "./user";

import { updateAppData, getAppDataFromAs } from "../api/storeDataAS";


const rootReducer = combineReducers({
    [userModuleName]:userReducer
});

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(Thunk)));

store.subscribe(()=>updateAppData(store));
getAppDataFromAs(store);
export default store;
