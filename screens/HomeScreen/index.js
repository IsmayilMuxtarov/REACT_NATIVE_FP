import React from 'react'
import { View,Text,StyleSheet,Button } from 'react-native'
import { CustomText, CustomBtn } from '../../components';
import { FONT_FAMILIES } from '../../styles/fonts';
import { Ionicons } from '@expo/vector-icons';

import { userLogOut } from '../../store/user';
import { connect } from 'react-redux';

export const HomeScreen = connect(null,{userLogOut})(({navigation,userLogOut}) => {
    return (
        <View style={styles.container}>
            <CustomText weight={'bold'}>HomeScreen</CustomText>
            <Text>HomeScreens</Text>
            <CustomBtn textStyle={styles.textStyle} title="dasdas" btnStyle={styles.btnStyle}  >
                <Ionicons name="md-checkmark-circle" size={32} color="green"/>
            </CustomBtn>
            <Button title="Go To HomeCategoryScreen" onPress={()=>navigation.navigate('HomeCategoryScreen')}/>
            <Button title="Go To SingleProduct" onPress={()=>navigation.navigate('SingleProduct')}/>
            <Button title="Go To FavoriteScreen" onPress={()=>navigation.navigate('Favorites')}/>
            <Button title="App Log Out" onPress={()=>userLogOut()}/>
        </View>
    )
});

const styles = StyleSheet.create({
    textStyle:{fontSize:20,marginLeft:10,},
    btnStyle:{paddingHorizontal:15,paddingVertical:10, margin:0},
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });