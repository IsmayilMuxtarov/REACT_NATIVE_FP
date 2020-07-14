import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { IMAGES } from "../styles/images";


export const CustomHeaderImgIcon = ({ iconName, onPress, side, style,disabled=false }) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}
    style={[styles.container,{marginRight: side === "right" ? 20 : 0,marginLeft: side === "left" ? 20 : 0,},style,]}
  >
    <Image resizeMode="contain" style={styles.btnImg} source={IMAGES[iconName] || ""}/>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {height: 42,width: 80,justifyContent:'flex-start'},
  btnImg: {height: "100%",width: "100%",},
});
