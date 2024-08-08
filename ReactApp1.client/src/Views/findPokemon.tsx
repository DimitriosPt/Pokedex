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
    typeResistances: string[],
    typeImmunities: string[]
}

interface Props {
    pokemonName: string;
}

function FindPokemon({ pokemonName }: Props) {

    const [pokemon, setPokemon] = useState<Pokemon>({ name: "pikachu", types: ["electric"] });
    const [typeData, setTypeData] = useState<TypeRelationTable[]>([]);

    const [strongTypes, setStrongTypes] = useState<string[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        getPokemonDataFromName(pokemonName, controller.signal);

        return () => controller.abort();
    }, [pokemonName]);

    useEffect(() =>
    {
        const controller = new AbortController();

        updateMatchups(pokemon, controller.signal);
        return () => controller.abort();
    }, [pokemon]);

    async function getPokemonDataFromName(pokemonName: string, abortSignal: AbortSignal)
    {
        const response = await fetch(`findPokemon/${pokemonName}`, { signal: abortSignal });
        const data = await response.json();

        console.log(data);
        setPokemon(data as Pokemon);
    }

    async function updateMatchups(pokemon: Pokemon, abortSignal: AbortSignal)
    { 
        const pokemonTypes = pokemon.types;
        let allStrongTypes: string[] = [];
        const typeDataTable: TypeRelationTable[] = [];

        await Promise.all(pokemonTypes.map(async (type, index) => {
            const typeIDData = await fetch(`typelookup/${type}`, { signal: abortSignal });
            typeDataTable[index] = await typeIDData.json() as TypeRelationTable;

            const doubleDamageTo = typeDataTable[index].typeAdvantages;

            allStrongTypes = allStrongTypes.concat(doubleDamageTo);
        }));

        setTypeData(typeDataTable);

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

            <h4>Immune to:</h4>
            <TypesList typesList={Array.from(new Set(typeData.flatMap(type => type.typeImmunities)))} />

            <h4>Weak Against:</h4>
            <WeakTypesList typesList={pokemon.types} />
        </div>
    );
}

export default FindPokemon;