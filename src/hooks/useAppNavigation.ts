import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback} from 'react';
import {RootStackParamList} from '../types/navigation';

const useAppNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateToHomeScreen = useCallback(
    () => navigation.navigate('Home'),
    [navigation],
  );

  const navigateToProfileScreen = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return {
    navigateBack,
    navigateToHomeScreen,
    navigateToProfileScreen,
  };
};

export default useAppNavigation;
