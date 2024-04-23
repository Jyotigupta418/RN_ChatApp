import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {ROUTES} from '../navigation/routes';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = async () => {
    //checks if email is already in use
    const emailExists = await firestore()
    .collection('users')
    .where('email', '==', email)
    .get();
    if (!emailExists.empty) {
      Alert.alert('Email already exists');
      return;
    }
    //checks if mobile number is already in use
    const mobileExists = await firestore()
    .collection('users')
    .where('mobile', '==', mobile)
    .get();

    if (!mobileExists.empty) {
      Alert.alert('Mobile number already exists');
      return;
    }
    //register user in firestore database and navigate to login screen
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        userId: userId,
      })
      .then(res => {
        Alert.alert('user created');
        navigation.navigate(ROUTES.LOGIN);
      })
      .catch(err => {
        console.log(err);
      });
      
  };

  const validate = () => {
    let isValid = true;

    if (name === '') {
      isValid = false;
      Alert.alert('Please enter name');
    } else if (email === ''|| ( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
      isValid = false;
      Alert.alert('Please enter valid email');
    } else if (mobile === '') {
      isValid = false;
      Alert.alert('Please enter mobile');
    } else if (password === '') {
      isValid = false;
      Alert.alert('Please enter password');
    } else if (confirmPassword === '') {
      isValid = false;
      Alert.alert('Please enter confirm password');
    } else if (password !== confirmPassword) {
      isValid = false;
      Alert.alert('Passwords do not match');
    }
    return isValid;
  }; 

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <Text style={styles.headerText}>Signup</Text>
      <TextInput
        placeholder="Username"
        style={{...styles.input, marginTop: 30}}
        placeholderTextColor="gray"
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="gray"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Mobile"
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="gray"
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="gray"
        keyboardType="email-address"
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="gray"
        keyboardType="email-address"
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()){
            registerUser();
          } else {
            Alert.alert('Please enter valid details');
          }

        }}>
        <Text style={styles.btnText}>Signup</Text>
      </TouchableOpacity>
      <Text style={styles.already}>Already have an account?</Text>
      <Text
        style={styles.login}
        onPress={() => {
          navigation.goBack();
        }}>
        Login
      </Text>
    </ScrollView>
  );
};

export default Signup;

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
  already: {
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
