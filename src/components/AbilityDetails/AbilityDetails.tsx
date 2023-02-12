import React, {FC} from 'react';
import {View, FlatList} from 'react-native';

import {ExtendedAbility} from '../../types/pokemon';
import Effect from '../Effect/Effect';
import Flavor from '../Flavor/Flavor';
import styles from './AbilityDetails.styles';

type Props = {
  abilities: ExtendedAbility;
  ind: number;
};

const AbilityDetails: FC<Props> = ({abilities}) => (
  <View>
    <FlatList
      data={abilities.flavor_text_entries
        .filter(i => i.language.name === 'en')
        .map((item, index) => {
          return {flavor: item, ind: index};
        })}
      renderItem={({item}) => (
        <View style={styles.flavorContainer}>
          <Flavor flavor={item.flavor} />
        </View>
      )}
      keyExtractor={({ind}) => `${ind}-flavor`}
    />
    <FlatList
      data={abilities.effect_entries
        .filter(i => i.language.name === 'en')
        .map((item, index) => {
          return {effect: item, ind: index};
        })}
      renderItem={({item}) => (
        <View style={styles.effectContainer}>
          <Effect effect={item.effect} />
        </View>
      )}
      keyExtractor={({ind}) => `${ind}-effect`}
    />
  </View>
);

export default AbilityDetails;
