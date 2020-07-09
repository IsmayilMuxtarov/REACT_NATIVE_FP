import React,{useState, useLayoutEffect} from 'react';
import { View,StyleSheet, Dimensions, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { IMAGES } from '../../styles/images';
import { COLORS } from '../../styles/colors';
import { CustomField, CustomText, CustomBtn } from '../../components';
import { FONT_FAMILIES } from '../../styles/fonts';
import { validationForm } from '../../utils';

import { connect } from 'react-redux';
import { singUp, getUserData } from '../../store/user';
const mapStateToProps =(state) =>({ userData:getUserData(state) });

// const fieldsInitialState = {email:'b.alihuummmatov@gmail.com',password:'13081994Bb',rePassword:'13081994Bb',name:'elcin'};
const fieldsInitialState = {email:'',password:'',rePassword:'',name:''}
export const SignUpScreen = connect(mapStateToProps,{singUp})(({navigation,singUp,userData}) => {
    useLayoutEffect(()=>{ if(userData.email.length > 0){  navigation.navigate('AddPetsStarter'); } },[userData])
   
    const [fields,setFields] = useState(fieldsInitialState);
    const [validation,setValidation] = useState(true);
    const fieldsChangeHandler = (name,value)=>{ 
        setFields((fields)=>({...fields,[name]:value}));
    }
    const singUpHandler = async ()=>{
        for (const field in fields) {
            const {errorMessage,validationStatus} = validationForm(field,fields[field],fields.password);
            if(!validationStatus){setValidation("onChange");return}
        } 
        await singUp(fields.email,fields.password,fields.name);
    } 
    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Animatable.Image animation="bounceIn" source={IMAGES.logosplash} style={styles.logoImg} resizeMode={"contain"}/>
            </View>  
            <Animatable.View animation="fadeInUpBig" style={styles.formWrapper}>
                    <CustomField validation={validation} type="name" label="Name" value={fields.name} onChangeText={(value)=>fieldsChangeHandler("name",value)}/>
                    <CustomField validation={validation} type="email" label="Email" keyboardType="email-address" value={fields.email} onChangeText={(value)=>fieldsChangeHandler("email",value)}/>
                    <CustomField validation={validation} type="password"  label="Password" value={fields.password} onChangeText={(value)=>fieldsChangeHandler("password",value)}/>
                    <CustomField validation={validation} type="rePassword"  label="Rewrite Pasword" rePassword={fields.password} value={fields.rePassword} onChangeText={(value)=>fieldsChangeHandler("rePassword",value)} />
                    <CustomBtn onPress={singUpHandler} title="Sign Up" width={"63%"} alignSelf="center" textStyle={styles.signText}  btnStyle={styles.signBtn}  />
                    <View style={styles.footerTextWrapper}>
                        <CustomText style={styles.footerText}>Already have an account?</CustomText>
                        <CustomBtn onPress={()=>navigation.navigate('SignInScreen')} textStyle={styles.footerBtnText} title="Sign In" btnStyle={styles.footerBtn}  />
                    </View>
            </Animatable.View>
        </View>
    )
});
const {height} = Dimensions.get("window");
const logoSize = height* 0.18;
export const styles = StyleSheet.create({
    container: {flex: 1,backgroundColor: '#fff',},
    logoWrapper: {flex:1,justifyContent:'center',alignItems:'center',},
    logoImg:{height:logoSize,},
    formWrapper:{flex:1.3,backgroundColor:COLORS.primary,paddingVertical:45,paddingHorizontal:30,
        borderTopLeftRadius:50,borderTopRightRadius:50,},
    containerStyle:{},
    signBtn:{backgroundColor:COLORS.colorText,borderRadius:5,height:42,marginVertical:10,},
    signText:{color:COLORS.primary,fontFamily:FONT_FAMILIES.medium,fontSize:20},
    footerTextWrapper:{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:5},
    footerText:{fontSize:15,padding:0,color:COLORS.colorText},
    footerBtn:{fontSize:20,},
    footerBtnText:{fontSize:22,fontFamily:FONT_FAMILIES.medium},
  });
  