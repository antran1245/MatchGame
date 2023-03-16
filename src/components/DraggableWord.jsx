import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Animated, PanResponder, StyleSheet, View, Text } from "react-native"
import { StateContext } from "../context/ContextProvider"

export default function DraggableWord({word} : props) {
  const { setScrollable, dropzoneRef } = useContext(StateContext)
  const [backgroundColor, setBackgroundColor] = useState('white')

  const pan = useRef(new Animated.ValueXY()).current

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
      onPanResponderRelease: (event, gesture) => {
        setBackgroundColor('blue')
        console.log(dropzoneRef)
        pan.extractOffset()
      }
    })
  )

  useEffect(() => {
    panResponder.current = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
      onPanResponderRelease: (event, gesture) => {
        setBackgroundColor('blue')
        console.log(dropzoneRef)
        pan.extractOffset()
      }
    })
  }, [dropzoneRef])

  const test = () => {
    setScrollable(true)
  }
  return(
    <Animated.View
      style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
      {...panResponder.current?.panHandlers} onTouchStart={() => setScrollable(true)} onTouchEnd={() => test()}>
      <View style={[styles.word_container, {backgroundColor: backgroundColor}]}>
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
    borderWidth: 1,
    borderColor: 'black'
  }
})