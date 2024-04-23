import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ROUTES } from '../navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    React.useEffect(() => {
        setTimeout(() => {
          checkLogin()
        }, 2000)
    }, []);

    const checkLogin = async () => {
      const userID = await AsyncStorage.getItem('userId');
      if(userID !== null){
        navigation.navigate(ROUTES.HOME)
      }else{
        navigation.navigate(ROUTES.LOGIN)
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Welcome to Chat\nApp'} 💬</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#215C54',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:'white',
        fontSize:30,
        textAlign:'center'
    }
})