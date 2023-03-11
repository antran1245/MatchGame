import { StyleSheet, Text, View } from 'react-native';
import DraggableWord from './DraggableWord';

export default function WordsList({ words } : props) {
  return(
    <View style={styles.container}>
      {words.map((text, index) => {
        return <DraggableWord key={index} word={text}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A0C3D2',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
    padding: 10,
  }
})