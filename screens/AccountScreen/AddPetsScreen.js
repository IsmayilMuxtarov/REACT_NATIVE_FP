import React,{useState} from 'react';
import { View,StyleSheet, Dimensions,Image, KeyboardAvoidingView } from 'react-native';
import { IMAGES } from '../../styles/images';
import { COLORS } from '../../styles/colors';
import { CustomText, CustomField, CustomBtn } from '../../components';
import { PetsType } from './components';
import { FONT_FAMILIES } from '../../styles/fonts';
import { validationForm } from '../../utils';

import { connect } from 'react-redux';
import {  getUserPets,addUserPets, getUserAccessToken } from '../../store/user';
import store from '../../store';
import { updateUserData } from '../../api';

const mapStateToProps =(state) =>({ accessToken:getUserAccessToken(state) });
const fieldsInitialState = {name:'',years:'0',months:'0',type:'Dog'};
const appHeight = Dimensions.get("window").height;

export const AddPetsScreen = connect(mapStateToProps,{addUserPets})(({navigation,accessToken,addUserPets,}) => {
    const [fields,setFields] = useState(fieldsInitialState);
    const [validation,setValidation] = useState(true);
    console.log(fields);
    const fieldsChangeHandler = (name,value)=>{ 
        setFields((fields)=>({...fields,[name]:value}));
    }
    
    const doneHandler = async()=>{
        if(!validationForm("name",fields.name,).validationStatus){setValidation("onChange");return};
        addUserPets(fields);
        const result = await updateUserData(accessToken,{userPets:{pets:getUserPets(store.getState())}});
        console.log(result);
        if(result.data){setFields(fieldsInitialState);} else{alert('Something go wrong');}
    }

    return (
        // <KeyboardAvoidingView style={{flex:1}} behavior={'position'}>
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                <CustomText weight="medium" style={styles.headerText}>Choose your pet type</CustomText>
                    <View style={styles.typeWrapperContainer}>
                        <PetsType bgColor={COLORS.color1} imageSource={IMAGES.Dog} type="Dog" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/> 
                        <PetsType bgColor={COLORS.color2} imageSource={IMAGES.Cat} type="Cat" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/> 
                        <PetsType bgColor={COLORS.color3} imageSource={IMAGES.Bird} type="Bird" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/>
                        <PetsType bgColor={COLORS.color4} imageSource={IMAGES.Fish} type="Fish" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/> 
                        <PetsType bgColor={COLORS.color5} imageSource={IMAGES.Small} type="Small" currentType={fields.type} fieldsChangeHandler={fieldsChangeHandler}/>          
                    </View>
                    
                <CustomField containerStyle={{marginTop:30}} fieldStyle={styles.fieldStyle} labelStyle={styles.labelStyle} validation={validation} type="name"  label="Pet name" value={fields.name} onChangeText={(value)=>fieldsChangeHandler("name",value)} />
                <CustomText weight="regular" style={styles.petAgeText}>Pet Age</CustomText>
                <View style={styles.petAgeWrapper}>
                    <CustomField keyboardType="numeric"  containerStyle={styles.containerStyle} fieldStyle={styles.fieldStyle}  labelStyle={styles.labelStyle} validation={false} type="name"  label="Years" value={fields.years} onChangeText={(value)=>fieldsChangeHandler("years",value)} />
                    <CustomField keyboardType="numeric" containerStyle={styles.containerStyle} fieldStyle={styles.fieldStyle}  labelStyle={styles.labelStyle} validation={false} type="name"  label="Months name" value={fields.months} onChangeText={(value)=>fieldsChangeHandler("months",value)} />
                </View>
                <CustomBtn onPress={doneHandler} title="Add Pets" width={"63%"} alignSelf="center" textStyle={styles.doneBtnText}  btnStyle={styles.doneBtn}  />
        </KeyboardAvoidingView>
        // </KeyboardAvoidingView>
    )
});


const styles= StyleSheet.create({
    container: {flex: 1,backgroundColor: '#fff',paddingHorizontal:30,},
    headerImg:{height: appHeight*0.2,},
    headerText:{color:COLORS.primary,fontSize:25,textAlign:'center',marginTop:20},
    typeWrapperContainer:{flexDirection:'row',height:appHeight*0.14,justifyContent:'space-between',marginVertical:20,},
    fieldStyle:{backgroundColor:COLORS.colorText,color:COLORS.secondary,borderColor:COLORS.secondary,},
    labelStyle:{backgroundColor:'white',color:COLORS.primary,fontFamily:FONT_FAMILIES.medium,},
    petAgeText:{color:COLORS.secondary,fontSize:16,},
    petAgeWrapper:{flexDirection:'row',justifyContent:'space-between',paddingTop:10,},
    containerStyle:{width:'48%',marginBottom:13,},
    doneBtn:{height:40,marginTop:40,marginBottom:8,borderRadius:5},
    doneBtnText:{fontSize:20,},


});