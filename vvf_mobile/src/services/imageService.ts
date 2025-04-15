import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {
  launchCamera,
  ImagePickerResponse,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';

export const useCamera = async (): Promise<ImagePickerResponse | undefined> => {
  try {
    const cameraOption: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.8,
    };

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permission Required',
          message: 'We need access to your camera to take pictures.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Camera permission was not granted');
        return;
      }
    }

    const result = await launchCamera(cameraOption);

    console.log(result);

    if (result.didCancel) {
      console.log('User cancelled camera');
      return;
    }

    if (result.errorCode) {
      Alert.alert('Camera Error', result.errorMessage || 'Unknown error');
      return;
    }

    return result;
  } catch (error: any) {
    console.error('Unexpected camera error:', error);
    Alert.alert('Unexpected Error', error?.message || 'Something went wrong');
  }
};

export const useGallery = async (): Promise<string | undefined> => {
  try {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };

    const response: ImagePickerResponse = await launchImageLibrary(options);

    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }

    if (response.errorCode) {
      Alert.alert('Gallery Error', response.errorMessage || 'Unknown error');
      return;
    }

    const asset = response.assets?.[0];
    if (!asset?.uri) {
      return;
    }

    return asset.uri;
  } catch (error: any) {
    console.error('Unexpected gallery error:', error);
    Alert.alert('Unexpected Error', error?.message || 'Something went wrong');
  }
};
