import React,{useEffect,useState,useRef} from 'react'
import { View, Text,StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');
export const SearchHeader = ({onPress,navigation,route}) => {
  const [isOpen, setIsOpen] = useState(false);  
  const [queryField, setQueryField] = useState('');  
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);
  const input = useRef(null);
  useEffect(() => {      
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => {setIsOpen(false);setQueryField('');});
    return () => { keyboardShowListener.current.remove();keyboardHideListener.current.remove();}
  },[]);
  useEffect(()=>{ 
    if(route?.params?.isSearchMode){
      keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
      keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => {setIsOpen(false);setQueryField('');});
      input.current.focus(); console.log('focus oldu');}
    else{keyboardShowListener.current.remove();keyboardHideListener.current.remove();}
    console.log('route deisdi'); },[route]);
  useEffect(()=>{console.log("is open use efectine girdi"); if(!isOpen && route?.params?.isSearchMode !== undefined){  onPress(); console.log("is open use efektinin ifine girdi");} },[isOpen])
  const openHandler =()=>{  onPress(); }
  const searchHandler=()=>{
    if(queryField !== ''){
      navigation.navigate('Categories', {screen: 'ProductsScreen',params: { fetchUrl:'http://petsco.justportfolio.tk/api/products?',title:queryField,query:true },});
    }
  }
    if(route?.params?.isSearchMode && route?.params?.isSearchMode !== undefined){
        return (
            <Animatable.View   animation="bounceInRight" onPress={onPress} style={{marginRight:20,height:40,backgroundColor:'white',justifyContent:'center',borderRadius:5,}}>
                <View style={{width:width-40,position:'relative'}}>
                  <View style={{position:'absolute',right:10,top:2,zIndex:10}}>
                    <TouchableOpacity onPress={searchHandler} >
                      <AntDesign name="search1" size={24} color="black"  />
                    </TouchableOpacity> 
                  </View> 
                    <TextInput value={queryField} onChangeText={(text)=>setQueryField(text)} ref={input} placeholder="Search" style={{backgroundColor:'white',fontSize:19,paddingHorizontal:10}}/>
                </View>
            </Animatable.View>
        )
    }
   
    return(
        <TouchableOpacity  onPress={openHandler}style={styles.container}>
            <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{height:40,width:40,marginRight:15,justifyContent:'center',alignItems:'center'},

});