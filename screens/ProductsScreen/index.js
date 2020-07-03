import React from 'react'
import { View,Text,StyleSheet,Button } from 'react-native'

export const ProductsScreen = ({navigation}) => {
    return (
        <View>
            <Text>ProductsScreen</Text>
            <Button title="Go To SingleProduct" onPress={()=>navigation.navigate('SingleProduct')}/>

        </View>
    )
}

const styles= StyleSheet.create({

});