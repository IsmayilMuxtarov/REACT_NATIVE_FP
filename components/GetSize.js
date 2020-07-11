import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import {COLORS} from "../styles/colors";
import {CustomText} from "./CustomText";


export const GetSize = ({changeState, sizeMatching}) => {
    return (
        <View style={styles.sizes}>
            <TouchableOpacity onPress={() => changeState("size", "small")}>
                <View style={[styles.size1, {opacity: sizeMatching("size", "small") ? 1 : 0.5}]}>
                    <CustomText weight="medium" style={{color: "white"}}>small</CustomText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeState("size", "medium")}>
                <View style={[styles.size2, {opacity: sizeMatching("size", "medium") ? 1 : 0.5}]}>
                    <CustomText weight="medium" style={{color: "white"}}>medium</CustomText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeState("size", "big")}>
                <View style={[styles.size3, {opacity: sizeMatching("size", "big") ? 1 : 0.5}]}>
                    <CustomText weight="medium" style={{color: "white"}}>big</CustomText>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    sizes: {
        width: Dimensions.get('window').width - 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 40,
    },

    size1: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 30,
        width: 80,
        height: 30,
        borderRadius: 20,
        backgroundColor: COLORS.color1,
    },

    size2: {
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        borderRadius: 20,
        backgroundColor: COLORS.color2,
    },

    size3: {
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        borderRadius: 20,
        backgroundColor: COLORS.color4,
    },

});