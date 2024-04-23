import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ROUTES} from '../../navigation/routes';
import {useNavigation} from '@react-navigation/native';

const Setting = ({toggleTheme, style}) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    navigation.navigate(ROUTES.LOGIN);
  };

  const handleTheme = () => {
    toggleTheme();
  }

  return (
    <View style={{...styles.container, ...style}}>
      <TouchableOpacity style={styles.settingsList} onPress={handleLogout}>
        <Text style={styles.text} >
          🔄
        </Text>
        <Text style={{...styles.text, ...style}}>
          Switch Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsList} onPress={handleTheme}>
        <Text style={styles.text} >
        🔆
        </Text>
        <Text style={{...styles.text, ...style}}>
          Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  settingsList: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginRight: 10,
  },
});
