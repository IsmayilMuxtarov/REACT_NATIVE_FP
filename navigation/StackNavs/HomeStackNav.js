import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, HomeCategoryScreen, SingleProduct } from "../../screens";
import { headerDefaultStyles } from "../../styles/headerDefaultStyle";



const { Navigator, Screen } = createStackNavigator();
export const HomeStackNav = () => (
  <Navigator screenOptions={headerDefaultStyles}>
    <Screen name="HomeScreen" component={HomeScreen} />
    <Screen name="HomeCategoryScreen" component={HomeCategoryScreen} />
    <Screen name="SingleProductHome" component={SingleProduct} />
  </Navigator>
);