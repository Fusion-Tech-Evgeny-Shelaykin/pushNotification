import {
  PokemonBase,
  ShortPokemonsList,
  ExtendedAbility,
  LoadPokemonsParams,
} from '../types/pokemon';
import api from './index';

export const loadPokemons = async (
  params: LoadPokemonsParams,
): Promise<ShortPokemonsList[]> => {
  return api.get('', {
    params,
  });
};

export const loadPokemon = async (name: string): Promise<PokemonBase> => {
  return api.get(`/${name}`);
};

export const loadPersonAbility = async (
  url: string,
): Promise<ExtendedAbility> => {
  return await api.get(url);
};

export default {
  loadPersonAbility,
  loadPokemons,
  loadPokemon,
};
