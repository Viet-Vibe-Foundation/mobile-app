import {View, Text} from 'react-native';
import React from 'react';

interface Props {
  name: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
}

const UserInfoComponent = ({name, email, phone, address, imageUrl}: Props) => {
  return (
    <View>
      <Text>UserInfoComponent</Text>
    </View>
  );
};

export default UserInfoComponent;
