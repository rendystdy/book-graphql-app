import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import PhotoList from './src/pages/photoList';

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});

export default function App() {
  const [mainPage, setMainPage] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMainPage(true);
    }, 3000);
  
    return () => {
      clearTimeout(timeoutId);
    }
  }, [])
  
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        {mainPage ? <PhotoList /> : <Text style={styles.title}>Book App</Text>}
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1
  }
});
