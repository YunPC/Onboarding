import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  NativeModules,
  Pressable,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const RandomScreen = () => {
  const {RandomModule} = NativeModules;
  const [backgroundColor, setBackgroundColor] = useState('orange');
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
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
      // console.log(translateX.value);
    },
    onEnd: () => {},
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          RandomModule.getRandomColor().then(value => {
            const [red, green, blue] = value;
            setBackgroundColor(`rgb(${red}, ${green}, ${blue})`);
          });
        }}>
        <Text style={styles.button}>Get Color!</Text>
      </Pressable>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.box, {backgroundColor}, rStyle]} />
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
