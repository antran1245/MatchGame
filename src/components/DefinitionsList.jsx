import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StateContext } from '../context/ContextProvider';
import Definitions from './Definitions';

export default function DefinitionsList({ definition } : props) {
  const state = useContext(StateContext)

  return(
    <ScrollView style={styles.container} scrollEnabled={state.scrollable}>
      {definition.map((item, index) => {
        return <Definitions item={item} key={index}/>
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
