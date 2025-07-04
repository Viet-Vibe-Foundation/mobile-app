import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import CircularAvatar from '@components/CircularAvatar';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import {cardStyles} from '@styles/cardStyles';

interface Props {
  name: string;
  email: string;
  image: string;
  showAddBtn?: boolean;
  onChangeImage?: () => void;
  style?: ViewStyle | ViewStyle[];
}

const UserInfoComponent = ({
  name,
  email,
  image,
  showAddBtn = false,
  onChangeImage,
  style,
}: Props) => {
  return (
    <View style={[cardStyles, styles.container, style]}>
      <View>
        <CircularAvatar imageUrl={image} />
        {showAddBtn && onChangeImage && (
          <TouchableOpacity
            onPress={onChangeImage}
            style={styles.addImageButton}>
            <MaterialIcon name="add" size={24} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  infoContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addImageButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 0.5,
  },
});

export default UserInfoComponent;
