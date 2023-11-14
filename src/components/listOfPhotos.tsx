import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, Button } from 'react-native'
import React from 'react'
import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_PHOTOS, OPTIONS_PHOTOS } from '../graphql/queries';

interface IItem {
  item: {
    id: number
    title: string
    url: string
    thumbnailUrl: string
  }
}

const listOfPhotos = () => {
  const {loading, error, data, networkStatus, refetch} = useQuery(GET_PHOTOS, {variables: OPTIONS_PHOTOS, notifyOnNetworkStatusChange: true});

  const renderItem = ({item}: IItem) => {
    return (
      <View style={styles.wrapper}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
        <View style={styles.wrapperTitle}>
          <Text>{item.title}</Text>
        </View>
      </View>
    )
  }

  const renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text>Data is empty</Text>
      </View>
    )
  }

  if (loading) return <ActivityIndicator size={"large"} color={'green'} />;

  if (error) return (<Text>{`Error: ${error}`}</Text>);

  if (networkStatus === NetworkStatus.refetch) {
    <View>
      <Button title='Reload' onPress={() => {
        refetch(OPTIONS_PHOTOS)
      }} />
    </View>
  }

  return (
    <View>
      <FlatList
        data={data?.photos?.data ?? []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        columnWrapperStyle={styles.columnStyle}
      />
    </View>
  )
}

export default listOfPhotos

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
    height: 150,
  },
  wrapper: {
    width: '49%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(0,0,0, 0.3)',
    // overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  },
  gap: {
    height: 8
  },
  columnStyle: {
    justifyContent: 'space-between'
  },
  wrapperTitle: {
    padding: 5,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})