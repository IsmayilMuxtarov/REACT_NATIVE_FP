import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet, Button, ActivityIndicator, Image, Dimensions } from 'react-native'
import { getUserAccessToken } from '../../store/user';
import { connect } from 'react-redux';
import { COLORS } from '../../styles/colors';
import { getDataFetchUrl } from '../../api';
import { ScrollView } from 'react-native-gesture-handler';
const mapsStateToProps=(state)=>({accessToken:getUserAccessToken(state)});
const initialState = {id:'',name:'',status:'',img:'',size:'',color:'Red',price:0,count:0,img2:'',description:''};

const height = Dimensions.get('window').height;

export const SingleProduct = connect(mapsStateToProps)(({route,navigation,accessToken}) => {
    const [state, setState] = useState(initialState);
    const [loaded, setLoaded] = useState(false);
    const getSingleCategoryData =async (id)=>{
        const req = await getDataFetchUrl(`http://petsco.justportfolio.tk/api/products/${id}?api_token=${accessToken}`);
        setState((state)=>{
            let status = getProductStatus(req.data.is_new,req.data.discount);
            return ({...state,status,id:req.data.id,name:req.data.name,img:req.data.image1,size:req.data.size,price:req.data.price,description:req.data.description,img2:req.data.image2});        
        });
        setLoaded(true);
    }
    console.log("sad",state);
    useEffect(()=>{
        const req = getSingleCategoryData(route.params?.id);
        
    },[route]);

    if (!loaded) {
        return (
            <View style={{flex:1,justifyContent:'center',}}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
      }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.PagescrollContainer}>
                <View style={[styles.productImgCotainer,{height:height*0.5}]}>
                    <View style={styles.imgWrapper}>
                        <Image source={{uri:state.img}} style={{height:height*0.3,width:"100%"}} resizeMode={"contain"}/>
                    </View>
                    <View style={styles.productImgFooterWrapper}>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
});

const styles= StyleSheet.create({
    container:{flex: 1,backgroundColor: COLORS.primary,},
    PagescrollContainer:{backgroundColor:'#F3FBEE',borderTopLeftRadius:20,borderTopRightRadius:20,},
    productImgCotainer:{height:300,backgroundColor:COLORS.colorText,borderRadius:30,margin:20,paddingHorizontal:20,
        shadowColor: "#000",shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.32,shadowRadius: 5.46,elevation: 9,
    },
    imgWrapper:{flex:1,justifyContent:'center',},
    productImgFooterWrapper:{flex:0.2,borderTopWidth:1,borderColor:COLORS.primary}

});

function getProductStatus(newState,discountState){ 
    if(newState === '1'){ return "New";}
    else{ if(discountState){return `${discountState}%`;} else{return '';} }
  }

  