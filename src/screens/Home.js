import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Chats from './tabScreens/Chats';
import Setting from './tabScreens/Setting';
import { ROUTES } from '../navigation/routes';

const Home = ({navigation}) => {

  const [selectedTab, setSelectedTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View showsVerticalScrollIndicator={false} style={{ ...styles.container, backgroundColor: darkMode ? '#1F2A36' : 'white' }}>
      <View style={{ ...styles.headerTextContainer, backgroundColor: darkMode ? '#273443' : '#215C54' }}>
        <View style={{flexDirection:'row', justifyContent:'space-between',alignContent:'center', paddingHorizontal:15, paddingVertical:20,}}>

        <Text style={{ ...styles.headerText }}>ChatApp</Text>
        <Text style={{fontSize:18, color:'white'}} onPress={()=>{navigation.navigate(ROUTES.LOGIN)}}>Logout</Text>
        </View>
        <View style={styles.btnTabs}>
          <TouchableOpacity
            onPress={() => setSelectedTab(0)}
            style={{
              ...styles.btnTabContainer,
            }}>
            <Text style={{ ...styles.tabIcons }}>Chats</Text>
            <View style={{ ...styles.tabIconsborder, backgroundColor: selectedTab === 0 ? 'white' : darkMode ? '#273443' : '#215C54', }}></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab(1)}
            style={{
              ...styles.btnTabContainer,
            }}>
            <Text style={styles.tabIcons}>Setting</Text>
            <View style={{ ...styles.tabIconsborder, backgroundColor: selectedTab === 1 ? 'white' : darkMode ? '#1F2A36' : '#215C54', }}></View>
          </TouchableOpacity>
        </View>
        {
          selectedTab === 0 ? <Chats style={{ backgroundColor: darkMode ? '#1F2A36' : 'white', color: darkMode ? 'white' : 'black' }} /> : <Setting toggleTheme={handleThemeToggle} style={{ backgroundColor: darkMode ? '#1F2A36' : 'white', color: darkMode ? 'white' : 'black' }} />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTextContainer: {
    backgroundColor: '#215C54',
  },
  headerText: {
    fontSize: Dimensions.get('window').height * 0.035,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'serif',
    // marginHorizontal: 15,
    // marginVertical: 20,
  },
  btnTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnTabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tabIconsborder: {
    height: 3,
    width: '90%',
    marginBottom: 2,
  },
  tabIcons: {
    color: 'white',
    fontSize: Dimensions.get('window').height * 0.023,
    fontWeight: 'bold',
    fontFamily: 'serif',
    margin: 10,
  },
});

export default Home;
