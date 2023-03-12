import { useContext, useRef } from "react"
import { Animated, PanResponder, StyleSheet, View, Text } from "react-native"
import ContextProvider from "../context/ContextProvider"

export default function DraggableWord({word} : props) {
  const state = useContext(ContextProvider)

  const pan = useRef(new Animated.ValueXY()).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
      onPanResponderRelease: () => {
        pan.extractOffset()
      }
    })
  ).current
  
  return(
    <Animated.View
      style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
      {...panResponder.panHandlers} onTouchStart={() => state.setScrollable(false)} onTouchEnd={() => state.setScrollable(true)}>
      <View style={styles.word_container}>
        <Text>{word}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  word_container: {
    backgroundColor: '#F7F5EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: 30
  }
})