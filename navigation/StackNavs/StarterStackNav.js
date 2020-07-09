import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen, SignInScreen, SignUpScreen, AddPets } from "../../screens";



const { Navigator, Screen } = createStackNavigator();
export const StarterStackNav = () => (
  <Navigator initialRouteName="WelcomeScreen" headerMode={'none'}>
    <Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Screen name="SignInScreen" component={SignInScreen} />
    <Screen name="SignUpScreen" component={SignUpScreen} />
    <Screen name="AddPetsStarter" component={AddPets} />
  </Navigator>
);