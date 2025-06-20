import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {StyleSheet, Text, ColorValue} from 'react-native';
import SearchScreen from './search/SearchScreen';
import SettingScreen from './setting/SettingScreen';
import HomeScreen from './home/HomeScreen';
import HeaderComponent from '@components/HeaderComponent';
import {MaterialIconName} from '@custom-types/materialType';
import {appColor} from '@styles/appColor';
import {useTranslation} from 'react-i18next';
import {useAppColor} from 'src/hooks/useAppColor';

const Tab = createBottomTabNavigator();
const renderHeader = () => <HeaderComponent />;
const renderTabBarIcon = (
  focused: boolean,
  name: MaterialIconName,
  color: ColorValue,
) => {
  return (
    <MaterialIcons
      name={name}
      style={[focused ? styles.iconFocused : {color: color}]}
      size={24}
    />
  );
};

const CustomTabarLabel = (props: {
  focused: boolean;
  color: string;
  children: string;
}) => {
  const {t} = useTranslation();
  return (
    props.focused && (
      <Text style={[styles.tabbarLabel, {color: props.color}]}>
        {t(props.children)}
      </Text>
    )
  );
};

const MainScreen = () => {
  const theme = useAppColor();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.headerColor,
        },
        header: renderHeader,
        animation: 'shift',
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({focused}) =>
            renderTabBarIcon(focused, 'home', theme.onPrimary),
          tabBarLabel: ({focused, children}) =>
            CustomTabarLabel({focused, color: theme.primaryColor, children}),
        }}
      />

      <Tab.Screen
        name={'Search'}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) =>
            renderTabBarIcon(focused, 'search', theme.onPrimary),
          tabBarLabel: ({focused, children}) =>
            CustomTabarLabel({focused, color: theme.primaryColor, children}),
        }}
      />
      <Tab.Screen
        name={'More'}
        component={SettingScreen}
        options={{
          header: renderHeader,
          tabBarIcon: ({focused}) =>
            renderTabBarIcon(focused, 'list', theme.onPrimary),
          tabBarLabel: ({focused, children}) =>
            CustomTabarLabel({focused, color: theme.primaryColor, children}),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconFocused: {
    color: appColor.primaryColor,
  },
  tabbarLabel: {marginTop: -5},
});

export default MainScreen;
