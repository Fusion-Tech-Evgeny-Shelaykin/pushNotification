import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Profile: {
    PokeId: number;
  };
  Home: undefined;
};

export type ProfileParams = RouteProp<RootStackParamList, 'Profile'>;
