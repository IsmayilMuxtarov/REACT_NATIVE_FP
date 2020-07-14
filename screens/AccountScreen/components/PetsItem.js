import React from 'react';
import { View,Image,StyleSheet  } from 'react-native';
import { CustomText } from '../../../components';
import { COLORS } from '../../../styles/colors';
import { IMAGES } from '../../../styles/images';

const petsBgColors = { Dog:COLORS.color1,Cat:COLORS.color2,Bird:COLORS.color3,Fish:COLORS.color4,Small:COLORS.color5, };

export const PetsItem = ({item}) => {
    return (
        <View style={[styles.container,{backgroundColor:petsBgColors[item.type] ,}]}>
            <Image source={IMAGES[item.type]} resizeMode={'contain'} style={styles.imgType}/>
            <View style={styles.infoTextContainer}>
                <View style={styles.infoTextWrapper}>
                    <CustomText weight="medium" style={styles.infoText}>Name: </CustomText>
                    <CustomText weight="light" style={styles.infoText}>{item.name}</CustomText>
                </View>
                <View style={styles.infoTextWrapper}>
                    <CustomText weight="medium" style={styles.infoText}>Age: </CustomText>
                    <CustomText weight="light" style={styles.infoText}>{`years: ${item.age.years} months: ${item.age.months}`}</CustomText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{width:'100%',height:100,borderRadius:10,paddingHorizontal:20,paddingVertical:20,marginBottom:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center',},
    imgType:{width:"25%",},
    infoTextContainer:{height:'100%',width:'60%',justifyContent:'space-evenly'},
    infoTextWrapper:{flexDirection:'row',justifyContent:'space-between'},
    infoText:{color:COLORS.colorText,fontSize:16},
});