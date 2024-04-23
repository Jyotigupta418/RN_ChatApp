import { ActivityIndicator, Dimensions, Modal, StyleSheet, View,} from 'react-native'
import React from 'react'

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1af655" style={styles.activity}/>
      </View>
    </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({
  container:{
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  activity:{
    marginBottom:60,
  }
})