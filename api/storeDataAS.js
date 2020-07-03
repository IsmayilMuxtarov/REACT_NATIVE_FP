import { AsyncStorage } from "react-native";

export const SET_APP_DATA = 'SET_APP_DATA';
const setAppData =(payload)=>({type:SET_APP_DATA,payload});

const DATA_KEY = 'petshop';

export async function updateAppData(store){
    const state = store.getState();
    await AsyncStorage.setItem(DATA_KEY,JSON.stringify(state));
}

export async function getAppDataFromAs(store){
    const appData = await AsyncStorage.getItem(DATA_KEY);
    if(appData){
        store.dispatch(setAppData(JSON.parse(appData)));
    }
}