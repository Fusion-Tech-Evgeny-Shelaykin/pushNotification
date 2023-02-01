import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PushNotificationController from '../../utils/pushNotification';
import PushNotifire from '../../components/pushNotifier';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Notifier} from 'react-native-notifier';
import useAppNavigation from '../../hooks/useAppNavigation';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
    navigateToProfileScreen();
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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
