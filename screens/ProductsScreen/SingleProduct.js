import React, {useState, useEffect} from 'react'
import {View, StyleSheet, ScrollView, ActivityIndicator, Image, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';


import {getDataFetchUrl} from '../../api';
import {getUserAccessToken} from '../../store/user';
import {addToFavorites} from "../../store/favorites";
import {getCart, addToCart, updateCartItem} from "../../store/cart";

import {COLORS} from '../../styles/colors';
import {CustomText} from "../../components";
import {AntDesign, Feather, MaterialIcons} from "@expo/vector-icons";

const mapsStateToProps = (state) => ({
    accessToken: getUserAccessToken(state),
    data: getCart(state),
});
const initialState = {
    id: '',
    name: '',
    status: '',
    img: '',
    size: '',
    color: '',
    price: '',
    count: 1,
    img2: '',
    description: '',
    showAddToCart: false,
};

const height = Dimensions.get('window').height;

export const SingleProduct = connect(mapsStateToProps, {
    addToFavorites,
    addToCart,
    updateCartItem
})(({route, navigation, accessToken, data, addToFavorites, addToCart, updateCartItem}) => {
    const [state, setState] = useState(initialState);
    const [loaded, setLoaded] = useState(false);

    const getSingleCategoryData = async (id) => {
        const req = await getDataFetchUrl(`http://petsco.justportfolio.tk/api/products/${id}?api_token=${accessToken}`);
        setState((state) => {
            let status = getProductStatus(req.data.is_new, req.data.discount);
            return ({
                ...state,
                status,
                id: req.data.id,
                name: req.data.name,
                img: req.data.image1,
                size: req.data.size,
                price: req.data.price,
                description: req.data.description,
                img2: req.data.image2,
            });
        });
        setLoaded(true);
    };

    console.log("sad", state);

    useEffect(() => {
        const req = getSingleCategoryData(route.params?.id);

    }, [route]);

    if (!loaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center',}}>
                <ActivityIndicator size="large" color={COLORS.primary}/>
            </View>
        );
    }

    // function for showing the ADD TO CART button part
    const showAddToCartHandler = () => {
        setState({
            ...state,
            showAddToCart: !state.showAddToCart,
        })
    };


    // function for adding item to Cart screen
    const addToCartHandler = () => {
        const duplicate = Boolean(data.cart.find(item => item.id === state.id));
        duplicate ?
            updateCartItem({
                id: state.id,
                name: state.name,
                status: state.status,
                img: state.img,
                size: state.size,
                color: state.color,
                price: state.price,
                count: state.count,
            })
            :
            addToCart({
                id: state.id,
                name: state.name,
                status: state.status,
                img: state.img,
                size: state.size,
                color: state.color,
                price: state.price,
                count: state.count,
            });
        showAddToCartHandler();
        navigation.navigate("Home");
    };

    // function for adding item to Favorites screen
    const addToFavoritesHandler = () => {
        addToFavorites({
            id: state.id,
            name: state.name,
            status: state.status,
            img: state.img,
            size: state.size,
            color: state.color,
            price: state.price,
            count: state.count,
        });
    };

    const INCREASE = () => {
        setState({
            ...state,
            count: state.count + 1
        });
    };

    const DECREASE = () => {
        if (state.count === 1) {
            return;
        } else {
            setState({
                ...state,
                count: state.count - 1
            });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.PagescrollContainer}>
                <View style={[styles.productImgCotainer, {height: height * 0.5}]}>
                    <View style={styles.imgWrapper}>
                        <Image source={{uri: state.img}} style={{height: height * 0.3, width: "100%"}}
                               resizeMode={"contain"}/>
                    </View>
                    <View style={styles.productImgFooterWrapper}>
                        <CustomText weight='italic'
                                    style={{color: COLORS.primary, fontSize: 18,}}>{state.price} LE</CustomText>
                        <View style={styles.productImgFooterWrapperIcons}>
                            <TouchableOpacity onLongPress={() => showAddToCartHandler()}>
                                <Feather name="shopping-cart" size={24} color={COLORS.primary}/>
                            </TouchableOpacity>
                            <TouchableOpacity onLongPress={() => addToFavoritesHandler()}>
                                <MaterialIcons name="favorite-border" size={24} color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.addToCart, {display: state.showAddToCart ? "flex" : "none"}]}>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => DECREASE()}>
                        <AntDesign name="minuscircle" size={22} color="white"/>
                    </TouchableOpacity>
                    <CustomText weight="medium" style={{fontSize: 16, color: "white"}}>{state.count}</CustomText>
                    <TouchableOpacity onPress={() => INCREASE()}>
                        <AntDesign name="pluscircle" size={22} color="white"/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addToCartBtn} onPress={() => addToCartHandler()}>
                    <CustomText weight="medium"
                                style={{fontSize: 16, color: "#0a1063"}}>
                        ADD TO CARD
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },

    PagescrollContainer: {
        backgroundColor: '#F3FBEE',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    productImgCotainer: {
        height: 300,
        backgroundColor: COLORS.colorText,
        borderRadius: 30,
        margin: 20,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4,},
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    imgWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    productImgFooterWrapper: {
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItem: "center",
        borderTopWidth: 1,
        borderColor: COLORS.primary,
        padding: 10,
    },

    productImgFooterWrapperIcons: {
        width: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItem: "center",
    },

    addToCart: {
        width: "100%",
        height: 140,
        backgroundColor: '#0a1063',
        paddingHorizontal: 45,
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: 'space-between',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
    },

    counter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 80,
        height: 30,
    },

    addToCartBtn: {
        width: 150,
        height: 30,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
    },

});

function getProductStatus(newState, discountState) {
    if (newState === '1') {
        return "New";
    } else {
        if (discountState) {
            return `${discountState}%`;
        } else {
            return '';
        }
    }
}

  