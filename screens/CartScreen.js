import React from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";

import {CartFavsItem, CustomText} from "../components";
import {getCart} from "../store/cart";
import { CustomLayout } from '../commons';


const mapStateToProps = (state) => ({
    data: getCart(state)
});


export const CartScreen = connect(mapStateToProps)(({data,navigation}) => {
    console.log("catr data___________________________",data);
    // function for getting the sum of the items cost
    const getTotalCost = () => {
        let totalSum = 0;
        data.cart.map((item) => {
            const discount = parseInt(item.status);
            if (!isNaN(discount)) {
                totalSum = totalSum + (((item.price * discount) / 100) * item.count);
            } else {
                totalSum = totalSum + (item.price * item.count);
            }
        });
        return totalSum;
    };

    return (
        <CustomLayout style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                data={data.cart}
                renderItem={({item}) => {
                    return (
                        <CartFavsItem itemID={item.id}
                                      cartScreen={true}
                                      key={item.id}
                                      name={item.name}
                                      status={item.status}
                                      img={item.img}
                                      size={item.size}
                                      color={item.color}
                                      price={item.price}
                                      count={item.count}/>
                    );
                }}
                keyExtractor={(item,index) => (`${item.id}asd`).toString()}
            />
            <View style={styles.checkOut}>
                <View>
                    <CustomText weight="medium" style={{fontSize: 18, color: "white"}}>Total</CustomText>
                    <CustomText weight="light"
                                style={{fontSize: 18, color: "white", marginTop: 5}}>{getTotalCost()} LE</CustomText>
                    <CustomText weight="light"
                                style={{fontSize: 14, color: "white", marginTop: 5, fontStyle: "italic"}}>
                        Free shipping
                    </CustomText>
                </View>
                <TouchableOpacity  style={styles.checkOutBtn} onPress={()=>{navigation.navigate('AddressScreenCheckout',{from:"checkout"})}}>
                    <CustomText weight="medium"
                                style={{fontSize: 18, color: "#0a1063"}}>
                        Checkout
                    </CustomText>
                </TouchableOpacity>
            </View>
        </CustomLayout>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingTop: 20,

    },
    list: {
        paddingTop: 25,
        paddingBottom: 135,
    },
    checkOut: {
        width: "100%",
        height: 160,
        backgroundColor: '#0a1063',
        paddingHorizontal: 45,
        paddingBottom: 70,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
    },

    checkOutBtn: {
        width: 140,
        height: 37,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    }

});