import React from "react";
import { StyleSheet, TouchableOpacity, View,Text,Image, Dimensions } from "react-native";
import { COLORS } from "../../../styles/colors";
import { IMAGES } from "../../../styles/images";
import { CustomText } from "../../../components";

const appHeight = Dimensions.get("window").height;

export const PetsType = ({type,currentType,fieldsChangeHandler,imageSource,bgColor}) => {
  return(
    <View style={[styles.typeWrapper,{height: type === currentType ? "100%" : appHeight*0.12,backgroundColor:bgColor}]} >
      <TouchableOpacity onPress={()=>fieldsChangeHandler('type',type)} style={styles.touchableWrapper} >
        <Image source={imageSource} resizeMode={"contain"} style={styles.typeImg}/>
        <CustomText weight="medium" style={styles.typeText}>{type}</CustomText>
      </TouchableOpacity> 
    </View>
)
};

const styles = StyleSheet.create({
  typeWrapper:{height:100,width:'17%',borderRadius:50},
  touchableWrapper:{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'},
  typeImg:{width:50,height:appHeight*0.05},
  typeText:{color:COLORS.colorText,}
});
