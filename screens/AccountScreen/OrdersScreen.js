import React from 'react';
import { View, Text,StyleSheet,FlatList } from 'react-native';
import { CustomLayout } from '../../commons';
import { COLORS } from '../../styles/colors';
import { CustomText } from '../../components';


import { connect } from 'react-redux';
import { getUserOrders } from '../../store/user';
import { textShortening } from '../../utils';
const mapStateToProps = (state) => ({orders:getUserOrders(state)});
  
export const OrdersScreen = connect(mapStateToProps)(({orders}) => {
    console.log("object",orders);
    return (
        <CustomLayout style={{flex: 1,backgroundColor: COLORS.color7,paddingHorizontal:30,}}>
             <FlatList
                    style={{flex:1,}}
                    showsVerticalScrollIndicator={false}
                    data={orders}
                    renderItem={({item,index})=>{
                        return (
                            <View  style={{width:'100%',backgroundColor:COLORS.colorText,borderRadius:10,paddingHorizontal:20,paddingVertical:20,marginBottom:20,}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                                    <CustomText weight="medium" style={{fontSize:15,color:COLORS.primary}}>{item.total} {item.price}</CustomText>
                                    <CustomText weight="regular" style={{fontSize:15,color:COLORS.secondary}}>{`#asasa${index}`}</CustomText>
                                </View>
                                <CustomText weight="light" style={{fontSize:13,color:COLORS.secondary,}}> {`No. of items: ${item.count}`}</CustomText>
                                <CustomText weight="light" style={{fontSize:13,color:COLORS.secondary,marginVertical:5}}> {`Address: ${textShortening(item.address,29)}`}</CustomText>
                            
                            </View>
                        )
                    }}
                    keyExtractor={(item,index) => (item.id).toString()}
                />
        </CustomLayout>
    )
});


const styles = StyleSheet.create({

});