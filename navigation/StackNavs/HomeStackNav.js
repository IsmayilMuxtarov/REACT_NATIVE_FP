import React from "react";
import { View, Text,TextInput,StyleSheet } from 'react-native'

import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, HomeCategoryScreen, SingleProduct } from "../../screens";
import { headerDefaultStyles } from "../../styles/headerDefaultStyle";
import { CustomHeaderImgIcon } from "../../components";
import { SearchHeader } from "../../commons";



const { Navigator, Screen } = createStackNavigator();
export const HomeStackNav = () => (
  <Navigator screenOptions={headerDefaultStyles}>
    <Screen name="HomeScreen" component={HomeScreen} 
      options={({ navigation, route }) => ({ title: "",
      headerLeft: () => ( <CustomHeaderImgIcon style={{height:36,width:70}} side="left" iconName={"logo"}  onPress={() => console.log('dasdas')}/>),
      headerRight: () =>  ( <SearchHeader navigation={navigation} route={route} onPress={() => navigation.setParams({ isSearchMode: !route?.params?.isSearchMode,})} />),
    })}    
    />
    <Screen name="HomeCategoryScreen" component={HomeCategoryScreen}
      options={({ navigation, route }) => ({ title: route?.params?.title,
      headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.goBack()}/>),
      headerRight: () =>  ( <SearchHeader
         navigation={navigation} route={route}  
         onPress={() => navigation.setParams({ isSearchMode: !route?.params?.isSearchMode,})}  
         />),
    })} 
    />
    <Screen name="SingleProductHome" component={SingleProduct} />
  </Navigator>
);




// options={({ navigation, route }) => ({ title: "",
//        headerRight: () => ( <HeaderIconBtn side="right" iconName={route.params.isEditMode ? "save" : "pen"}  onPress={() => navigation.setParams({ isEditMode: !route.params.isEditMode,})}/>),
//        headerLeft: () =>  ( <HeaderIconBtn side="left" iconName="back" onPress={() => { navigation.navigate("Home", { listType: route.params?.listType });}}/>),
//     })}