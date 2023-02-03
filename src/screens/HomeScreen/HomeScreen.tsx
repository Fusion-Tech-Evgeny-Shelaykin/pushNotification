import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PushNotificationController from '../../utils/pushNotification';
import PushNotifire from '../../components/pushNotifier';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Notifier} from 'react-native-notifier';
import PersonInfo from '../../components/PersonInfo';
import {useRootSelector} from '../../store/storeHook';
import styles from './HomeScreen.styles';
import usePokemons from '../../hooks/usePokemons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

const HomeScreen: React.FC = () => {
  const {setPokemons} = usePokemons();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const pokemons = useRootSelector(state => state.poke.pokemons);
  const filteredPokemons = useRootSelector(
    state => state.poke.filteredPokemons,
  );
  const filter = useRootSelector(state => state.poke.filter.ability);
  const [offset, setOfset] = useState(0);

  const getPokemonsList = useCallback(
    async (nextItem: number) => {
      try {
        setPokemons({
          limit: 10,
          offset: nextItem,
        });
      } catch {}
    },
    [setPokemons],
  );

  useEffect(() => {
    getPokemonsList(0);
  }, [getPokemonsList]);

  const loadNextHandler = () => {
    const next = offset + 10;
    setOfset(next);
    getPokemonsList(next);
  };

  const onResMessage = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log('messageId---------------', message.messageId);
  };

  const onPushPress = useCallback(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('Profile', {PokeId: 0});
      const message = remoteMessage.notification?.body || 'empty message';
      const type = remoteMessage.data.type;
      Notifier.showNotification({
        Component: PushNotifire,
        componentProps: {
          typeMess: type,
          description: message,
        },
      });
    },
    [navigation],
  );

  const onBackgroundAppMessage = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log(
      'Message handled in the background!',
      remoteMessage.notification,
    );
  };
  const onForegroundMessage = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const message = remoteMessage.notification?.body || 'empty message';
    const type = remoteMessage.data.type;
    Notifier.showNotification({
      Component: PushNotifire,
      componentProps: {
        typeMess: type,
        description: message,
      },
    });
  };

  useEffect(() => {
    PushNotificationController.requestNotificationsPermission();
    console.log(
      'PushNotificationController.Token',
      PushNotificationController.Token,
    );
    PushNotificationController.onNotificationReceived(onResMessage);
  }, []);

  useEffect(() => {
    PushNotificationController.onPressPushNotificationOpenedApp(onPushPress);
    PushNotificationController.onBackgroundAppPushMessageHandler(
      onBackgroundAppMessage,
    );
    const unsubscribe =
      PushNotificationController.onForegroundPushNotificationReceived(
        onForegroundMessage,
      );
    return unsubscribe;
  }, [onPushPress]);

  return (
    <View>
      <View>
        <SafeAreaView style={styles.screenContainer}>
          {!filter ? (
            <FlatList
              contentContainerStyle={styles.footerList}
              onEndReached={loadNextHandler}
              data={pokemons}
              ListFooterComponent={<ActivityIndicator size="large" />}
              renderItem={({item}) => (
                <View style={styles.personItemContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Profile', {PokeId: item.id})
                    }>
                    <PersonInfo person={item} />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.name}
            />
          ) : (
            <FlatList
              contentContainerStyle={styles.footerList}
              onEndReached={loadNextHandler}
              data={filteredPokemons}
              ListFooterComponent={<ActivityIndicator size="large" />}
              renderItem={({item}) => (
                <View style={styles.personItemContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Profile', {PokeId: item.id})
                    }>
                    <PersonInfo person={item} />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.name}
            />
          )}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default HomeScreen;
