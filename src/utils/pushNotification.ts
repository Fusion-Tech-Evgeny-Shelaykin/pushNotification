import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

class PushNotificationController {
  private token: string | undefined;
  private enabled = true;

  public get Token() {
    return this.token;
  }

  public get Enabled() {
    return this.enabled;
  }

  public set Enabled(enabled: boolean) {
    this.enabled = enabled;
  }

  onNotificationReceived = (
    func: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
  ) => {
    messaging().setBackgroundMessageHandler(message => func(message));
  };

  onPressPushNotificationOpenedApp = (
    func: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
  ) => {
    messaging().onNotificationOpenedApp(remoteMessage => func(remoteMessage));
  };

  onBackgroundAppPushMessageHandler = (
    func: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
  ) => {
    messaging().setBackgroundMessageHandler(remoteMessage =>
      func(remoteMessage),
    );
  };

  onForegroundPushNotificationReceived = (
    func: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
  ) => {
    messaging().onMessage(remoteMessage => func(remoteMessage));
  };

  requestNotificationsPermission = async (): Promise<void> => {
    const authStatus = await messaging().requestPermission();
    this.enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
    if (this.enabled) {
      this.token = await messaging().getToken();
      console.log('this.token', this.token);
    }
  };

  removeToken = async () => {
    await messaging().deleteToken();
    await messaging().unregisterDeviceForRemoteMessages();
    this.token = undefined;
  };
}

export default new PushNotificationController();
