import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../../screens";



const { Navigator, Screen } = createStackNavigator();
export const AccountStackNav = () => (
  <Navigator>
    <Screen name="AccountScreen" component={AccountScreen} />
  </Navigator>
);