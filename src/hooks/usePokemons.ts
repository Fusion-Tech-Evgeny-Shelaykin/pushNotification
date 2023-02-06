import {loadPersonAbility, loadPokemon, loadPokemons} from '../api/pokeApi';
import {setExtendedAbilities} from '../store/poke/reducer';
import {ExtendedAbility, LoadPokemonsParams} from '../types/pokemon';
import {useAppDispatch} from './useStore';

const usePokemons = () => {
  const dispatch = useAppDispatch();
  const setAbilities = async (listUrl: Array<string>) => {
    try {
      const promiseList: Array<Promise<ExtendedAbility>> = listUrl.map(url => {
        return loadPersonAbility(url);
      });
      const result = await Promise.all(promiseList);
      dispatch(setExtendedAbilities(result));
    } catch (err) {}
  };

  const setPokemons = async (params: LoadPokemonsParams) => {
    try {
      const data = await loadPokemons(params);
      const results = await data.map((person: {name: string}) => {
        return loadPokemon(person.name);
      });
      dispatch({type: 'pokeApi/setPokemons', payload: results});
    } catch (err) {}
  };

  return {
    setPokemons,
    setAbilities,
  };
};

export default usePokemons;
