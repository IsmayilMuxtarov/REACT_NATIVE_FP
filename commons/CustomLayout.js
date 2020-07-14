import React from 'react'
import {View,StyleSheet,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { COLORS } from '../styles/colors';

export const CustomLayout = ({children,style={}}) => {
    return (
        <View style={styles.pageContainer}>
            <View style={[styles.pageWrapper,style]}>{children}</View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    pageContainer: {flex:1,backgroundColor: COLORS.primary,},
    pageWrapper:{backgroundColor:COLORS.colorText,borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:25,},
});
