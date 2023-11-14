import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, Platform } from 'react-native'
import React from 'react'

import ListOfPhotos from '../components/listOfPhotos';

const PhotoList = () => {
  return (
    <View style={styles.container}>
      <ListOfPhotos />
    </View>
  )
}

export default PhotoList

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingBottom: 30,
    flex: 1,
  },
})