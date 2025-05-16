import {isExpired} from 'react-jwt';
import {Alert} from 'react-native';
import {storagePropertiesName} from 'src/constants';
import {mmkvStorage} from 'src/libs/mmvkStorage';

const verifyToken = (token?: string | null) => {
  if (!token) {return false;}
  if (isExpired(token)) {
    Alert.alert('Notification', 'Login session is expired');
    mmkvStorage.removeItems([
      storagePropertiesName.authToken,
      storagePropertiesName.userInfo,
    ]);
    return false;
  }
  return true;
};

export {verifyToken};
