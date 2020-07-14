import React from 'react'
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import {COLORS} from "../styles/colors";


export const GetColor = ({changeState, colorMatching}) => {
    return (
        <View style={styles.colors}>
            <TouchableOpacity onPress={() => changeState("color", "Purple")}>
                <View style={[styles.color1, {opacity: colorMatching("color", "Purple") ? 1 : 0.5}]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeState("color", "Red")}>
                <View style={[styles.color2, {opacity: colorMatching("color", "Red") ? 1 : 0.5}]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeState("color", "Yellow")}>
                <View style={[styles.color3, {opacity: colorMatching("color", "Yellow") ? 1 : 0.5}]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeState("color", "Blue")}>
                <View style={[styles.color4, {opacity: colorMatching("color", "Blue") ? 1 : 0.5}]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeState("color", "Green")}>
                <View style={[styles.color5, {opacity: colorMatching("color", "Green") ? 1 : 0.5}]}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    colors: {
        width: Dimensions.get('window').width - 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
    },

    color1: {
        marginLeft: 30,
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.color1,
    },

    color2: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.color2,
    },

    color3: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.color3,
    },

    color4: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.color4,
    },

    color5: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.color5,
    },
});