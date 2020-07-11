import React from 'react';
import {StyleSheet, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";

import {Feather, MaterialIcons, FontAwesome} from '@expo/vector-icons';

import {COLORS} from "../styles/colors";
import {CustomText, CartCounter} from "../components";
import {deleteItemFromCart, addToCart} from "../store/cart";
import {deleteItemFromFavorites, addToFavorites} from "../store/favorites";
import {textShortening} from '../utils'


export const CartFavsItem = connect(null, {deleteItemFromCart, addToCart, deleteItemFromFavorites, addToFavorites})((
    {
        itemID,
        name,
        status,
        img,
        size,
        color,
        price,
        count,
        cartScreen = false,
        productsScreen = false,
        deleteItemFromCart,
        addToCart,
        deleteItemFromFavorites,
        addToFavorites
    }) => {

    // function for adding item to Cart screen
    const addToCartHandler = () => {
        addToCart({
            screenName: 'cart',
            id: itemID,
            name: name,
            status: status,
            img: img,
            size: size,
            color: color,
            price: price,
            count: count
        });
    };
    // function for adding item to Favorites screen
    const addToFavoritesHandler = () => {
        addToFavorites({
            screenName: 'cart',
            id: itemID,
            name: name,
            status: status,
            img: img,
            size: size,
            color: color,
            price: price,
            count: count
        });
    };

    // function for deleting item from Cart and Favorites screen
    const deleteItemHandler = () => {
        cartScreen ?
            deleteItemFromCart({
                id: itemID
            })
            :
            deleteItemFromFavorites({
                id: itemID
            });
    };

    // function for defining the status of the item
    const whichStatus = (status) => {
        if (status === "New") {
            return COLORS.primary
        }
        if (status === "") {
            return "white"
        } else {
            return "red"
        }
    };

    return (
        <TouchableOpacity style={styles.item}>
            <View style={[styles.leftSide, {backgroundColor: whichStatus(status)}]}>
                <CustomText weight='regular'
                            style={{
                                color: "white",
                                transform: [{rotate: '-90deg'}],
                                fontSize: 14
                            }}>{status}</CustomText>
            </View>
            <View style={styles.middle}>
                <Image style={styles.img}
                       ImageResizeMode='cover'
                       source={{uri: img}}/>
            </View>
            <View style={styles.rightSide}>
                <View>
                    <CustomText weight='medium'
                                style={{fontSize: 14, marginBottom: 7}}>{textShortening(name, 20,)}</CustomText>
                    <CustomText weight='regular' style={{fontSize: 11, marginBottom: 7, fontStyle: 'italic'}}>
                        Size: {size}. Color: {color}
                    </CustomText>
                    <CustomText weight='italic' style={{color: COLORS.primary,}}>{price} LE</CustomText>
                </View>
                <View style={styles.line}/>
                <View style={styles.icons}>
                    {
                        cartScreen ?
                            <CartCounter itemID={itemID} count={count}/>
                            : <TouchableOpacity onLongPress={() => addToCartHandler()}>
                                <Feather name="shopping-cart" size={22} color={COLORS.primary}/>
                            </TouchableOpacity>
                    }
                    {
                        productsScreen ?
                            <TouchableOpacity onLongPress={() => addToFavoritesHandler()}>
                                <MaterialIcons name="favorite-border" size={22} color={COLORS.primary}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onLongPress={() => deleteItemHandler()}>
                                <FontAwesome name="trash-o" size={22} color="red"/>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
        ;
});

const styles = StyleSheet.create({
    item: {
        width: Dimensions.get('window').width - 30,
        height: 120,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },

    leftSide: {
        width: "9%",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },

    middle: {
        width: "27%",
        height: '100%',
        backgroundColor: 'white',
        padding: 20,
    },

    img: {
        width: "100%",
        height: "100%",
    },

    rightSide: {
        width: '65%',
        height: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 17,
        paddingRight: 15,
        paddingBottom: 5,
    },

    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#EEE',
        borderRadius: 3,
        marginTop: 2,
        marginBottom: 5,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});