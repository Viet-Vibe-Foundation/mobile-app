import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {appColor} from '../../constants';
import {Text} from 'react-native';
import SearchScreen from './search/SearchScreen';
import SettingScreen from './setting/SettingScreen';
import HomeScreen from './home/HomeScreen';
import HeaderComponent from '../components/HeaderComponent';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: 15,
          backgroundColor: appColor.toolBarColor,
        },
        header: (prop: BottomTabHeaderProps) => <HeaderComponent />,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,

          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={'home'}
              style={{color: focused ? appColor.primaryColor : 'black'}}
              size={20}
            />
          ),
          tabBarLabel: ({focused}) =>
            focused && <Text style={{color: appColor.primaryColor}}>Home</Text>,
        }}
      />

      <Tab.Screen
        name="Seacrh"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={'search'}
              style={{color: focused ? appColor.primaryColor : 'black'}}
              size={20}
            />
          ),
          tabBarLabel: ({focused}) =>
            focused && (
              <Text style={{color: appColor.primaryColor}}>Seacrh</Text>
            ),
        }}
      />
      <Tab.Screen
        name="More"
        component={SettingScreen}
        options={{
          headerTitle: () => <HeaderComponent />,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={'list'}
              style={{color: focused ? appColor.primaryColor : 'black'}}
              size={20}
            />
          ),
          tabBarLabel: ({focused}) =>
            focused && <Text style={{color: appColor.primaryColor}}>More</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
