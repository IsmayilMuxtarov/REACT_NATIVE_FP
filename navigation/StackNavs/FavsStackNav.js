import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {  FavoriteScreen } from "../../screens";

const { Navigator, Screen } = createStackNavigator();

export const FavsStackNav = () => (
  <Navigator>
    <Screen name="FavsStackNav" component={FavoriteScreen} />
  </Navigator>
);