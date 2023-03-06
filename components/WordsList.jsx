import { StyleSheet, Text, View } from 'react-native';

export default function WordsList({ words } : props) {
  return(
    <View style={styles.container}>
      {words.map((text, index) => {
        return <View style={styles.word_container} key={index}>
          <Text>{text}</Text>
        </View>
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
    position: 'absolute',
    bottom: 0
  },
  word_container: {
    backgroundColor: '#F7F5EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: 30
  }
})