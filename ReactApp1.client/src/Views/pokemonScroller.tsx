/* eslint-disable prefer-const */
import { useEffect, useState, useRef } from 'react';
import TypesList, { WeakTypesList } from './typeList';

interface Pokemon
{
    name: string;
    types: string[];
    spriteURL?: string;
}

function PokedexScroller()
{
    const [allPokemon, setPokemon] = useState<Pokemon[]>();
    useEffect(() => {
        // Fetch data here
        const fetchData = async () =>
        {
            const response = await fetch('/allPokemon');
            const data = await response.json();
            setPokemon(data);
        }
    }, []);

    // Rest of the component code
}

export default FindPokemon;