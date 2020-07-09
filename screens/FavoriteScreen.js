import React from 'react'
import {View, FlatList, StyleSheet} from 'react-native'
import {connect} from "react-redux";

import {CartFavsItem} from "../components";
import {getFavorites} from "../store/favorites";


const mapStateToProps = (state) => ({
    data: getFavorites(state)
});


export const FavoriteScreen = connect(mapStateToProps)((props) => {
    const favorites = props.data.favorites;
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={favorites}
                renderItem={({item}) => {
                    return (
                        <CartFavsItem itemID={item.id}
                                      key={item.id}
                                      name={item.name}
                                      status={item.status}
                                      img={item.img}
                                      size={item.size}
                                      color={item.color}
                                      price={item.price}
                                      count={item.count}
                        />
                    );
                }}
            />
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: '#f2f2f2',
        paddingTop: 20,

    },
    list: {
        paddingTop: 25,
        paddingBottom: 50,
    }
});