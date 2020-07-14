import React,{useState} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { AppLoading } from "expo";

import { RootNav } from './navigation';
import { loadFonts } from "./styles/fonts";
import store from './store';
import { Provider } from "react-redux";
import { COLORS } from './styles/colors';
import { StatusBar } from 'expo-status-bar';



export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }

  return (
      <Provider store={store}>
        <StatusBar  style="light" />
        <RootNav/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
