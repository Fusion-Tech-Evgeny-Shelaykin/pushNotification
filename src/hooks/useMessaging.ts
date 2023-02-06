import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

const useMessaging = () => {
  const onNotificationReceived = (
    func: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
  ) => {
    messaging().setBackgroundMessageHandler(message => func(message));
  };

  const onPressPushNotificationOpenedApp = (
    func: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
  ) => {
    messaging().onNotificationOpenedApp(remoteMessage => func(remoteMessage));
  };

  const onBackgroundAppPushMessageHandler = (
    func: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
  ) => {
    messaging().setBackgroundMessageHandler(remoteMessage =>
      func(remoteMessage),
    );
  };

  const onForegroundPushNotificationReceived = (
    func: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
  ) => {
    messaging().onMessage(remoteMessage => func(remoteMessage));
  };

  const requestNotificationsPermission = async (): Promise<string> => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
    if (enabled) {
      const token = await messaging().getToken();
      console.log('this.token', token);
      return token;
    }
    return '';
  };

  const removeToken = async () => {
    await messaging().deleteToken();
    await messaging().unregisterDeviceForRemoteMessages();
  };

  return {
    requestNotificationsPermission,
    removeToken,
    onNotificationReceived,
    onPressPushNotificationOpenedApp,
    onBackgroundAppPushMessageHandler,
    onForegroundPushNotificationReceived,
  };
};

export default useMessaging;
