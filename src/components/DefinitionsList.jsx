import { useCallback, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StateContext } from '../context/ContextProvider';

export default function DefinitionsList({ definition } : props) {
  const {scrollable} = useContext(StateContext)

  const onLayout = useCallback(event => {
    console.log(event.nativeEvent.layout)
  }, [])
  return(
    <ScrollView style={styles.container} scrollEnabled={scrollable}>
      {definition.map((item, index) => {
        return <View style={styles.box} key={index} onLayout={onLayout}>
          <Text>{item.word} {item.meanings[0].definitions[0].definition}</Text>
        </View>
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  box: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginTop: 10
  }
});
