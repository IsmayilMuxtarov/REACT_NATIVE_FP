import React, {useState} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

import {AntDesign} from '@expo/vector-icons';

import {CustomText} from "./CustomText";
import {COLORS} from "../styles/colors";
import {increaseCartItemCount, decreaseCartItemCount} from "../store/cart";


export const CartCounter = connect(null, {
    increaseCartItemCount,
    decreaseCartItemCount
})(({count, itemID, increaseCartItemCount, decreaseCartItemCount}) => {
    const [countNum, setCountNum] = useState(count);

    const INCREASE = () => {
        setCountNum(countNum + 1);
        increaseCartItemCount({
            id: itemID,
        })
    };

    const DECREASE = () => {
        if (countNum === 1) {
            return;
        } else {
            setCountNum(countNum - 1);
            decreaseCartItemCount({
                id: itemID,
            })
        }
    };

    return (
        <View style={styles.counter}>
            <TouchableOpacity onPress={() => DECREASE()}>
                <AntDesign name="minuscircle" size={22} color={COLORS.primary}/>
            </TouchableOpacity>
            <CustomText weight="medium" style={{fontSize: 16,}}>{countNum}</CustomText>
            <TouchableOpacity onPress={() => INCREASE()}>
                <AntDesign name="pluscircle" size={22} color={COLORS.primary}/>
            </TouchableOpacity>

        </View>
    )
});

const styles = StyleSheet.create({
    counter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 80,
    },
});