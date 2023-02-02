import React, {useEffect, useState} from 'react';
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
import useAppNavigation from '../../hooks/useAppNavigation';
import styles from './styles';
import PersonInfo from '../../components/PersonInfo';
import {useAppDispatch, useRootSelector} from '../../store/storeHook';
import pokeApi from '../../api/pokeApi';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemons = useRootSelector(state => state.poke.pokemons);
  const filteredPokemons = useRootSelector(
    state => state.poke.filteredPokemons,
  );
  const filter = useRootSelector(state => state.poke.filter.ability);
  const [offset, setOfset] = useState(0);

  const getPokemonsList = async (nextItem: number) => {
    try {
      const persons = await pokeApi.loadPokemons({limit: 10, offset: nextItem});
      const results = await Promise.all(persons);
      dispatch({type: 'pokeApi/setPokemons', payload: results});
    } catch {
      // showMessage({
      //   message: 'load error',
      //   type: 'danger',
      // });
    }
  };

  useEffect(() => {
    getPokemonsList(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextHandler = () => {
    const next = offset + 10;
    setOfset(next);
    getPokemonsList(next);
  };

  const {navigateToProfileScreen} = useAppNavigation();

  const onResMessage = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log('messageId---------------', message.messageId);
  };

  const onPushPress = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigateToProfileScreen(0);
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
  }, []);

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
                    onPress={() => navigateToProfileScreen(item.id)}>
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
                    onPress={() => navigateToProfileScreen(item.id)}>
                    <PersonInfo person={item} />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.name}
            />
          )}
        </SafeAreaView>
        {/* <FilterDrawer /> */}
      </View>
    </View>
  );
};

export default HomeScreen;
