import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {  FavoriteScreen } from "../../screens";
import { headerDefaultStyles } from "../../styles/headerDefaultStyle";

const { Navigator, Screen } = createStackNavigator();

export const FavsStackNav = () => (
  <Navigator screenOptions={headerDefaultStyles}>
    <Screen name="FavsStackNav" component={FavoriteScreen} />
  </Navigator>
);