import {MaterialIconName} from '@custom-types/materialType';
import {StyleSheet, Dimensions} from 'react-native';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import {
  Gesture,
  GestureDetector,
  Pressable,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {appColor} from '@constants';

const {width, height} = Dimensions.get('window'); // Lấy chiều rộng và chiều cao của màn hình

const FAB_WIDTH = 60; // Chiều rộng của FAB
const FAB_HEIGHT = 60; // Chiều cao của FAB

// Đặt giới hạn của FAB để nó không ra ngoài màn hình
const END_POSITION_X = width - FAB_WIDTH - 20; // Giới hạn X để FAB không ra ngoài
const END_POSITION_Y = height - FAB_HEIGHT - 30; // Giới hạn Y để FAB không ra ngoài

interface Prop {
  icon: MaterialIconName;
  onPress: () => void;
}

const FloatingButton = ({icon, onPress}: Prop) => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      // Cập nhật vị trí của FAB trong khi di chuyển
      positionX.value = e.translationX;
      positionY.value = e.translationY;
    })
    .onEnd(() => {
      // Kiểm tra và giới hạn vị trí X và Y sau khi thả FAB
      const finalX = positionX.value;
      const finalY = positionY.value;

      // Giới hạn vị trí X (đảm bảo không ra ngoài bên trái hoặc bên phải màn hình)
      if (finalX > END_POSITION_X) {
        positionX.value = withTiming(END_POSITION_X, {duration: 300});
      } else if (finalX < 0) {
        positionX.value = withTiming(0, {duration: 300});
      } else {
        positionX.value = withTiming(finalX, {duration: 300});
      }

      // Giới hạn vị trí Y (đảm bảo không ra ngoài phía trên hoặc phía dưới màn hình)
      if (finalY > END_POSITION_Y) {
        positionY.value = withTiming(END_POSITION_Y, {duration: 300});
      } else if (finalY < 0) {
        positionY.value = withTiming(0, {duration: 300});
      } else {
        positionY.value = withTiming(finalY, {duration: 300});
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: positionX.value}, {translateY: positionY.value}],
  }));

  return (
    <GestureDetector gesture={panGesture} enableContextMenu={true}>
      <Pressable style={[styles.box, animatedStyle]} onPress={onPress}>
        <Animated.View>
          <MaterialIcon name={icon} style={styles.icon} size={24} />
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: appColor.primaryColor,
    position: 'absolute',
    bottom: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  icon: {
    resizeMode: 'contain',
    color: 'white',
  },
});

export default FloatingButton;
