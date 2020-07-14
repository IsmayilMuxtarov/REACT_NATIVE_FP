import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen, PetsScreen,AddPetsScreen, AddressScreen, OrdersScreen, OrderScreen, AboutUs, ShippingInfo } from "../../screens";
import { headerDefaultStyles } from "../../styles/headerDefaultStyle";
import { CustomHeaderImgIcon, CustomHeaderVectorIcon } from "../../components";



const { Navigator, Screen } = createStackNavigator();
export const AccountStackNav = () => (
  <Navigator screenOptions={headerDefaultStyles}>
    <Screen name="AccountScreen" component={AccountScreen} />
    <Screen name="PetsScreen" component={PetsScreen} 
      options={({ navigation, route }) => ({ title:  "Pets",
        headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.goBack()}/>),
        headerRight: () =>  ( <CustomHeaderVectorIcon iconName="plus" iconSize={27} style={{width:70,height:60}} onPress={() => navigation.navigate('AddPetsScreen')} />),
      })} 
    />
    <Screen name="AddPetsScreen" component={AddPetsScreen} 
        options={({ navigation, route }) => ({ title:  "Pets",
        headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.navigate('PetsScreen')}/>),
      })}     
    />
    <Screen name="AddressScreen" component={AddressScreen} 
      options={({ navigation, route }) => ({ title: "Address",
        headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.navigate("AccountScreen")}/>),
      })}
    />
    <Screen name="OrdersScreen" component={OrdersScreen} 
      options={({ navigation }) => ({ title: "Orders",
      headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.goBack()}/>),
    })}
    />
    <Screen name="OrderScreen" component={OrderScreen} 
      options={({ navigation, route }) => ({ title: "Order",
      headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.goBack()}/>),
    })}
    />
    <Screen name="AboutUsScreen" component={AboutUs} 
      options={({ navigation, route }) => ({ title:  "About Us",
        headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.goBack()}/>),
      })} 
    />
    <Screen name="ShippingInfoScreen" component={ShippingInfo} 
      options={({ navigation, route }) => ({ title:  "Shipping Info",
        headerLeft: () => ( <CustomHeaderImgIcon style={{height:25,width:25}} side="left" iconName={"back"}  onPress={() => navigation.goBack()}/>),
      })} 
    />
  </Navigator>
);