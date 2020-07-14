import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";

import {CustomText} from "../../../components";
import {AntDesign} from '@expo/vector-icons';

import { connect } from "react-redux";
import { userLogOut } from "../../../store/user";



export const AccountContent = connect(null,{userLogOut})(({navigation,userLogOut}) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <CustomText weight="regular" style={{color: "#0a1063"}}>Shipping Info</CustomText>
                <TouchableOpacity onPress={()=> navigation.navigate('ShippingInfoScreen')}>
                    <AntDesign name="rightcircle" size={22} color="#0a1063"/>
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <CustomText weight="regular" style={{color: "#0a1063"}}>About Us</CustomText>
                <TouchableOpacity onPress={()=> navigation.navigate('AboutUsScreen')}>
                    <AntDesign name="rightcircle" size={22} color="#0a1063"/>
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <CustomText weight="regular" style={{color: "#0a1063"}}>Log Out</CustomText>
                <TouchableOpacity onPress={()=>userLogOut()} > 
                    <AntDesign name="rightcircle" size={22} color="#0a1063"/>
                </TouchableOpacity>
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    item: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#d2f2f0',
        borderRadius: 10,

    }
});