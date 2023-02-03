import React from 'react';
import {View, Text} from 'react-native';

import {FlavorEntries} from '../../types/pokemon';
import styles from './Flavor.styles';

const Flavor: React.FC<{flavor: FlavorEntries}> = ({flavor}) => (
  <View>
    <Text
      style={
        styles.abilityItemText
      }>{`${flavor.version_group.name} ${flavor.flavor_text}`}</Text>
  </View>
);

export default Flavor;
