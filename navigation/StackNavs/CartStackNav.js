import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {  CartScreen } from "../../screens";



const { Navigator, Screen } = createStackNavigator();
export const CartStackNav = () => (
  <Navigator>
    <Screen name="CartScreen" component={CartScreen} />
  </Navigator>
);