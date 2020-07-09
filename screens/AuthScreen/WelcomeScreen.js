import React from 'react';
import { View,Text,StyleSheet, Button, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { IMAGES } from '../../styles/images';

export const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Animatable.Image animation="bounceIn" source={IMAGES.logosplash} style={styles.logoImg} resizeMode={"stretch"}/>
            </View>  
                <Text >WelcomeScreen</Text>
                <Button title="Sing In" onPress={()=>navigation.navigate("SignUpScreen")}/>
        </View>
    )
};
const {height} = Dimensions.get("window");
const logoSize = height* 0.3;
const styles = StyleSheet.create({
    container: {flex: 1,backgroundColor: '#fff',},
    logoWrapper: {flex:2,justifyContent:'center',alignItems:'center',},
    logoImg:{width:logoSize,height:logoSize,},
    wrapperStyle:{height:'100%',},
    containerStyle:{},
   
  });
  