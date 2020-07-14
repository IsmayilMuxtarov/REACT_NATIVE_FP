import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { CustomLayout } from '../../commons';


import { connect } from 'react-redux';
import { getUserOrders } from '../../store/user';
const mapStateToProps = (state) => ({orders:getUserOrders(state)});
  
export const OrderScreen = connect(mapStateToProps)(({orders}) => {
    console.log("object",orders);
    return (
        <View>
            <Text>OrderScreen</Text>
        </View>
    )
});


const styles = StyleSheet.create({

});