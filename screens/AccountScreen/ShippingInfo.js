import React from 'react'
import {View, StyleSheet, Image, Dimensions} from 'react-native'
import {CustomText} from "../../components";
import {COLORS} from "../../styles/colors";

export const ShippingInfo = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentHead}>
                    <View style={styles.headTitle}>
                        <CustomText weight="medium" style={{fontSize: 20,}}>Shipping Info</CustomText>
                        <View style={styles.titleLine}/>
                    </View>
                    <View>
                        <CustomText weight="light" style={{marginBottom: 4}}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </CustomText>
                        <CustomText weight="light">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </CustomText>
                    </View>
                </View>
                <View style={styles.contentBottom}>
                    <View style={styles.contentBottomText}>
                        <CustomText weight='medium' style={{color: "#0a1063"}}>Rewards</CustomText>
                    </View>
                    <View style={styles.bottomView}>
                        <View>
                            <CustomText weight='medium' style={{color: "white"}}>540 Points = 54 LE</CustomText>
                            <CustomText weight='light'
                                        style={{color: "white", marginTop: 10, fontStyle: "italic", fontSize: 12,}}>
                                Express on 30 Mar 2020
                            </CustomText>
                        </View>
                        <Image style={styles.bottomImg}
                               ImageResizeMode='cover'
                               source={{uri: "https://cdn0.iconfinder.com/data/icons/logistic-52/64/Bike-delivery-motorbike-package-512.png"}}/>
                    </View>
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

    contentHead: {
        justifyContent: "center",
        alignItems: "center",
    },

    headTitle: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },

    titleLine: {
        width: 80,
        height: 2,
        backgroundColor: COLORS.primary,
        position: "absolute",
        bottom: -10,
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
        bottom: -4,
    }
});


