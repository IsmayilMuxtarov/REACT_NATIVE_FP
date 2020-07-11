import React from 'react'
import {View, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native'

export const AccountScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.head}>
                    <TouchableOpacity>
                        <Image style={styles.img}
                               ImageResizeMode='cover'
                               source={{uri: "https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.img}
                               ImageResizeMode='cover'
                               source={{uri: "https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.img}
                               ImageResizeMode='cover'
                               source={{uri: "https://www.packagingstrategies.com/ext/resources/ISSUES/2019/04-April/34-MacAndMaya.jpg"}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 70,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: 'red',
    },

    content: {
        height: "100%",
        width: Dimensions.get('window').width - 40,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },

    head: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },

    img: {
        width: 80,
        height: 80,
        borderRadius: 50,
    }
});