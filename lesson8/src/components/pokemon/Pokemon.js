import React, { useEffect, useState } from 'react';


const Pokemon = ({pokemon}) => {
    const [pokemonDetails, setPokemonDetails] = useState({})
    console.log(pokemonDetails,'pokemon');
    const getApi = async(API) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        getApi().then(data=> setPokemonDetails(data))
    }, []);
    return (
        <div>
            <p>{pokemon.name}</p>
            <img src={pokemonDetails?.sprites?.other?.dream_world?.front_default} alt=""/>
        </div>
    );
};

export default Pokemon;