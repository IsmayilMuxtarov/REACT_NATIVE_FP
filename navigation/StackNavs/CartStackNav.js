import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {  CartScreen, AddressScreen, PlaceOrderScreen } from "../../screens";
import { headerDefaultStyles } from "../../styles/headerDefaultStyle";
import { CustomHeaderImgIcon } from "../../components";

const { Navigator, Screen } = createStackNavigator();



export const CartStackNav = () => (
  <Navigator screenOptions={headerDefaultStyles}>
    <Screen name="CartScreen" component={CartScreen} options={{title:"Cart"}} />
    <Screen name="AddressScreenCheckout" component={AddressScreen} 
      options={({ navigation }) => ({ title: "Checkout",
      headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.navigate("CartScreen")}/>),
    })}
    />
    <Screen name="PlaceOrderScreen" component={PlaceOrderScreen} 
      options={({ navigation }) => ({ title: "Order Summary",
      headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.navigate("AddressScreenCheckout")}/>),
    })}
    />
  </Navigator>
);