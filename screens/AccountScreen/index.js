// import React from 'react'
// import { View,Text,StyleSheet,Button } from 'react-native'

// export const AccountScreen = ({navigation}) => {
//     return (
//         <View>
//             <Text>AccountScreen</Text>
//             <Button title="Pets screen" onPress={()=>navigation.navigate('PetsScreen')} />
//             <Button title="Address screen" onPress={()=>navigation.navigate('AddressScreen')} />
//             <Button title="Orders screen" onPress={()=>navigation.navigate('OrdersScreen')} />
//         </View>
//     )
// }

// const styles= StyleSheet.create({

// });
import React from 'react'
import {View, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native'
import {CustomText} from "../../components";
import {AccountContent} from "./components";
import {COLORS} from "../../styles/colors";
import { CustomLayout } from '../../commons';

export const AccountScreen = ({navigation}) => {
    return (
        <CustomLayout style={styles.container}>
            <View style={styles.content}>
                <View style={styles.head}>
                    <View style={styles.headContainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate('AddressScreen')} >
                            <Image style={styles.img}
                                   ImageResizeMode='cover'
                                   source={{uri: "https://choicebroadband.co.nz/wp-content/uploads/2019/10/pic2.jpg"}}/>
                        </TouchableOpacity>
                        <CustomText weight='medium' style={{color: "#0a1063"}}>My Address</CustomText>
                    </View>
                    <View style={styles.headContainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate('PetsScreen')}>
                            <Image style={styles.img}
                                   ImageResizeMode='cover'
                                   source={{uri: "https://image.freepik.com/free-vector/_39961-391.jpg"}}/>
                        </TouchableOpacity>
                        <CustomText weight='medium' style={{color: "#0a1063"}}>My Pets</CustomText>
                    </View>
                    <View style={styles.headContainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate('OrdersScreen')}>
                            <Image style={styles.img}
                                   ImageResizeMode='cover'
                                   source={{uri: "https://previews.123rf.com/images/magurok/magurok1704/magurok170400061/76041725-hand-holding-checklist-and-hand-holding-pen-sheet-of-paper-with-check-marks-tick-icons-filling-form-.jpg"}}/>
                        </TouchableOpacity>
                        <CustomText weight='medium' style={{color: "#0a1063"}}>My Orders</CustomText>
                    </View>
                </View>
                <AccountContent navigation={navigation}/>
                <View style={styles.contentBottom}>
                    <View style={styles.contentBottomText}>
                        <CustomText weight='medium' style={{color: "#0a1063"}}>Rewards</CustomText>
                    </View>
                    <View style={styles.bottomView}>
                        <View>
                            <CustomText weight='medium' style={{color: "white"}}>10 Points = 1 Euro</CustomText>
                            <CustomText weight='light'
                                        style={{color: "white", marginTop: 10, fontStyle: "italic", fontSize: 12,}}>
                                Express on 30 July 2020
                            </CustomText>
                        </View>
                        <Image style={styles.bottomImg}
                               ImageResizeMode='cover'
                               source={{uri: "https://turbinu.ru/wp-content/uploads/2018/05/podarok.png"}}/>
                    </View>
                </View>
            </View>
        </CustomLayout>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 70,
        backgroundColor: "#f2f2f2",
    },

    content: {
        position: "relative",
        height: "100%",
        width: Dimensions.get('window').width - 40,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        // Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

    head: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },

    headContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    img: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },

    contentBottom: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 35,
    },

    contentBottomText: {
        width: "100%",
        paddingLeft: 5,
    },

    bottomView: {
        position: "relative",
        height: 80,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 5,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },

    bottomImg: {
        position: "absolute",
        width: 100,
        height: 100,
        right: 0,
        bottom: -2,
    }
});
