import React from "react";
import { StyleSheet, TouchableOpacity, View, Image,Text } from "react-native";
import { CustomText } from "../../../components";
import { COLORS } from "../../../styles/colors";


export const CategoryItem = ({disabled,id, title,imgUrl,bgColor,goCategoryPageHandler,alignSelf,width,height=0, textStyle = {},containerStyle={} }) => (
  <TouchableOpacity disabled={disabled} onPress={()=>goCategoryPageHandler(id,title)} style={[styles.container,{ width,height,alignSelf,backgroundColor:bgColor,...containerStyle }]}>
    <View style={styles.ImgWrapper}>
        <Image source={{uri:imgUrl}} style={[styles.img,{height:height*0.38}]} resizeMode={"contain"}/>
    </View>
    <View style={styles.txtWrapper}>
        <CustomText weight="italic" style={{ ...styles.title, ...textStyle,}} > {title} </CustomText>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container:{borderRadius: 15,backgroundColor:'gray',marginLeft:10},
  ImgWrapper:{flex:2.2,justifyContent:'center',alignItems:'center',},
  img:{height:50,width:"100%"},
  txtWrapper:{flex:1,alignItems:'center',justifyContent:'flex-start',},
  title: { color: COLORS.colorText,textTransform: "capitalize",fontSize: 13, },

});
