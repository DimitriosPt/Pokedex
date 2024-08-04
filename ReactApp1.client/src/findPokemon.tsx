import { useEffect, useState } from 'react';

interface Pokemon {
    name: string;
    types: string[];
}

function FindPokemon() {
    const [pokemon, setPokemon] = useState<Pokemon>({ name: "pikachu", types:["electric"] });

    useEffect(() => {
        getPokemonDataFromName();
    }, []);

    async function getPokemonDataFromName() {
        const response = await fetch(`findPokemon/`);
        const data = await response.json();

        console.log(data);
        setPokemon(data as Pokemon);
    }

    return (
        <div>
            <h1 id="tableLabel">{pokemon.name}</h1>
            <p>{pokemon.types}</p>
        </div>
    );
}

export default FindPokemon;