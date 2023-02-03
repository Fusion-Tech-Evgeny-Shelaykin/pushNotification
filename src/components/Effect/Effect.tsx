import React from 'react';
import {View, Text} from 'react-native';

import {EffectEntries} from '../../types/pokemon';
import styles from './Effect.styles';

const Effect: React.FC<{effect: EffectEntries}> = ({effect}) => (
  <View>
    <Text style={styles.abilityItemText}>{effect.effect}</Text>
  </View>
);

export default Effect;
