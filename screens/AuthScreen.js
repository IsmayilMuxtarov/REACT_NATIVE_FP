import React,{useState} from 'react';
import { View,Text,StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

import { singIn } from '../store/user';
const fieldsInitialState = {email:'b.alihummatov@sgmail.com',password:'13081994b',}
export const AuthScreen = connect(null,{singIn})(({singIn}) => {
    const [fields,setFields] = useState(fieldsInitialState);
    const singInHandler =()=>{
        singIn(fields.email,fields.password);
    }
    return (
        <View style={styles.container}>
            <Text>AuthScreen</Text>
            <Button title="Sing In" onPress={singInHandler}/>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  