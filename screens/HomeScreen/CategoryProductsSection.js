import React from 'react'
import { View, Text,StyleSheet, } from 'react-native'
import { CustomText, CustomBtn } from '../../components'
import { COLORS } from '../../styles/colors'
import { FONT_FAMILIES } from '../../styles/fonts'
import { ProductItem } from './components'
import { FlatList } from 'react-native-gesture-handler'

export const CategoryProductsSection = ({title,btnTitle,productData,fetchUrl,goSingleProductHandler,goProductsHandler}) => {
    // console.log(productData)
    return (
        <View style={styles.container}>
            <View style={styles.txtWrapper}>
                <CustomText weight="regular" style={styles.textStyle}>{title}</CustomText>
                <CustomBtn onPress={()=>goProductsHandler(fetchUrl,title)} width="20%" title={btnTitle} btnStyle={styles.btnStyle} textStyle={styles.btnTextStyle}/>
            </View>
            <View style={styles.productsWrapper}>
                <FlatList
                    style={styles.productsFlatlistContainer}
                    showsHorizontalScrollIndicator={false}
                    data={productData}
                    horizontal={true}
                    renderItem={({item,index})=>{
                        return (  <ProductItem item={item} goSingleProductHandler={goSingleProductHandler}/>)
                    }}
                    keyExtractor={(item,index) => item.id.toString()}
                /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{backgroundColor:'#F3FBEE',borderRadius:35,marginBottom:60,paddingVertical:20,marginHorizontal:20,},
    txtWrapper:{flexDirection:'row',paddingHorizontal:16,justifyContent:'space-between',alignItems:'center'},
    textStyle:{color:COLORS.secondary,fontSize:20,},
    btnStyle:{backgroundColor:'#F3FBEE',justifyContent:'flex-end'},
    btnTextStyle:{color:COLORS.primary,fontSize:13,textTransform:'uppercase',fontFamily:FONT_FAMILIES.medium},
    productsWrapper:{height:230,justifyContent:'center',marginTop:20,},
    productsFlatlistContainer:{height:250,paddingHorizontal:5,backgroundColor:'#F3FBEE',}

});
