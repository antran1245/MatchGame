import { useContext, useRef, useState } from "react"
import { Animated, PanResponder, StyleSheet, View, Text } from "react-native"
import { StateContext } from "../context/ContextProvider"

export default function DraggableWord({word} : props) {
  const { setScrollable } = useContext(StateContext)
  const [color, setColor] = useState('white')

  const pan = useRef(new Animated.ValueXY()).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
      onPanResponderRelease: (event, gesture) => {
        setColor('blue')
        pan.extractOffset()
      }
    })
  ).current

  return(
    <Animated.View
      style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
      {...panResponder.panHandlers} onTouchStart={() => setScrollable(true)} onTouchEnd={() => setScrollable(true)}>
      <View style={[styles.word_container, {backgroundColor: color}]}>
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
    borderRadius: 30,
  }
})