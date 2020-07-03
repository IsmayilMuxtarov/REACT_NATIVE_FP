import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, HomeCategoryScreen, SingleProduct } from "../../screens";



const { Navigator, Screen } = createStackNavigator();
export const HomeStackNav = () => (
  <Navigator>
    <Screen name="HomeScreen" component={HomeScreen} />
    <Screen name="HomeCategoryScreen" component={HomeCategoryScreen} />
    <Screen name="SingleProduct" component={SingleProduct} />
  </Navigator>
);