import React,{useState} from 'react';
import { View,StyleSheet,FlatList, KeyboardAvoidingView,TouchableOpacity } from 'react-native';

import { COLORS } from '../../styles/colors';
import { CustomLayout } from '../../commons';
import { CustomText, CustomBtn, CustomField } from '../../components';
import { FONT_FAMILIES } from '../../styles/fonts';


import { getUserAccessToken, getUserAddress, addUserAddress, selectUserAddress, deleteUserAddress } from '../../store/user';
import { connect } from 'react-redux';
import store from '../../store';
import { validationForm } from '../../utils';
import { updateUserData } from '../../api';


const mapStateToProps =(state) =>({ accessToken:getUserAccessToken(state),address:getUserAddress(state) });

const initialState = {addMode:false,validation:true,fields:{title:'',text:''}}
export const AddressScreen = connect(mapStateToProps,{addUserAddress,selectUserAddress,deleteUserAddress})(({route,navigation,accessToken,address,addUserAddress,selectUserAddress,deleteUserAddress}) => {
    const [state, setState] = useState(initialState)
    console.log("",route);
    const fieldsChangeHandler = (name,value)=>{ 
        setState((state)=>({...state,fields:{...state.fields,[name]:value}}));
    }
    const doneHandler =  async ()=>{
        if(!validationForm("name",state.fields.title).validationStatus || !validationForm("name",state.fields.text).validationStatus){
            setState((state)=>({...state,validation:"onChange"})); 
            return;
        }; 
        addUserAddress(state.fields);
        const result = await updateUserData(accessToken,{userAddress:{address:getUserAddress(store.getState())}});
        if(result.data){setState(initialState);} else{alert('Something go wrong');}

    }
    const addressSelectHandler =async (id)=>{
        selectUserAddress({addresID:id});
        const result = await updateUserData(accessToken,{userAddress:{address:getUserAddress(store.getState())}});
        if(!result.data){alert('Something go wrong');}
    }
    const addressDeleteHandler =async (id)=>{
        deleteUserAddress({addresID:id});
        const result = await updateUserData(accessToken,{userAddress:{address:getUserAddress(store.getState())}});
        if(!result.data){alert('Something go wrong');}
    }
    return (
        <KeyboardAvoidingView style={{flex:1,}} behavior="height">
        <CustomLayout style={styles.container}>
        { state.addMode ?
            <View style={{justifyContent:'center',paddingTop:30}}>
                <CustomField fieldStyle={styles.fieldStyle}  labelStyle={styles.labelStyle} validation={state.validation} type="name"  label="Address Title" value={state.fields.title} onChangeText={(value)=>fieldsChangeHandler("title",value)} />
                <CustomField fieldStyle={styles.fieldStyle}  labelStyle={styles.labelStyle} validation={state.validation} type="name"  label="Address Text" value={state.fields.text} onChangeText={(value)=>fieldsChangeHandler("text",value)} />
                <CustomBtn onPress={doneHandler} title="Done" width={"63%"} alignSelf="center" textStyle={styles.doneBtnText}  btnStyle={styles.doneBtn}  />  
            </View>
            : 
            <FlatList
                    style={{flex:1,}}
                    showsVerticalScrollIndicator={false}
                    data={address}
                    renderItem={({item,index})=>{
                        console.log("item.isSelect",item.isSelect)
                        return (
                            <TouchableOpacity onPress={()=>addressSelectHandler(item.id)} onLongPress={()=>addressDeleteHandler(item.id)} style={styles.addressItemContainer}>
                                <View style={styles.addressItemHeader}>
                                    <View style={styles.addressItemSelectBoxWrapper} >
                                        <View style={[styles.addressItemSelectBox,{backgroundColor: item.isSelect ? COLORS.secondary : COLORS.colorText} ]} />
                                    </View>
                                    <CustomText weight="medium" style={styles.addressTitle}>{item.name} {item.title}</CustomText>
                                </View>
                                <View style={styles.addressItemFooter}>
                                    <CustomText weight="light" style={styles.addressText}> {item.text}</CustomText>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={()=>(
                        <>
                            <CustomBtn onPress={()=>setState((state)=>({...state,addMode:true}))} title="+ Add Address" width={"63%"} alignSelf="center" textStyle={styles.addAddressBtnText}  btnStyle={styles.addAddressBtn}  />
                        { route?.params?.from === "checkout" &&
                            <CustomBtn onPress={()=>navigation.navigate("PlaceOrderScreen")} title="Continue" width={"40%"} alignSelf="center" textStyle={styles.continueBtnText}  btnStyle={styles.continueBtn}  />
                        }
                        </>
                    )}
                    ListFooterComponentStyle={{flex:1,justifyContent:"center",marginBottom:120}}
                    keyExtractor={(item,index) => (item.id).toString()}
                />
        }
        </CustomLayout>
        </KeyboardAvoidingView>
    )
});

const styles= StyleSheet.create({
    container: {flex: 1,backgroundColor: COLORS.color7,paddingHorizontal:30,},
    addressItemContainer:{width:'100%',backgroundColor:COLORS.colorText,borderRadius:10,paddingHorizontal:20,paddingVertical:20,marginBottom:20,justifyContent:'space-between'},
    addressItemHeader:{flexDirection:'row',height:30,alignItems:'center'},
    addressItemFooter:{marginTop:10},
    addressItemSelectBoxWrapper:{borderRadius:8,height:16,width:16,borderColor:COLORS.secondary,borderWidth:1,marginHorizontal:10,justifyContent:'center',alignItems:'center'},
    addressItemSelectBox:{backgroundColor:COLORS.secondary,width:10,height:10,borderRadius:5,},
    addressTitle:{color:COLORS.secondary,fontSize:16,textTransform:'capitalize'},
    addressText:{color:COLORS.secondary,fontSize:16},
    doneBtn:{height:40,marginTop:42,marginBottom:8,borderRadius:5},
    doneBtnText:{fontSize:20,},
    addAddressBtnText:{color:COLORS.primary,fontFamily:FONT_FAMILIES.medium,fontSize:17,textTransform:"none",},
    addAddressBtn:{backgroundColor:COLORS.color7,marginTop:10},
    continueBtn:{backgroundColor:COLORS.primary,marginTop:15,height:30,borderRadius:5},
    continueBtnText:{fontFamily:FONT_FAMILIES.medium,fontSize:20,textTransform:"none",},
    fieldStyle:{backgroundColor:COLORS.colorText,color:COLORS.secondary,borderColor:COLORS.secondary,},
    labelStyle:{backgroundColor:'white',color:COLORS.primary,fontFamily:FONT_FAMILIES.medium,},

});
