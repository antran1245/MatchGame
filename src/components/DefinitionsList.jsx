import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StateContext } from '../context/ContextProvider';

export default function DefinitionsList({ definition } : props) {
  const {scrollable} = useContext(StateContext)
  return(
    <ScrollView style={styles.container} scrollEnabled={scrollable}>
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
