import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { CustomLayout } from "../commons";
import { COLORS } from "../styles/colors";
import { CustomText, CustomBtn } from "../components";
import { textShortening } from "../utils";
import { FONT_FAMILIES } from "../styles/fonts";

import { connect } from "react-redux";
import { getCart } from "../store/cart";
import { getUserAddress, addUserOrders, getUserOrders, getUserAccessToken } from "../store/user";
import store from "../store";
import { updateUserData } from "../api";

const mapStateToProps = (state) => ({
  catsData: getCart(state).cart,
  selectedAddress: getUserAddress(state).filter(item=>item.isSelect===true),
  accessToken:getUserAccessToken(state), 
});

export const PlaceOrderScreen = connect(mapStateToProps,{addUserOrders})(({navigation,selectedAddress,catsData,accessToken,addUserOrders}) => {

  const placeOrderHandler =async (total)=>{
    addUserOrders({count:catsData.length,total,address:selectedAddress[0].text,products:catsData});
    const result = await updateUserData(accessToken,{userOrders:{orders:getUserOrders(store.getState())}});
    if(result.data){navigation.navigate('Home')} else{alert('Something go wrong');}
  }
  return (
    <CustomLayout style={styles.container}>
       <FlatList
          ListHeaderComponent={()=>(<CustomText weight="light" style={{color:COLORS.secondary,fontSize:15,marginBottom:10}}> Products</CustomText>)}
          // ListHeaderComponentStyle={{}}
          style={{flex:1}}
          data={catsData}
          renderItem={({item,index})=>{
              return (
                <View style={{width:'100%',height:80,borderRadius:10,paddingHorizontal:20,paddingVertical:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderColor:COLORS.secondary}}>
                  <Image source={{uri:item.img}} resizeMode={'contain'} style={{width:"25%",height:60,}}/>
                  <View style={{height:'100%',width:'75%',justifyContent:'space-evenly'}}>
                      <View >
                          <CustomText weight="italic" style={{color:COLORS.secondary,fontSize:15}}>{textShortening(item.name,25)}</CustomText>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <CustomText weight="italic" style={{color:COLORS.secondary,fontSize:10}}>{`Size:${item.size}  Color: ${item.color}   Qty: ${item.count}`}</CustomText>
                          <CustomText weight="medium" style={{color:COLORS.primary,fontSize:13}}>{item.price}</CustomText>
                      </View>
                  </View>
                </View>
              )
          }}
          ListFooterComponent={()=>{
            const subTotal = getTotalCost(catsData);
            const total = subTotal + 10;
            return(
              <>
              <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                <CustomText weight="italic" style={{color:COLORS.secondary,fontSize:13}}>Subtotal</CustomText>
                <CustomText weight="medium" style={{color:COLORS.primary,fontSize:13}}>{subTotal}</CustomText>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:4,marginBottom:10}}>
                <CustomText weight="italic" style={{color:COLORS.secondary,fontSize:13}}>Shiping Fee</CustomText>
                <CustomText weight="medium" style={{color:COLORS.primary,fontSize:13}}>10</CustomText>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <CustomText weight="italic" style={{color:COLORS.secondary,fontSize:16}}>Total</CustomText>
                <CustomText weight="medium" style={{color:COLORS.primary,fontSize:16}}>{total}</CustomText>
              </View>
              <CustomBtn onPress={()=>placeOrderHandler(subTotal,total)} title="Place Order" width={"40%"} alignSelf="center" textStyle={{fontFamily:FONT_FAMILIES.medium,fontSize:20,textTransform:"none",}}  btnStyle={{backgroundColor:COLORS.primary,marginTop:15,height:30,borderRadius:5}}  />

              </>
            )
          }}
          ListFooterComponentStyle={{flex:1,justifyContent:"center",marginTop:20,paddingHorizontal:8,}}

          keyExtractor={(item,index) => (item.id).toString()}
        />
    </CustomLayout>
  );
});
const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor: COLORS.colorText,paddingHorizontal:30,},

})

const getTotalCost = (cart) => {
  let totalSum = 0;
  cart.map((item) => {
      const discount = parseInt(item.status);
      if (!isNaN(discount)) {
          totalSum = totalSum + (((item.price * discount) / 100) * item.count);
      } else {
          totalSum = totalSum + (item.price * item.count);
      }
  });
  return totalSum;
};