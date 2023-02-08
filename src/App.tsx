import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierRoot, NotifierWrapper} from 'react-native-notifier';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './navigation/MainStack';
import {store} from './store/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={styles.rootContainer}>
          <NotifierWrapper>
            <MainStack />
            <NotifierRoot />
          </NotifierWrapper>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default App;
