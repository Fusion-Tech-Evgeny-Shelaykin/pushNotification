import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useRootSelector} from '../../store/storeHook';
import {isVisible} from '../../store/poke/reducer';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import AbilityDetails from '../../components/AbilityDetails';
import styles from './ProfileScreen.styles';
import usePokemons from '../../hooks/usePokemons';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileParams, RootStackParamList} from '../../navigation/MainStack';

const Profile = () => {
  const {
    params: {PokeId},
  } = useRoute<ProfileParams>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {setAbilities} = usePokemons();
  const pokemons = useRootSelector(({poke}) => poke.pokemons);
  const abilities = useRootSelector(({poke}) => poke.extendedAbilities);
  const dispatch = useAppDispatch();
  const [routes, setRoutes] = useState([{key: '', title: '', source: ''}]);
  const [activeSlide, setactiveSlide] = useState(0);

  const isShowHideHandter = () => {
    dispatch(isVisible());
  };
  const personData = pokemons.find(el => el.id === PokeId);
  const listAbilitiesUrl = personData?.abilities.map(item => item.ability.url);

  const getPokeDetails = useCallback(async () => {
    if (personData) {
      setRoutes([
        {
          key: 'front',
          title: 'Front',
          source: personData?.sprites.front_default,
        },
        {
          key: 'back',
          title: 'Back',
          source: personData?.sprites.back_default,
        },
        {
          key: 'frontShiny',
          title: 'Front Shiny',
          source: personData?.sprites.front_shiny,
        },
        {
          key: 'backShiny',
          title: 'Back Shiny',
          source: personData?.sprites.back_shiny,
        },
      ]);
      if (listAbilitiesUrl) {
        await setAbilities(listAbilitiesUrl);
      }
    }
  }, [setAbilities, listAbilitiesUrl, personData]);

  useEffect(() => {
    getPokeDetails();
  }, [getPokeDetails]);

  interface ILogo {
    source: string;
  }
  const logoItem: React.FC<{item: ILogo}> = ({item}) => {
    return (
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: item.source,
          }}
          style={styles.person}
        />
      </View>
    );
  };
  const onPressButton = () => {
    navigation.navigate('Profile', {PokeId});
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.carouselView}>
        <Carousel
          style={styles.carousel}
          data={routes}
          renderItem={logoItem}
          sliderWidth={420}
          itemWidth={240}
          onSnapToItem={index => setactiveSlide(index)}
        />
      </View>
      <Pagination
        dotsLength={routes.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
      {personData && (
        <View style={styles.viewTitleText}>
          <Text style={styles.titleText}>{personData.name}</Text>
        </View>
      )}
      <View style={styles.like}>
        <TouchableOpacity
          style={styles.buttonArrea}
          onPress={isShowHideHandter}>
          <MaterialCommunityIcons name="heart" color="#576270" size={25} />
          <Text style={styles.textLike}>Like!</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.sectionContainer}>
        <Text style={styles.personInfo}>Abillity:</Text>
        <FlatList
          data={abilities}
          renderItem={({item, index}) => (
            <AbilityDetails abilities={item} ind={index} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
      <View style={styles.backToPerson}>
        <CustomButton onPress={onPressButton} text="Back" />
      </View>
    </View>
  );
};

export default Profile;
