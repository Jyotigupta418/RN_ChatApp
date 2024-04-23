import { View, Text, Button, Linking } from 'react-native'
import React from 'react'
import RootStack from './src/navigation/RootStack'

const App = () => {
  return (
    <View style={{flex:1}} > 
      <RootStack/>
    </View>
  )
}

export default App