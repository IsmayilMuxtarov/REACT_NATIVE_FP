import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductsScreen, SingleProduct } from "../../screens";



const { Navigator, Screen } = createStackNavigator();
export const ProductsStackNav = () => (
  <Navigator>
    <Screen name="ProductsScreen" component={ProductsScreen} />
    <Screen name="SingleProduct" component={SingleProduct} />
  </Navigator>
);