import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductsScreen, SingleProduct } from "../../screens";
import { headerDefaultStyles } from "../../styles/headerDefaultStyle";
import { CustomHeaderImgIcon } from "../../components";
import { textShortening } from "../../utils";



const { Navigator, Screen } = createStackNavigator();
export const ProductsStackNav = () => (
  <Navigator screenOptions={headerDefaultStyles} >
    <Screen name="ProductsScreen" component={ProductsScreen} 
      options={({ navigation, route }) => ({ title:  textShortening(route?.params?.title,20) || "Products",
        headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.goBack()}/>),
      })} 
    />
    <Screen name="SingleProduct" component={SingleProduct}
      options={({ navigation, route }) => ({ title: textShortening(route?.params?.title,20),
        headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.goBack()}/>),
      })} 
    />
  </Navigator>
);