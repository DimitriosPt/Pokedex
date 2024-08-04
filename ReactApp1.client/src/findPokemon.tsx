import { useEffect, useState } from 'react';

interface Pokemon {
    name: string;
    types: string[];
    spriteURL?: string;
}

interface Props {
    pokemonName: string;
}

function FindPokemon({ pokemonName }: Props) {

    const [pokemon, setPokemon] = useState<Pokemon>({ name: "pikachu", types: ["electric"] });

    useEffect(() => {
        getPokemonDataFromName(pokemonName);
    }, [pokemonName]);

    async function getPokemonDataFromName(pokemonName: string) {
        const response = await fetch(`findPokemon/${pokemonName}`);
        const data = await response.json();

        console.log(data);
        setPokemon(data as Pokemon);
    }

    return (
        <div>
            <h1 id="tableLabel">{pokemon.name}</h1>
            {pokemon.types.map((type, index) => (
                <p key={index}>{type}</p>
            ))}
            <img src={pokemon.spriteURL} />
        </div>
    );
}

export default FindPokemon;