import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WordsList from './components/WordsList';

export default function App() {
  const [words, setWords] = useState([])
  useEffect (() => {
    fetch("https://random-word-api.herokuapp.com/word?number=10")
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setWords(data)
    })
    .catch(err => console.error(err))
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <WordsList words={words}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
