import React,{useState,useLayoutEffect} from 'react'
import { View,Text,StyleSheet, Dimensions,Image } from 'react-native'
import { IMAGES } from '../../styles/images';
import { COLORS } from '../../styles/colors';
import { CustomText, CustomField, CustomBtn } from '../../components';
import { PetsType } from './components';
import { FONT_FAMILIES } from '../../styles/fonts';
import { validationForm } from '../../utils';

import { connect } from 'react-redux';
import {  getUserData,getUserPets,addUserPets,setAuthStatus } from '../../store/user';
import store from '../../store';
import { updateUserData } from '../../api';
const mapStateToProps =(state) =>({ userData:getUserData(state) });

const fieldsInitialState = {name:'',years:'0',months:'0',type:'Dog'};
const appHeight = Dimensions.get("window").height;

export const AddPets = connect(mapStateToProps,{addUserPets,setAuthStatus})(({navigation,userData,addUserPets,setAuthStatus}) => {
    useLayoutEffect(()=>{ if(userData.email.length === 0){  navigation.navigate('SignInScreen'); }},[userData])
    const [fields,setFields] = useState(fieldsInitialState);
    const [validation,setValidation] = useState(true);

    const fieldsChangeHandler = (name,value)=>{ 
        if((name==="months" || name==="years") && (value === '' || isNaN(value)) ){value  = 0;}
        setFields((fields)=>({...fields,[name]:value}));
    }
    const addAnotherPetHandler =()=>{
        if(!validationForm("name",fields.name,).validationStatus){setValidation("onChange");return}
        addUserPets(fields);
        setFields(fieldsInitialState);
    }
    
    const doneHandler = async()=>{
        if(!validationForm("name",fields.name,).validationStatus){setValidation("onChange");return};
        addUserPets(fields);
        const result = await updateUserData(userData.accessToken,{userPets:{pets:getUserPets(store.getState())}});
        console.log(result);
        if(result.data){setAuthStatus();} else{alert('Something go wrong');}
    }
    const chooseLaterHandler =()=>{
        setAuthStatus();
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText weight="regular" style={styles.headerText}>You don't have a pet!</CustomText>
                <Image source={IMAGES.addpets} style={styles.headerImg} resizeMode={"contain"}/>
            </View>
            <View style={styles.footer}>
            <CustomText weight="medium" style={styles.footerTopText}>Choose your pet type</CustomText>
                <View style={styles.typeWrapperContainer}>
                    <PetsType bgColor={COLORS.color1} imageSource={IMAGES.cdog} type="Dog" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/> 
                    <PetsType bgColor={COLORS.color2} imageSource={IMAGES.ccat} type="Cat" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/> 
                    <PetsType bgColor={COLORS.color3} imageSource={IMAGES.cbird} type="Bird" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/>
                    <PetsType bgColor={COLORS.color4} imageSource={IMAGES.cfish} type="Fish" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/> 
                    <PetsType bgColor={COLORS.color5} imageSource={IMAGES.csmall} type="Small" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/>          
                </View>
            <CustomField fieldStyle={styles.fieldStyle}  labelStyle={styles.labelStyle} validation={validation} type="name"  label="Pet name" value={fields.name} onChangeText={(value)=>fieldsChangeHandler("name",value)} />
            <CustomText weight="regular" style={styles.petAgeText}>Pet Age</CustomText>
            <View style={styles.petAgeWrapper}>
                <CustomField keyboardType="numeric"  containerStyle={styles.containerStyle} fieldStyle={styles.fieldStyle}  labelStyle={styles.labelStyle} validation={false} type="name"  label="Years" value={fields.years} onChangeText={(value)=>fieldsChangeHandler("years",value)} />
                <CustomField keyboardType="numeric" containerStyle={styles.containerStyle} fieldStyle={styles.fieldStyle}  labelStyle={styles.labelStyle} validation={false} type="name"  label="Months name" value={fields.months} onChangeText={(value)=>fieldsChangeHandler("months",value)} />
            </View>
            <CustomBtn onPress={addAnotherPetHandler} title="+ Add another pet" width={"63%"} alignSelf="center" textStyle={styles.addAnotherText}  btnStyle={styles.textBtn}  />
            <CustomBtn onPress={doneHandler} title="Done" width={"63%"} alignSelf="center" textStyle={styles.doneBtnText}  btnStyle={styles.doneBtn}  />
            <CustomBtn onPress={chooseLaterHandler} title="Choose Later" width={"63%"} alignSelf="center" textStyle={styles.chooseLaterBtnText}  btnStyle={styles.textBtn}  />

            </View>
        </View>
    )
});


const styles= StyleSheet.create({
    container: {flex: 1,backgroundColor: '#fff',},
    header:{flex:1,justifyContent:'flex-end',alignItems:'center',},
    headerText:{color:COLORS.secondary,fontSize:25,marginBottom:10},
    headerImg:{height: appHeight*0.2,},
    footer:{flex:2,paddingHorizontal:30,},
    footerTopText:{color:COLORS.primary,fontSize:20,textAlign:'center',marginTop:10},
    typeWrapperContainer:{flexDirection:'row',height:appHeight*0.14,justifyContent:'space-between',marginVertical:20,},
    fieldStyle:{backgroundColor:COLORS.colorText,color:COLORS.secondary,borderColor:COLORS.secondary,},
    labelStyle:{backgroundColor:'white',color:COLORS.primary,fontFamily:FONT_FAMILIES.medium,},
    petAgeText:{color:COLORS.secondary,fontSize:16,},
    petAgeWrapper:{flexDirection:'row',justifyContent:'space-between',paddingTop:10,},
    containerStyle:{width:'48%',marginBottom:13,},
    textBtn:{backgroundColor:COLORS.colorText,},
    addAnotherText:{color:COLORS.primary,fontFamily:FONT_FAMILIES.medium,fontSize:16,textTransform:"none",},
    doneBtn:{height:40,marginTop:22,marginBottom:8,borderRadius:5},
    doneBtnText:{fontSize:20,},
    chooseLaterBtnText:{fontSize:20,color:COLORS.primary,fontFamily:FONT_FAMILIES.medium},


});