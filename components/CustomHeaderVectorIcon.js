import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { IMAGES } from "../styles/images";
import { AntDesign } from '@expo/vector-icons'; 


export const CustomHeaderVectorIcon = ({ iconName, iconSize=22, iconColor="white", onPress, side="right", style={}, disabled=false }) => (
  <TouchableOpacity disabled={disabled}  onPress={onPress} style={[styles.container,style]}>
    <AntDesign name={iconName} size={iconSize} color={iconColor} />
  </TouchableOpacity>


  // <TouchableOpacity disabled={disabled} onPress={onPress}
  //   style={[styles.container,{marginRight: side === "right" ? 20 : 0,marginLeft: side === "left" ? 20 : 0,},style,]}
  // >
);

const styles = StyleSheet.create({
  container: {height: 20,width: 20,justifyContent:'center',alignItems:'center'},
  btnImg: {height: "100%",width: "100%",},
});
