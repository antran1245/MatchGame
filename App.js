import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WordsList from './components/WordsList';

export default function App() {
  const [words, setWords] = useState([])
  const [definition, setDefinition] = useState([])

  /**
   * Fetch a total of 20 words that will be filter to 10.
   */
  useEffect (() => {
    let findWords = async() => {
      const resp = await fetch("https://random-word-api.herokuapp.com/word?number=20")
      const data = await resp.json()
      setWords(data)
    }
    if(words !== 0) {
      findWords()
    }
  }, [])
  
  /**
   * Find the definitions of the words that were generated randomly.
   * Some words could not be found with the API for definitions because the words contain suffix.
   * Such as 'correctly' have the suffix is '-ly'.
   */
  useEffect(() => {
    let findDefinition = async() => {
      let temp = []
      let matchWords = []
      for(const item of words) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${item}`)
        const data = await resp.json()
        if(data.length > 0) {
          temp.push(data[0])
          matchWords.push(data[0].word)
        }
        if(temp.length === 10) break
      }
      setDefinition([...temp])
      setWords([...matchWords])
    }
    if(definition.length !== 0) {
      findDefinition()
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! {definition.length}</Text>
      {definition.map((item, index) => {
        return <View key={index}>
          <Text>{item.word}</Text>
        </View>
      })}
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
