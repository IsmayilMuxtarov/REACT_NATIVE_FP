import React from 'react'
import {View,StyleSheet,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { COLORS } from '../styles/colors';

export const CustomLayout = ({children,wrapperStyle={},containerStyle={}}) => {
    return (
        <View style={[styles.wrapperContainer,wrapperStyle]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container,containerStyle]}>{children}</View>
            </TouchableWithoutFeedback>
        </View>
        
    )
}
const styles = StyleSheet.create({
    wrapperContainer:{backgroundColor:COLORS.primary,flex:1,paddingTop:20,},
    container:{backgroundColor:COLORS.colorText,flex:1,borderTopStartRadius:30,borderTopEndRadius:30,padding:20},
});
