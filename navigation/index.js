import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootTabs } from "./RootTabs";

import { connect } from "react-redux";
import { getUserAuthStatus } from "../store/user";
import { StarterStackNav } from "./StackNavs";

const mapStateToProps =(state) =>({ getUserAuthStatus:getUserAuthStatus(state) });

export const RootNav =connect(mapStateToProps,{})(({getUserAuthStatus}) => {
  return (
  <NavigationContainer>
    {getUserAuthStatus ?  <RootTabs/> : <StarterStackNav />}
  </NavigationContainer>
  );
});
