import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../TodoPage';
import PokemonList from '../../components/pokemonList/PokemonList';


const PokemonPage = () => {

    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const [ limit, setLimit ] = useState(12);
    const [ offset, setOffset ] = useState(0);
    const [pokemons, setPokemons] = useState([])
    console.log(offset);
    const page = (offset / limit) + 1;

    const handlePrev = () => {
        setOffset(prevState => prevState - limit);
    };
    const handleNext = () => {
        setOffset(prevState => prevState + limit);
    };
    const getApi = async(API) => {
        const response = await fetch(`${BASE_URL}/?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        getApi().then(data=> setPokemons(data.results))
    }, []);

    return (
        <div>
            <PokemonList pokemons={pokemons}/>
        </div>
    );
};

export default PokemonPage;