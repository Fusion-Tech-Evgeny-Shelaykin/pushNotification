/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import PersonInfo from '../../components/PersonInfo';
import {useRootSelector} from '../../store/storeHook';
import styles from './HomeScreen.styles';
import usePokemons from '../../hooks/usePokemons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import PushNotifire from '../../components/PushNotifier';
import {showNotifier} from '../../utils/customPushNotifier';
import {RootStackParamList} from '../../navigation/MainStack';
import useMessaging from '../../hooks/useMessaging';

const HomeScreen: React.FC = () => {
  const {setPokemons} = usePokemons();
  const {
    requestNotificationsPermission,
    onNotificationReceived,
    onPressPushNotificationOpenedApp,
    onBackgroundAppPushMessageHandler,
    onForegroundPushNotificationReceived,
  } = useMessaging();
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
  }, []);

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
      showNotifier({
        PushComponent: PushNotifire,
        description: message,
        typeMess: type,
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
    showNotifier({
      PushComponent: PushNotifire,
      description: message,
      typeMess: type,
    });
  };

  const getToken = useCallback(
    async () => await requestNotificationsPermission(),
    [requestNotificationsPermission],
  );

  useEffect(() => {
    const token = getToken();
    if (token) {
      console.log('PushNotification.Token', token);
      onNotificationReceived(onResMessage);
    }
  }, []);

  useEffect(() => {
    onPressPushNotificationOpenedApp(onPushPress);
    onBackgroundAppPushMessageHandler(onBackgroundAppMessage);
    const unsubscribe =
      onForegroundPushNotificationReceived(onForegroundMessage);
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
              keyExtractor={item => `${item.name}---${item.id}`}
            />
          )}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default HomeScreen;
