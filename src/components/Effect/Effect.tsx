import React from 'react';
import {View, Text} from 'react-native';

import {EffectEntries} from '../../types/pokemon';
import styles from './Effect.styles';

type Props = {
  effect: EffectEntries;
};

const Effect = ({effect}: Props) => (
  <View>
    <Text style={styles.abilityItemText}>{effect.effect}</Text>
  </View>
);

export default Effect;
