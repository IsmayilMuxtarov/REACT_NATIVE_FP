import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";


import {CustomText} from "../../../components";

import {AntDesign} from '@expo/vector-icons';

export const AccountContent = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <CustomText weight="regular" style={{color: "#0a1063"}}>Shipping Info</CustomText>
                <TouchableOpacity onPress={()=> navigation.navigate('ShippingInfo')}>
                    <AntDesign name="rightcircle" size={22} color="#0a1063"/>
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <CustomText weight="regular" style={{color: "#0a1063"}}>Account settings</CustomText>
                <TouchableOpacity>
                    <AntDesign name="rightcircle" size={22} color="#0a1063"/>
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <CustomText weight="regular" style={{color: "#0a1063"}}>Help & Support</CustomText>
                <TouchableOpacity>
                    <AntDesign name="rightcircle" size={22} color="#0a1063"/>
                </TouchableOpacity>
            </View>
        </View>
    )
};

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