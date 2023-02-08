import React, {FC} from 'react';
import {View, Text} from 'react-native';

import {FlavorEntries} from '../../types/pokemon';
import styles from './Flavor.styles';

type Props = {
  flavor: FlavorEntries;
};

const Flavor: FC<Props> = ({flavor}) => (
  <View>
    <Text
      style={
        styles.abilityItemText
      }>{`${flavor.version_group.name} ${flavor.flavor_text}`}</Text>
  </View>
);

export default Flavor;
