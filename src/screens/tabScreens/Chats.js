import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { ROUTES } from '../../navigation/routes';
import { useNavigation } from '@react-navigation/native';

let id = '';
const Chats = ({style}) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const tempusers = [];
    id = await AsyncStorage.getItem('userId');
    const email = await AsyncStorage.getItem('email');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => 
        {if(res.docs!=[]){
            res.docs.map(doc=>{
                tempusers.push(doc.data())
            })
        }
        setUsers(tempusers)}
      ).catch(error => {
        console.log('Error getting documents: ', error);
      })
  };

  return (
    <View style={{...styles.container, ...style}}>
      <FlatList 
        style={{marginVertical: 8}}
        data={users}
        renderItem={({item,index})=>{
            return(
                <TouchableOpacity style={styles.userContainer} onPress={()=>navigation.navigate(ROUTES.MESSAGES, {data : item, id: id})}>
                    <Image source={require('../../assets/userprofile.jpg')} style={styles.userIcon}/>
                    <Text style={{...styles.userName, ...style}}>{item.name}</Text>
                </TouchableOpacity>
            )
        }}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  userContainer: {
    padding:5, 
    flexDirection:'row', 
    alignItems:'center'
  },
  userIcon:{
    width:50,
    height:50
  },
  userName:{
    marginLeft:10, 
    fontSize:18, 
    color:'black', 
    fontWeight:'600', 
    fontFamily: 'serif',
  }
});
