import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {  CartScreen } from "../../screens";
import { headerDefaultStyles } from "../../styles/headerDefaultStyle";



const { Navigator, Screen } = createStackNavigator();
export const CartStackNav = () => (
  <Navigator screenOptions={headerDefaultStyles}>
    <Screen name="CartScreen" component={CartScreen} />
  </Navigator>
);