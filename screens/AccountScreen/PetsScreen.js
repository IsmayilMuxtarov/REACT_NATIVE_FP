import React from 'react';
import { StyleSheet,FlatList, } from 'react-native';

import { CustomLayout } from '../../commons';
import { PetsItem } from './components';

import { connect } from 'react-redux'
import {getUserPets} from '../../store/user';
const mapsStateToProps=(state)=>({pets:getUserPets(state)})

export const PetsScreen = connect(mapsStateToProps)(({pets}) => {
    return (
        <CustomLayout style={styles.container}>
            <FlatList
                    style={{paddingHorizontal:20,flex:1}}
                    data={pets}
                    renderItem={({item,index})=>{
                        return (
                            <PetsItem item={item}/>
                        )
                    }}
                    keyExtractor={(item,index) => (item.id).toString()}
                />
        </CustomLayout>
    )
});

const styles = StyleSheet.create({
    container:{flex:1}
});
