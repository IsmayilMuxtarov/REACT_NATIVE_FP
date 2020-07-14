import React,{useEffect,useState} from 'react'
import { View,Text,StyleSheet,Image, ActivityIndicator, Button ,ScrollView, FlatList} from 'react-native'

import {getMainPageData} from '../../api/index';
import { COLORS } from '../../styles/colors';
import { CategoryProductsSection } from './CategoryProductsSection';
import { CategoryItem } from './components';

import { connect } from 'react-redux';
import { getUserAccessToken,userLogOut, getUserData, getUserPets } from '../../store/user';
import { CustomLayout } from '../../commons';

const mapStateToProps =(state) =>({ userData:getUserData(state),token:getUserAccessToken(state),pets:getUserPets(state) });


export const HomeScreen = connect(mapStateToProps,{userLogOut})(({navigation,userLogOut,userData,token,pets}) => {
    const [state, setState] = useState({});
    const [loaded, setLoaded] = useState(false);
    const getData = async ()=>{const data = await getMainPageData(token);setState(data);setLoaded(true); }
    useEffect(() => {getData()}, []);
    const goCategoryPageHandler = (id,title)=> {
        navigation.navigate('HomeCategoryScreen', { id,title });
    }
    const goProductsHandler=(fetchUrl,title)=>{
        navigation.navigate('Categories', {screen: 'ProductsScreen',params: { fetchUrl,title,query:false },});
    }
    const goSingleProductHandler=(id,title)=>{
        navigation.navigate('Categories', {screen: 'SingleProduct',params: { id,title },});
    }
    
    if (!loaded) {
        return (
            <CustomLayout style={{flex:1,justifyContent:'center',}}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
            </CustomLayout>
        );
      }
    return (
        <CustomLayout>
            <ScrollView  style={styles.PagescrollContainer}>
                <FlatList
                    style={styles.categoryFlatlistContainer}
                    showsHorizontalScrollIndicator={false}
                    data={state.data}
                    horizontal={true}
                    renderItem={({item,index})=>{
                        return (
                            <CategoryItem  id={item.id} title={item.name} width={87} height={131} bgColor={item.color} onPressHandler={goCategoryPageHandler} imgUrl={item.image}/>
                        )
                    }}
                    keyExtractor={(item,index) => item.id.toString()}
                /> 
                <CategoryProductsSection title="New Arrivals" btnTitle="See All" fetchUrl={'http://petsco.justportfolio.tk/api/products/getnewproducts?'}  productData={state.newProduct} goProductsHandler={goProductsHandler} goSingleProductHandler={goSingleProductHandler} />
                <CategoryProductsSection title="Discount Products" btnTitle="See All" fetchUrl={'http://petsco.justportfolio.tk/api/products/getdiscountproducts?'}  productData={state.discountProduct} goProductsHandler={goProductsHandler} goSingleProductHandler={goSingleProductHandler} />

            </ScrollView>
        </CustomLayout>    
 
    )
});

const styles = StyleSheet.create({
    PagescrollContainer:{backgroundColor:COLORS.colorText,},
    categoryFlatlistContainer:{height:160,zIndex:100,paddingHorizontal:5,},
  });