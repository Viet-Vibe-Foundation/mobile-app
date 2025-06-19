import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {MaterialIconName} from '@custom-types/materialType';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {appColor} from '@styles/appColor';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Prop {
  icon: MaterialIconName;
  onPress: () => void;
}

const FAB_WIDTH = 60;
const FAB_HEIGHT = FAB_WIDTH;
const FAB_BORDER_RADIUS = FAB_WIDTH / 2;
const FAB_MARGIN = 30;

const DraggableFloattingButton = ({icon, onPress}: Prop) => {
  const safeArea = useSafeAreaInsets();
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

  const MAX_X = SCREEN_WIDTH - FAB_WIDTH - FAB_MARGIN;
  const MIN_X = FAB_MARGIN;
  const MAX_Y = SCREEN_HEIGHT - FAB_HEIGHT - FAB_MARGIN - safeArea.bottom;
  const MIN_Y = safeArea.top + FAB_MARGIN;

  const positionX = useSharedValue(MAX_X);
  const positionY = useSharedValue(MAX_Y);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(onPress)();
  });

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      'worklet';
      startX.value = positionX.value;
      startY.value = positionY.value;
    })
    .onUpdate(e => {
      'worklet';
      positionX.value = startX.value + e.translationX;
      positionY.value = startY.value + e.translationY;
    })
    .onEnd(_ => {
      'worklet';
      if (positionX.value < MIN_X) {
        positionX.value = withTiming(MIN_X, {duration: 300});
      } else if (positionX.value > MAX_X) {
        positionX.value = withTiming(MAX_X, {duration: 300});
      }
      if (positionY.value < MIN_Y) {
        positionY.value = withTiming(MIN_Y, {duration: 300});
      } else if (positionY.value > MAX_Y) {
        positionY.value = withTiming(MAX_Y, {duration: 300});
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: positionX.value,
    top: positionY.value,
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(panGesture, tap)}>
      <Animated.View style={[styles.fabButtonStyles, animatedStyle]}>
        <MaterialIcon name={icon} size={30} color={'white'} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  fabButtonStyles: {
    width: FAB_WIDTH,
    height: FAB_HEIGHT,
    borderRadius: FAB_BORDER_RADIUS,
    backgroundColor: appColor.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default DraggableFloattingButton;
