import { useContext, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StateContext } from '../context/ContextProvider';

export default function Definitions({item} : props) {
  const { addItemRef } = useContext(StateContext)
  const [word, setWord] = useState('')
  const ref = useRef()

  addItemRef([ref, setWord, item.word])
  return(
    <View style={styles.box} ref={ref}>
      <Text>{item.word} {item.meanings[0].definitions[0].definition}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginTop: 10,
    minHeight: 50
  }
});