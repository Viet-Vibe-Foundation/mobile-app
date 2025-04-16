import React, {ReactNode, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

interface Props {
  isOpen: boolean;
  toggleSheet: () => void;
  duration?: number;
  children: ReactNode | SharedValue<ReactNode>;
}

const BottomSheet = ({
  isOpen,
  toggleSheet,
  duration = 500,
  children,
}: Props) => {
  const height = useSharedValue(0);
  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = withTiming(isOpen ? 0 : 1, {duration});
  }, [isOpen]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: progress.value * 2 * height.value}],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen ? 1 : withDelay(duration, withTiming(-1, {duration: 0})),
  }));

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={styles.flex} onPress={toggleSheet} />
      </Animated.View>
      <Animated.View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[styles.sheet, sheetStyle]}>
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  sheet: {
    padding: 16,
    height: 150,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default BottomSheet;
