export type ShortPokemonsList = {
  url: string;
  name: string;
};

export type EffectEntries = {
  effect: string;
  language: {
    name: string;
  };
  short_effect: string;
};

export type FlavorEntries = {
  flavor_text: string;
  language: {
    name: string;
  };
  version_group: {
    name: string;
  };
};

export type ExtendedAbility = {
  id: number;
  name: string;
  effect_entries: EffectEntries[];
  flavor_text_entries: FlavorEntries[];
};

export type AbilityBase = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
};

export type PokemonBase = {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  };
  abilities: AbilityBase[];
};

export type LoadPokemonsParams = {
  limit: number;
  offset: number;
};
