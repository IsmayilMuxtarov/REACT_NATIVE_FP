import React,{useState,useEffect} from "react";
import { StyleSheet, View, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';
import { CustomText } from "./CustomText";
import { FONT_FAMILIES } from "../styles/fonts";
import { COLORS } from "../styles/colors";
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import { validationForm } from "../utils";

export const CustomField = ({ label,labelStyle={},fieldStyle={}, containerStyle={},value="",type="",rePassword="",validation=false, ...rest }) => {
    const isPasswordField =  type === "password" || type === "rePassword";
    const [componentState,setComponentState]=useState({
        passIsHide: isPasswordField,
        validation:{errMsg:null,style:"",onChangeStatus:false,status:false},
    });
    useEffect(() => {
        if(componentState.validation.onChangeStatus || validation==="onChange"){  
            const {errorMessage,validationStatus} = validationForm(type,value,rePassword);
            if(validationStatus){
                setComponentState((state)=>({...componentState,
                    validation:{...state.validation,errMsg:null,style:"",status:validationStatus},
                }));    
            }else{
                setComponentState((state)=>({...componentState,
                    validation:{...state.validation,errMsg:errorMessage,style:{color:COLORS.color6},status:false,},
                }));  
            }
        }  
    }, [value,validation,rePassword])
    const setPassIsHideToggle =()=>{
        setComponentState((state)=>({...componentState,passIsHide:!state.passIsHide}));
    }
    const validationHandler =()=>{
        if(!componentState.validation.onChangeStatus && (validation===true)){
            const {errorMessage,validationStatus} = validationForm(type,value,rePassword);
            if(validationStatus){
                setComponentState((state)=>({...componentState,
                    validation:{...state.validation,errMsg:null,style:"",status:validationStatus},
                }));    
            }else{
                setComponentState((state)=>({...componentState,
                    validation:{...state.validation,errMsg:errorMessage,style:{color:COLORS.color6},onChangeStatus:true,status:false,},
                }));  
            }
        }
    }

    
return (
    <View style={[styles.container,containerStyle]}>
      <CustomText weight="light" style={{ ...styles.label, ...labelStyle,...componentState.validation.style}} > 
        { componentState.validation.errMsg ? componentState.validation.errMsg : label }
      </CustomText>
      <TextInput  secureTextEntry={componentState.passIsHide} value={value} {...rest} style={[styles.field,fieldStyle]}
      onBlur={validationHandler} />
      { isPasswordField ?
        <View style={styles.rightIcon}>
            <TouchableOpacity onPress={setPassIsHideToggle}>
                {componentState.passIsHide ? <Feather name="eye" size={17} color="white" /> : <Feather name="eye-off" size={17} color="white" />}
            </TouchableOpacity>
        </View>
       :
        componentState.validation.status &&
        <Animatable.View style={styles.rightIcon} animation="bounceIn">
            <Feather name="check-circle" size={17} color="white" />
        </Animatable.View>
      }
      

    </View>
  );
};

const styles = StyleSheet.create({
  container:{marginBottom:20,position:'relative',},
  label: {position:'absolute',fontSize: 11,color: COLORS.colorText,backgroundColor:COLORS.primary,zIndex:1,left:14,top:-6,paddingHorizontal:3},
  field: {height:40,backgroundColor: COLORS.primary,fontSize:14,
    borderRadius: 5,paddingHorizontal: 19,paddingRight:30,borderWidth:2,borderColor:COLORS.colorText,color:COLORS.colorText,fontSize:16},
  rightIcon:{position:'absolute',right:10,top: '29%',}
});
