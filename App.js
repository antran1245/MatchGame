import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WordsList from './components/WordsList';

export default function App() {
  const [words, setWords] = useState([])
  const [definition, setDefinition] = useState([])

  useEffect (() => {
    let findWords = () => {
      fetch("https://random-word-api.herokuapp.com/word?number=5")
      .then(resp => resp.json())
      .then(data => {
        setWords(data)
      })
      .catch(err => console.error(err))
    }
    if(words !== 0) {
      findWords()
    }
  }, [])
  
  useEffect(() => {
    let findDefinition = async() => {
      let temp = []
      for(const item of words) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${item}`)
        const data = await resp.json()
        if(data.length > 0) {
          temp.push(data[0])
        } else {
          console.log(item, data)
        }
      }
      setDefinition([...temp])
    }
    findDefinition()
  }, [words])
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
