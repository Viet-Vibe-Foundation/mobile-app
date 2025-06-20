import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {appColor} from '@styles/appColor';
import {useAppColor} from 'src/hooks/useAppColor';

interface Props {
  title: string;
  subTitle: string;
}

const AuthHeaderComponent = (prop: Props) => {
  const {title, subTitle} = prop;
  const theme = useAppColor();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.popTo('Main')}
        style={styles.existBtn}>
        <MaterialIcon name="close" />
      </TouchableOpacity>
      <View>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={(styles.subTitle, {color: theme.textSecondary})}>
          {subTitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    textAlign: 'left',
    fontSize: 30,
    color: appColor.primaryColor,
    marginVertical: 10,
    fontWeight: '600',
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '500',
  },
  existBtn: {
    position: 'absolute',
    top: 25,
    right: 0,
    backgroundColor: 'grey',
    borderRadius: 40,
    padding: 10,
  },
});

export default AuthHeaderComponent;
