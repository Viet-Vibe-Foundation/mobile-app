import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from 'src/ui/main';
import PostScreen from 'src/ui/main/post/PostScreen';
import HeaderComponent from 'src/ui/components/HeaderComponent';
import {appColor} from 'src/constants';
import EventDetailScreen from 'src/ui/main/event/EventDetailScreen';

const Stack = createNativeStackNavigator();

const MainRoute: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        statusBarTranslucent: true,
        headerTitleAlign: 'center',
        header: () => <HeaderComponent isMainRouter={true} />,
      }}>
      <Stack.Screen
        name="Index"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerTintColor: appColor.primaryColor,
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{
          headerTintColor: appColor.primaryColor,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainRoute;
