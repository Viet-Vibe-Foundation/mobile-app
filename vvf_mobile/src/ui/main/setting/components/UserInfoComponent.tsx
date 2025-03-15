import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CircularAvatar from 'src/ui/components/CircularAvatar';
import MaterialIcon from '@react-native-vector-icons/material-icons';

interface Props {
  name: string;
  email: string;
  image: string;
}

const UserInfoComponent = ({name, email, image}: Props) => {
  const handleAddImage = () => {};

  return (
    <View style={styles.container}>
      <View>
        <CircularAvatar imageUrl={image} />
        <TouchableOpacity
          onPress={handleAddImage}
          style={styles.addImageButton}>
          <MaterialIcon name="add" size={24} />
        </TouchableOpacity>
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
    gap: 10,
    borderRadius: 20,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    shadowOpacity: 0.1,
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
