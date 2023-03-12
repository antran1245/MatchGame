import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ContextProvider from '../context/ContextProvider';

export default function DefinitionsList({ definition } : props) {
  const state = useContext(ContextProvider)
  return(
    <ScrollView style={styles.container} scrollEnabled={state.scrollable}>
      {definition.map((item, index) => {
        return <View style={styles.box} key={index}>
          <Text>{item.word} {item.meanings[0].definitions[0].definition}</Text>
        </View>
      })}
    </ScrollView>
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
