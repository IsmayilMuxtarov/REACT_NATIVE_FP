import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductsScreen, SingleProduct } from "../../screens";
import { headerDefaultStyles } from "../../styles/headerDefaultStyle";



const { Navigator, Screen } = createStackNavigator();
export const ProductsStackNav = () => (
  <Navigator screenOptions={headerDefaultStyles} initialRouteName={"ProductsScreen"}>
    <Screen name="ProductsScreen" component={ProductsScreen} />
    <Screen name="SingleProduct" component={SingleProduct} />
  </Navigator>
);