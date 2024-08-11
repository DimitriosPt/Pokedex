/* eslint-disable prefer-const */
import { useEffect, useState, useRef } from 'react';
import TypesList, { WeakTypesList } from './typeList';

interface Pokemon
{
    name: string;
    types: string[];
    spriteURL?: string;
}

interface TypeRelationTable
{
    id: string,
    type: string,
    typeAdvantages: string[],
    typeDisadvantages: string[],
    typeResistances: string[],
    typeImmunities: string[];
}

interface Props
{
    searchedName: string;
}



function FindPokemon({ searchedName }: Props)
{
    const [pokemon, setPokemon] = useState<Pokemon>({ name: "", types: [""] });
    let typeData = useRef<TypeRelationTable[]>([]);

    let strongTypes = useRef<string[]>([]);

    useEffect(() =>
    {
        async function updateMatchups(pokemon: Pokemon)
        {
            const pokemonTypes = pokemon.types;
            let allStrongTypes: string[] = [];
            const typeDataTable: TypeRelationTable[] = [];

            await Promise.all(pokemonTypes.map(async (type, index) =>
            {
                const typeIDData = await fetch(`typelookup/${type}`);
                typeDataTable[index] = await typeIDData.json() as TypeRelationTable;

                const doubleDamageTo = typeDataTable[index].typeAdvantages;

                allStrongTypes = allStrongTypes.concat(doubleDamageTo);
            }));

            typeData.current = typeDataTable;

            strongTypes.current = Array.from(new Set(allStrongTypes));
        }

        async function getPokemonDataFromName(name: string)
        {
            const response = await fetch(`findPokemon/${name}`);

            if (response.ok)
            {
                const data = await response.json();
                await updateMatchups(data as Pokemon).then(() => setPokemon(data as Pokemon));
            }
        }

        getPokemonDataFromName(searchedName);
    }, [searchedName]);

    return (
        <>
            <div>
                <h1 id="tableLabel">{pokemon.name}</h1>
                <TypesList typesList={pokemon.types} />
                <img src={pokemon.spriteURL} />

                <h4>Strong Against:</h4>
                <TypesList typesList={strongTypes.current}/>

                <h4>Immune to:</h4>
                <TypesList typesList={Array.from(new Set(typeData.current.flatMap(type => type.typeImmunities)))} />

                <h4>Weak Against:</h4>
                <WeakTypesList typesList={typeData.current.map((typeTable) => typeTable.type)} />
            </div>
        </>
    );
}

export default FindPokemon;