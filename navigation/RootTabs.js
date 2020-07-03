import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabBar from "../commons/CustomTabBar";
import { HomeStackNav, ProductsStackNav, AccountStackNav, CartStackNav, FavsStackNav } from "./StackNavs";



const { Navigator, Screen } = createBottomTabNavigator();


export const RootTabs = () => (
  <Navigator tabBar={props => <CustomTabBar {...props} />}>
    <Screen name="Home" component={HomeStackNav} />
    <Screen name="Cart" component={CartStackNav} />
    <Screen name="Favorites" component={FavsStackNav} />
    <Screen name="Categories" component={ProductsStackNav} />
    <Screen name="Account" component={AccountStackNav} />
  </Navigator>
);
