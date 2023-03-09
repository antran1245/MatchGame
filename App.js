import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DefinitionsList from './components/DefinitionsList';
import WordsList from './components/WordsList';

export default function App() {
  const [list, setList] = useState([])
  const [words, setWords] = useState([])
  const [definition, setDefinition] = useState([])

  /**
   * Fetch a total of 20 words that will be filter to 10.
   */
  useEffect (() => {
    let findWords = async() => {
      const resp = await fetch("https://random-word-api.herokuapp.com/word?number=20")
      const data = await resp.json()
      setList(data)
    }
    if(list.length === 0) {
      findWords()
    }
  }, [])
  
  /**
   * Find the definitions of the words that were generated randomly.
   * Some words could not be found with the API for definitions because the words contain suffix and could not be found.
   * Such as 'correctly' have the suffix is '-ly'.
   */
  useEffect(() => {
    let findDefinition = async() => {
      let temp = []
      let matchWords = []
      for(const item of list) {
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
    findDefinition()
  }, [list])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Word match Definition</Text>
      </View>
      <DefinitionsList definition={definition}/>
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
  header: {
    paddingTop: 25,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
