import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StateContext } from '../context/ContextProvider';

export default function Definitions({item} : props) {
  const state = useContext(StateContext)

  const onlayout = (event) => {
    let {layout} = event.nativeEvent
    console.log(layout)
    state.setDefinitionLocation(oldArray => [...oldArray, layout])
  }

  return(
    <View style={styles.box} onLayout={onlayout}>
      <Text>{item.word} {item.meanings[0].definitions[0].definition}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginTop: 10
  }
});