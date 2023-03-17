import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Animated, PanResponder, StyleSheet, View, Text } from "react-native"
import { StateContext } from "../context/ContextProvider"

export default function DraggableWord({word} : props) {
  const { setScrollable, dropzoneRef } = useContext(StateContext)
  const [backgroundColor, setBackgroundColor] = useState('white')
  const wordRef = useRef(null)

  const pan = useRef(new Animated.ValueXY()).current

  const wordWithinBound = () => {
    wordRef.current.measure((x, y, width, height, pageX, pageY) => {
      console.log("wordRef", pageX, pageY)
      dropzoneRef?.current[1].current.measure((x2, y2, width2, height2, pageX2, pageY2) => {
        console.log("dropzoneRef", pageX2, pageY2)
      })
    })
  }
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
      onPanResponderRelease: (event, gesture) => {
        setBackgroundColor('blue')
        wordWithinBound()
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
        wordWithinBound()
        pan.extractOffset()
      }
    })
  }, [dropzoneRef])

  const test = () => {
    setScrollable(true)
  }
  return(
    <Animated.View ref={wordRef}
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