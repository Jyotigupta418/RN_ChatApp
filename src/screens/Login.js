import {
  Alert,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {ROUTES} from '../navigation/routes';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const loginUser = () => {
    setVisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        console.log('data', res.docs[0].data());
        if (res.empty) {
          Alert.alert('User not found');
        } else {
          res.forEach(doc => {
            const document = doc.data();
            if (document.password === password) {
              goToHome(document.name, document.email, document.userId);
            } else {
              Alert.alert('Wrong Password');
            }
          });
        }
      })
      .catch(error => {
        setVisible(false);
        console.error('Error logging in:', error);
      });
  };

  const goToHome = async (name, email, userId) => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('userId', userId);
    navigation.navigate(ROUTES.HOME);
  }

  const validate = () => {
    let isValid = true;
    if (email === ''|| ( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
      isValid = false;
      Alert.alert('Please enter valid email');
    } else if (password === '') {
      isValid = false;
      Alert.alert('Please enter password');
    }
    return isValid;
  }; 


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        placeholder="Email"
        style={{...styles.input, marginTop: 50}}
        placeholderTextColor="gray"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor="gray"
        secureTextEntry
        keyboardType="default"
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity style={styles.btn} onPress={()=>{if(validate()){loginUser()}}}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.noAccount}>Don't have an account?</Text>
      <Text
        style={styles.login}
        onPress={() => {
          navigation.navigate(ROUTES.SIGNUP);
        }}>
        Sign Up
      </Text>
      <Loader visible={visible}/>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
    color: '#215C54',
    fontFamily: 'serif',
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    margin: 6,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    backgroundColor: 'white',
    color: 'black',
  },
  btn: {
    width: '75%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#215C54',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'serif',
  },
  noAccount: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'serif',
    color: 'black',
  },
  login: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'serif',
    color: '#215C54',
    textDecorationLine: 'underline',
  },
});
