import React, {ReactNode, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {useAppColor} from 'src/hooks/useAppColor';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

interface BottomSheetProps {
  isOpen: boolean;
  toggleSheet: () => void;
  children: ReactNode;
  duration?: number;
}

const BottomSheet = ({
  isOpen,
  toggleSheet,
  children,
  duration = 300,
}: BottomSheetProps) => {
  const theme = useAppColor();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({y: 0});

  useEffect(() => {
    translateY.value = withTiming(isOpen ? 0 : SCREEN_HEIGHT, {duration});
  }, [isOpen, duration, translateY]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      const offset = context.value.y + event.translationY;
      translateY.value = Math.max(offset, 0);
    })
    .onEnd(() => {
      if (translateY.value > SCREEN_HEIGHT * 0.3) {
        runOnJS(toggleSheet)();
      } else {
        translateY.value = withTiming(0, {duration});
      }
    });

  const rSheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const rBackdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, SCREEN_HEIGHT],
      [0.5, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      pointerEvents: isOpen ? 'auto' : 'none',
    };
  });

  return (
    <>
      <Animated.View style={[styles.backdrop, rBackdropStyle]}>
        <TouchableWithoutFeedback onPress={toggleSheet}>
          <View style={styles.flex} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.sheetContainer,
            rSheetStyle,
            {backgroundColor: theme.cardColor},
          ]}>
          <View style={styles.indicator} />
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 10,
  },
  flex: {
    flex: 1,
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
    paddingTop: 8,
    paddingHorizontal: 16,
    zIndex: 50,
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default BottomSheet;
