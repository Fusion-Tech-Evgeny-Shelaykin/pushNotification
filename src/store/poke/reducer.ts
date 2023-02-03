import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {PokemonBase, ExtendedAbility} from '../../types/pokemon';

export interface IPokeSlice {
  isNoticed: boolean;
  filteredPokemons: Array<PokemonBase>;
  filter: {ability: string};
  pokemons: Array<PokemonBase>;
  extendedAbilities: Array<ExtendedAbility>;
}

const initialState: IPokeSlice = {
  isNoticed: false,
  filteredPokemons: [],
  filter: {
    ability: '',
  },
  pokemons: [],
  extendedAbilities: [],
};

export const pokeApiSlice = createSlice({
  name: 'pokeApi',
  initialState,
  reducers: {
    isVisible: state => {
      state.isNoticed = !state.isNoticed;
    },
    setPokemons: (state, action: PayloadAction<Array<PokemonBase>>) => {
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
      };
    },
    setExtendedAbilities: (
      state,
      action: PayloadAction<Array<ExtendedAbility>>,
    ) => {
      return {
        ...state,
        extendedAbilities: action.payload,
      };
    },
    clearFilter: state => {
      return {
        ...state,
        filter: {
          ability: '',
        },
      };
    },
    setFilter: (state, action) => {
      return {
        ...state,
        filter: {
          ability: action.payload,
        },
      };
    },
    setFilteredPokemons: (state, action: PayloadAction<Array<PokemonBase>>) => {
      return {
        ...state,
        filteredPokemons: action.payload,
      };
    },
  },
});

export const {
  isVisible,
  setPokemons,
  setExtendedAbilities,
  setFilter,
  clearFilter,
  setFilteredPokemons,
} = pokeApiSlice.actions;

export default pokeApiSlice.reducer;
