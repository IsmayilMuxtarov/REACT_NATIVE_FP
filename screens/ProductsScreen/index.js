import React from 'react'
import { View,Text,StyleSheet,Button } from 'react-native'

export const ProductsScreen = ({route,navigation,}) => {
    console.log("route",route)
    return (
        <View>
            <Text>ProductsScreen</Text>
            {/* <Text>{route.params.fetchUrl} / </Text>
            <Text>{route.params.title}</Text> */}

            <Button title="Go To SingleProduct" onPress={()=>navigation.navigate('SingleProduct')}/>

        </View>
    )
}

const styles= StyleSheet.create({

});