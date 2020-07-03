import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthScreen } from "../screens";
import { RootTabs } from "./RootTabs";

import { connect } from "react-redux";
import { getUserData } from "../store/user";

const mapStateToProps =(state) =>({ userData:getUserData(state) });

export const RootNav =connect(mapStateToProps,{})(({userData}) => {
  console.log(userData);
  return (
  <NavigationContainer>
    {userData.authStatus ?  <RootTabs/> : <AuthScreen />}
  </NavigationContainer>
  );
});
