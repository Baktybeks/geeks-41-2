import React from 'react';
import Pokemon from '../pokemon/Pokemon';


const PokemonList = ({pokemons}) => {
    console.log(pokemons,'55555');
    return (
        <div>
            {
                pokemons.map(pokemon=> <Pokemon key={pokemon.name} pokemon={pokemon}/>)
            }
        </div>
    );
};

export default PokemonList;