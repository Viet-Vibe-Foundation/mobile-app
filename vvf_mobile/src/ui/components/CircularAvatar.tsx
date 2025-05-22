import React, {useState} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  ImageErrorEventData,
  NativeSyntheticEvent,
} from 'react-native';
import {appColor} from '@constants';

interface Prop {
  imageUrl?: string;
  size?: number;
}

const CircularAvatar: React.FC<Prop> = ({imageUrl, size = 50}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View
      style={[
        styles.container,
        {width: size, height: size, borderRadius: size / 2},
      ]}>
      {loading && (
        <ActivityIndicator
          size="small"
          color={appColor.textSecondary}
          style={StyleSheet.absoluteFill}
        />
      )}
      <Image
        source={
          imageUrl
            ? {
                uri: imageUrl,
              }
            : require('@assets/images/main-logo.png')
        }
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(error: NativeSyntheticEvent<ImageErrorEventData>) =>
          console.log(error.nativeEvent.error)
        }
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appColor.textSecondary,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default CircularAvatar;
