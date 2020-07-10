import React,{useState} from 'react';
import { View,Text,StyleSheet, Button, Dimensions, Keyboard, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { singIn } from '../../store/user';
import { IMAGES } from '../../styles/images';
import { COLORS } from '../../styles/colors';
import { CustomField, CustomText, CustomBtn } from '../../components';
import { FONT_FAMILIES } from '../../styles/fonts';
import {styles} from './SignUpScreen'; 
import {validationForm}  from '../../utils/index';

export const SignInScreen = connect(null,{singIn})(({navigation,route,singIn,}) => {
    // const fieldsInitialState = {email: route.params?.userMail,password:'',rePassword:''}
    const fieldsInitialState = {email: "q.alihummatov@gmail.com",password:'13081994Bb',rePassword:''}

    const [fields,setFields] = useState(fieldsInitialState);
    const fieldsChangeHandler = (name,value)=>{
        setFields((fields)=>({...fields,[name]:value}));
    }

    const singInHandler =()=>{
        // for (const field in fields) {
        //     console.log(field);
        //     const {errorMessage,validationStatus} = validationForm(field,fields[field],fields.password);
        //     if(!validationStatus){Alert.alert("",errorMessage,[{ text: "OK"}],{ cancelable: false });return;}
        // } 
        singIn(fields.email,fields.password)
    }
    console.log('dasda')
    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Animatable.Image animation="bounceIn" source={IMAGES.logosplash} style={styles.logoImg} resizeMode={"contain"}/>
            </View>  
            <Animatable.View animation="fadeInUpBig" style={styles.formWrapper}>
                    <CustomField type="email" label="Email" keyboardType="email-address" value={fields.email} onChangeText={(value)=>fieldsChangeHandler("email",value)}/>
                    <CustomField type="password"  label="Password" value={fields.password} onChangeText={(value)=>fieldsChangeHandler("password",value)}/>
                    <CustomBtn onPress={singInHandler} title="Sign In" width={"63%"} alignSelf="center" textStyle={styles.signText}  btnStyle={styles.signBtn}  />
                    <View style={styles.footerTextWrapper}>
                        <CustomText style={styles.footerText}>New to Petsco?</CustomText>
                        <CustomBtn onPress={()=>navigation.navigate('SignUpScreen')} textStyle={styles.footerBtnText} title="Sign Up" btnStyle={styles.footerBtn}  />
                    </View>
            </Animatable.View>
        </View>
    )
});
