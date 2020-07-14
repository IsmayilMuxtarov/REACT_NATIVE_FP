import React,{useState,useEffect,useRef} from 'react'
import { View, Text, TouchableOpacity,StyleSheet,Keyboard } from 'react-native';
import { CustomBtn } from '../components';

import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import { COLORS } from '../styles/colors';
import { FONT_FAMILIES } from '../styles/fonts';

function CustomTabBar({ state, descriptors, navigation,route }) {
  const [isOpen, setIsOpen] = useState(false);  
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);
  useEffect(() => {      
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));
    return () => { keyboardShowListener.current.remove();keyboardHideListener.current.remove();}
  });


  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const data = state.routes.filter(item=>item.name=="Home");
  if (isOpen === true) {
    return null;
  }

  return (
    <View style={{ padding:0,margin:0,}}>
      <View style={{ flexDirection: 'row',justifyContent:'space-between',backgroundColor:'white',marginTop:-50,borderTopStartRadius:40,
    borderTopEndRadius:40, paddingHorizontal:20,paddingVertical:11,elevation:10,borderColor:COLORS.primary,borderWidth:1, }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel : options.title !== undefined ? options.title: route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <CustomBtn 
            key={label}
            title={isFocused ? label : ''}
            btnStyle={[styles.btnStyle,{backgroundColor: isFocused ? COLORS.primary : 'transparent'}]}
            textStyle={styles.textStyle}
            onPress={onPress}
            minWidth="13%"
          >
            {label == "Home" && <AntDesign name="home" size={24} color={isFocused ? COLORS.colorText : COLORS.primary } />}
            {label == "Cart" && <Feather name="shopping-cart" size={24} color={isFocused ? COLORS.colorText : COLORS.primary } />}
            {label == "Favorites" && <MaterialIcons name="favorite-border" size={24} color={isFocused ? COLORS.colorText : COLORS.primary } />}
            {label == "Categories" && <Feather name="menu" size={24} color={isFocused ? COLORS.colorText : COLORS.primary } />}
            {label == "Account" && <Feather name="user" size={24} color={isFocused ? COLORS.colorText : COLORS.primary } />}
          </CustomBtn>
        );
      })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle:{fontSize:12,marginLeft:3,fontFamily:FONT_FAMILIES.bold},
  btnStyle:{paddingHorizontal:13,paddingVertical:5, margin:0,borderRadius:20},
});

export default CustomTabBar;