import React,{useEffect,useState} from 'react';
import { View,Text,StyleSheet,Button, FlatList, ActivityIndicator, Image,TouchableOpacity } from 'react-native';

import { CustomLayout } from '../../commons';
import { COLORS } from '../../styles/colors';
import { CustomText } from '../../components';
import { Feather,MaterialIcons } from '@expo/vector-icons'; 

import { getDataFetchUrl } from '../../api';
import { connect } from 'react-redux';
import { getUserAccessToken } from '../../store/user';
import { textShortening } from '../../utils';

const mapsStateToProps=(state)=>({accessToken:getUserAccessToken(state)});

const initialState = {data:[],fetchUrl:null,loaded:true,current_page:1,last_page:1,};
export const ProductsScreen = connect(mapsStateToProps)(({route,navigation,accessToken}) => {
    const [state, setState] = useState(initialState);
    const getProductsData = async (fetchUrl)=>{
        const req = await getDataFetchUrl(fetchUrl);
        setState((state)=>({ ...state,fetchUrl,data:req.data,total:req.total,current_page:req.current_page,last_page:req.last_page,loaded:false}));
    }
    const getLoadProductsData = async ()=>{
        const req = await getDataFetchUrl(`${state.fetchUrl}&&page=${state.current_page+1}`);
        setState((state)=>({...state,data:state.data.concat(req.data),current_page:req.current_page,last_page:req.last_page,loaded:false}));
    }
    const goSingleProductHandler=(id,title)=>{
        navigation.navigate('Categories', {screen: 'SingleProduct',params: { id,title },});
    }
    useEffect(()=>{
        setState(initialState);
        let url = '';
            if(route.params === undefined){
                url = `http://petsco.justportfolio.tk/api/products?api_token=${accessToken}`;
            } else if(route.params.query){
                url = `${route.params?.fetchUrl}api_token=${accessToken}&&q=${route.params?.title}`;
            } else{  url = `${route.params?.fetchUrl}api_token=${accessToken}`; }
        getProductsData(url); 
        },[route]);
    const loadMoreHandler=  async()=>{
        if(state.last_page!==state.current_page){
            setState((state)=>({...state,loaded:true}))
            await getLoadProductsData(state.current_page+1)
        }
    }
     
    return (
        <CustomLayout style={{flex:1,backgroundColor:COLORS.color7}}>
            <FlatList
                    style={{backgroundColor:COLORS.color7 ,paddingHorizontal:20,flex:1}}
                    data={state.data}
                    ListHeaderComponent={()=>(
                            <>
                                <View><CustomText>{state.total} results</CustomText></View>
                                <View><CustomText></CustomText></View>
                            </>
                    )}
                    ListHeaderComponentStyle={{flexDirection:'row',justifyContent:'space-between',paddingBottom:20,paddingHorizontal:5}}
                    renderItem={({item,index})=>{
                        return (
                            <TouchableOpacity onPress={()=>{goSingleProductHandler(item.id,item.name)}} style={styles.productContainer}>
                                <Image style={{height:100,width:"30%"}} source={{uri:item.image1}} resizeMode="contain"  />
                                <View style={{height:120,width:'70%',paddingHorizontal:10,}}>
                                    <View style={{flex:1,justifyContent:'center',}}>
                                        <CustomText weight="medium" style={{color:COLORS.secondary,fontSize:18,}}>{textShortening(item.name,20)}</CustomText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',borderBottomWidth:1,borderColor:COLORS.primary}}>
                                        <CustomText weight="italic" style={{color:COLORS.primary,fontSize:16,}}>{item.price} euro</CustomText>
                                    </View>
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20}}>
                                        <Feather name="shopping-cart" size={22} color={COLORS.primary} />
                                        <MaterialIcons name="favorite-border" size={22} color={COLORS.primary} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={()=>{
                        return(
                            state.loaded ?
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                            : null
                        )
                    }}
                    ListFooterComponentStyle={{flex:1,justifyContent:"center",marginBottom:120}}
                    keyExtractor={(item,index) => (`${item.id}asd${item.slug}${index}`).toString()}
                    onEndReached={loadMoreHandler}
                    onEndReachedThreshold={0.1}
                />
        </CustomLayout>
    )
});

const styles= StyleSheet.create({
    productContainer:{backgroundColor:COLORS.colorText,width:'100%',borderRadius:10,height:120,marginBottom:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center',},

});