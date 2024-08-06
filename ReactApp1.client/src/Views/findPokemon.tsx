import { useEffect, useState } from 'react';
import TypesList, { WeakTypesList } from './typeList';

interface Pokemon {
    name: string;
    types: string[];
    spriteURL?: string;
}

interface TypeRelationTable {
    id: string,
    type: string,
    typeAdvantages: string[],
    typeDisadvantages: string[],
}

interface Props {
    pokemonName: string;
}

function FindPokemon({ pokemonName }: Props) {

    const [pokemon, setPokemon] = useState<Pokemon>({ name: "pikachu", types: ["electric"] });

    const [strongTypes, setStrongTypes] = useState<string[]>([]);

    useEffect(() => {
        getPokemonDataFromName(pokemonName);
    }, [pokemonName]);

    useEffect(() =>
    {
        updateMatchups(pokemon);
    }, [pokemon]);

    async function getPokemonDataFromName(pokemonName: string)
    {
        const response = await fetch(`findPokemon/${pokemonName}`);
        const data = await response.json();

        console.log(data);
        setPokemon(data as Pokemon);
    }

    async function updateMatchups(pokemon: Pokemon)
    { 
        const pokemonTypes = pokemon.types;
        let allStrongTypes: string[] = [];

        await Promise.all(pokemonTypes.map(async (type) => {
            const typeIDData = await fetch(`typelookup/${type}`);
            const typeData = await typeIDData.json() as TypeRelationTable;

            const doubleDamageTo = typeData.typeAdvantages;

            allStrongTypes = allStrongTypes.concat(doubleDamageTo);
        }));

        setStrongTypes(Array.from(new Set(allStrongTypes)));
    }

    return (
        <div>
            <h1 id="tableLabel">{pokemon.name}</h1>
            {pokemon.types.map((type, index) => (
                <p key={index}>{type}</p>
            ))}
            <img src={pokemon.spriteURL} />

            <h4>Strong Against:</h4>
            <TypesList typesList={strongTypes} />

            <h4>Weak Against:</h4>
            <WeakTypesList typesList={pokemon.types} />
        </div>
    );
}

export default FindPokemon;