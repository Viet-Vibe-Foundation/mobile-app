import React, {memo} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {appColor} from '../../constants';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';

interface Prop {
  bottomTabHeaderProp?: BottomTabHeaderProps;
  isMainRouter?: boolean;
}

const HeaderComponent: React.FC<Prop> = ({
  bottomTabHeaderProp,
  isMainRouter = false,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={[styles.container, {height: bottomTabHeaderProp?.layout.height}]}>
      {/* Back Button - Only Shown if isMainRouter is True */}
      {isMainRouter && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <MaterialIcon
            name="arrow-back"
            size={24}
            color={appColor.primaryColor}
          />
        </TouchableOpacity>
      )}

      {/* Logo & Title */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@assets/images/main-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Viet Vibe Foundation</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4, // Adds shadow effect
  },

  backButton: {
    marginRight: 10,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColor.primaryColor,
  },
});

export default memo(HeaderComponent);
