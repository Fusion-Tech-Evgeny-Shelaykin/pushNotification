import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, ProfileScreen} from '../Screens';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Profile: {
    PokeId: number;
  };
  Home: undefined;
};

export type ProfileParams = RouteProp<RootStackParamList, 'Profile'>;

const Stack = createStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
