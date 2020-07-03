import * as Font from 'expo-font';
import RubikLight from "../assets/fonts/Rubik-Light.ttf";
import RubikRegular from "../assets/fonts/Rubik-Regular.ttf";
import RubikMedium from "../assets/fonts/Rubik-Medium.ttf";
import RubikMediumItalic from "../assets/fonts/Rubik-MediumItalic.ttf";
import RubikBold from "../assets/fonts/Rubik-Bold.ttf";


export const loadFonts =()=>{return Font.loadAsync({RubikLight,RubikRegular,RubikMedium,RubikMediumItalic,RubikBold});}

export const FONT_FAMILIES = Object.freeze({
    light: "RubikLight",
    regular: "RubikRegular",
    medium: "RubikMedium",
    italic: "RubikMediumItalic",
    bold: "RubikBold",
  });
  
