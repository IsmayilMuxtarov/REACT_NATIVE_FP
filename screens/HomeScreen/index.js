import React,{useEffect,useState} from 'react'
import { View,Text,StyleSheet,Image, ActivityIndicator, Button ,ScrollView, FlatList} from 'react-native'

import {getMainPageData} from '../../api/index';
import { COLORS } from '../../styles/colors';
import { CategoryProductsSection } from './CategoryProductsSection';
import { CategoryItem } from './components';

import { connect } from 'react-redux';
import { getUserAccessToken,userLogOut, getUserData, getUserPets } from '../../store/user';

const mapStateToProps =(state) =>({ userData:getUserData(state),token:getUserAccessToken(state),pets:getUserPets(state) });


export const HomeScreen = connect(mapStateToProps,{userLogOut})(({navigation,userLogOut,userData,token,pets}) => {
    // const data1 = data.map((pet)=>{return (   ) });
    console.log("pets",pets);
    const [state, setState] = useState({});
    const [loaded, setLoaded] = useState(false);
    const getData = async ()=>{const data = await getMainPageData(token);setState(data);setLoaded(true); }
    useEffect(() => {getData()}, []);
    const goCategoryPageHandler = (id,title)=> {
        navigation.navigate('HomeCategoryScreen', { id,title });
    }
    const goSingleProductHandler=(id,title)=>{
        navigation.navigate('Categories', {screen: 'SingleProduct',params: { id,title },});
    }
    const goProductsHandler=(fetchUrl,title)=>{
        navigation.navigate('Categories', {screen: 'ProductsScreen',params: { fetchUrl,title },});
    }

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
                <FlatList
                    style={styles.categoryFlatlistContainer}
                    showsHorizontalScrollIndicator={false}
                    data={state.data}
                    horizontal={true}
                    renderItem={({item,index})=>{
                        return (
                            <CategoryItem  id={item.id} title={item.name} width={87} height={131} bgColor={item.color} goCategoryPageHandler={goCategoryPageHandler} imgUrl={item.image}/>
                        )
                    }}
                    keyExtractor={(item,index) => item.id.toString()}
                /> 
                            <Button title="App Log Out" onPress={()=>userLogOut()}/>

                <CategoryProductsSection title="New Arrivals" btnTitle="See All" fetchUrl={'http://petsco.justportfolio.tk/api/products/getnewproducts?api_token='}  productData={state.newProduct} goProductsHandler={goProductsHandler} goSingleProductHandler={goSingleProductHandler} />
                <CategoryProductsSection title="Discount Products" btnTitle="See All" fetchUrl={'http://petsco.justportfolio.tk/api/products/getdiscountproducts?api_token'}  productData={state.discountProduct} goProductsHandler={goProductsHandler} goSingleProductHandler={goSingleProductHandler} />

            </ScrollView>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {flex: 1,backgroundColor: COLORS.primary,position:'relative',zIndex:1,},
    PagescrollContainer:{backgroundColor:COLORS.colorText,borderTopLeftRadius:40,borderTopRightRadius:40,},
    categoryFlatlistContainer:{height:160,zIndex:100,paddingHorizontal:5,marginTop:30},
  });