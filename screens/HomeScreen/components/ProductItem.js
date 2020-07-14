import React from 'react'
import { View, Text,StyleSheet, Image } from 'react-native'
import { COLORS } from '../../../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CustomText } from '../../../components'
import { textShortening } from '../../../utils'
import { IMAGES } from '../../../styles/images'

export const ProductItem = ({goSingleProductHandler,item,}) => {
    const headerStyle = getHeaderColor(item.is_new,item.discount);
    
    return (
        <TouchableOpacity  onPress={()=>goSingleProductHandler(item.id,item.name)} style={styles.container}>
                <View style={[styles.promotionStyle,{backgroundColor:headerStyle.bgColor,}]}>
                    <CustomText weight="bold" style={{color:'#ffffff'}}>{headerStyle.text}</CustomText>
                </View>
                {/* <Image  style={styles.img} source={{uri:item.image1}} resizeMode={"contain"}/> */}
                <Image  style={styles.img} source={IMAGES.product} resizeMode={"contain"}/>
                <CustomText weight="medium" style={styles.title} > {textShortening(item.name,30)} </CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{borderRadius: 15,backgroundColor:COLORS.colorText,width:130,height:210,marginLeft:10,},
    promotionStyle:{borderTopRightRadius:15,borderTopLeftRadius:15,width:'100%',justifyContent:'center',alignItems:'center',height:30,},
    img:{height:100,width:"100%",marginVertical:10,},
    title: { color: COLORS.secondary,textTransform: "capitalize",fontSize: 13,textAlign:'center', },
  });
  
  function getHeaderColor(newState,discountState){ 
    if(newState === '1'){
        return {txtColor:COLORS.colorText,bgColor:COLORS.color1,text:'New'}
    }else{
        if(discountState){return {txtColor:COLORS.colorText,bgColor:COLORS.color2,text:`${discountState}% SALE`}}
        else{return {txtColor:COLORS.colorText,bgColor:COLORS.colorText,text:''}}
    }
  }
  