import React, { useEffect,useState } from 'react'
import { View,Text,StyleSheet, ActivityIndicator } from 'react-native'
import { getDataFetchUrl } from '../../api';

import { connect } from 'react-redux';
import { getUserAccessToken } from '../../store/user';
import { COLORS } from '../../styles/colors';
import { CategoryItem } from './components';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { CustomText } from '../../components';
import { CategoryProductsSection } from './CategoryProductsSection';
const mapsStateToProps=(state)=>({accessToken:getUserAccessToken(state)});

export const HomeCategoryScreen = connect(mapsStateToProps)(({navigation,route,accessToken}) => {
    const [state, setState] = useState({});
    const [loaded, setLoaded] = useState(false);
    const getSingleCategoryData =async (id)=>{
        const data = await getDataFetchUrl(`http://petsco.justportfolio.tk/api/categories/${id}?api_token=${accessToken}`);
        setState(data);
        setLoaded(true);
    }
    useEffect(()=>{
        const req = getSingleCategoryData(route.params?.id);
    },[route]);

    const goChildCategoryProductsHandler = (id,title)=>{
        navigation.navigate('Categories', {screen: 'ProductsScreen',params: { fetchUrl:`http://petsco.justportfolio.tk/api/products/getproductsbychildcategory/${id}?api_token=`,title },});
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
                <View style={styles.categoryFlatlistContainer}>
                    <CategoryItem containerStyle={{marginLeft:0}} alignSelf='center'  id={state.data.id} title={state.data.name} width={"90%"} height={131} bgColor={state.data.color} disabled={true} imgUrl={state.data.image}/>
                </View>
                <View style={styles.txtWrapper}>
                    <CustomText weight="regular" style={styles.childCatNameTxt}>All Categories</CustomText>
                </View>
                <FlatList
                    style={styles.childCategoryFlatlistContainer}
                    showsHorizontalScrollIndicator={false}
                    data={state.data.childcategories}
                    horizontal={true}
                    renderItem={({item,index})=>{
                        return (
                            <CategoryItem disabled={false} textStyle={{fontSize:12}}  id={item.id} title={item.name} width={80} height={110} bgColor={state.data.color} goCategoryPageHandler={goChildCategoryProductsHandler} imgUrl={item.image}/>
                        )
                    }}
                    keyExtractor={(item,index) => item.id.toString()}
                />
                {
                    state.data.childcategories.map(item=>{
                        if(item.products.length !== 0){
                            return(
                                <CategoryProductsSection key={item.id} disabled={false} title={item.name} btnTitle="See All" fetchUrl={`http://petsco.justportfolio.tk/api/products/getproductsbychildcategory/${item.id}?api_token=`}  productData={item.products} goProductsHandler={goProductsHandler} goSingleProductHandler={goSingleProductHandler} />
                            );
                        }
                    })
                }

            </ScrollView>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {flex: 1,backgroundColor: COLORS.primary,position:'relative',zIndex:1,},
    PagescrollContainer:{backgroundColor:COLORS.colorText,borderTopLeftRadius:20,borderTopRightRadius:20,},
    categoryFlatlistContainer:{height:160,zIndex:100,marginTop:30},
    txtWrapper:{paddingHorizontal:20,justifyContent:'center',},
    childCatNameTxt:{color:COLORS.secondary,fontSize:25,},
    childCategoryFlatlistContainer:{height:160,zIndex:100,marginTop:10,paddingHorizontal:10,}
    
  });