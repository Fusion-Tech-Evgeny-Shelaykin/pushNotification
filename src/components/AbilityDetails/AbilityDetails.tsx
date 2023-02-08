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

const AbilityDetails: FC<Props> = ({abilities, ind}) => (
  <View>
    <FlatList
      data={abilities.flavor_text_entries.filter(i => i.language.name === 'en')}
      renderItem={({item}) => (
        <View style={styles.flavorContainer}>
          <Flavor flavor={item} />
        </View>
      )}
      listKey={`${ind.toString()}-flavor`}
      keyExtractor={item => `${item}-flavor`}
    />
    <FlatList
      data={abilities.effect_entries.filter(i => i.language.name === 'en')}
      renderItem={({item}) => (
        <View style={styles.effectContainer}>
          <Effect effect={item} />
        </View>
      )}
      listKey={ind.toString()}
      keyExtractor={({effect}) => `${effect}-effect`}
    />
  </View>
);

export default AbilityDetails;
