import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {RandomModule} from './lib/random';

const RandomScreen = () => {
  const [backgroundColor, setBackgroundColor] = useState('orange');

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const dragView = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      translateX: number;
      translateY: number;
    }
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {},
  });

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const changeColor = () => {
    RandomModule.getRandomColor().then(value => {
      const [red, green, blue] = value;
      setBackgroundColor(`rgb(${red}, ${green}, ${blue})`);
    });
  };

  return (
    <SafeAreaView>
      <Pressable onPress={changeColor}>
        <Text style={styles.button}>Get Color!</Text>
      </Pressable>
      <PanGestureHandler onGestureEvent={dragView}>
        <Animated.View
          style={[styles.box, {backgroundColor}, transformStyle]}
        />
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'orange',
  },
  button: {
    fontSize: 50,
  },
});

export default RandomScreen;
