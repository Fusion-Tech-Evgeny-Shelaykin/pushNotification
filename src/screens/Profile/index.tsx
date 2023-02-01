import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.rootContainer}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default ProfileScreen;
