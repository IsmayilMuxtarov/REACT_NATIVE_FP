import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

export const CustomBtn = ({ title, onPress, width,minWidth,alignSelf, textStyle = {}, btnStyle ={}, children }) => (
  <TouchableOpacity onPress={onPress} style={{ width,minWidth,alignSelf }}>
    <View style={[styles.btn, btnStyle,]}>
      {children}
      <CustomText weight="regular" style={{ ...styles.title, ...textStyle,}} > {title} </CustomText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {borderRadius: 10,backgroundColor: COLORS.primary,flexDirection:'row',justifyContent: "center",alignItems: "center",},
  title: { color: COLORS.colorText,textTransform: "capitalize",fontSize: 15, },
});
