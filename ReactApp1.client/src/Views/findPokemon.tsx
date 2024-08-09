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


function DetermineWeaknesses(typeData: TypeRelationTable[]): Map<string, number> | undefined{

    const allWeaknesses: Map<string, number> = new Map<string, number>();

    // Populate allWeaknesses with all types that the pokemon is weak to for its first type.
    typeData[0].typeDisadvantages.map(
        (type) => {
            allWeaknesses.set(type, 2);
        });

    if (typeData.length == 2) {
        const secondType = typeData[1];

        // Go thorugh the weaknesses of the second type and add them to the allWeaknesses object.
        // if a weakness overlaps, then the weakness is 4x.
        secondType.typeDisadvantages.map((type) => {
            if (allWeaknesses.has(type)) {
                // Type is a key in the allWeaknesses dictionary
                allWeaknesses.set(type, 4);
            } else {
                // Type is not a key in the allWeaknesses dictionary
                allWeaknesses.set(type, 2);
            }
        })

        // Go through types 1's resistances and remove them from the weaknesses, they now have a normal damage relationship.
        typeData[0].typeResistances.map((type) =>
        {
            allWeaknesses.delete(type);
        })

        // do the same thing for type 2's resistances.
        typeData[1].typeResistances.map((type) => {
            allWeaknesses.delete(type);
        })
    }


    return allWeaknesses;
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

    useEffect(() => {
        const controller = new AbortController();

        updateMatchups(pokemon, controller.signal);
        return () => controller.abort();
    }, [pokemon]);

    async function getPokemonDataFromName(pokemonName: string, abortSignal: AbortSignal) {
        const response = await fetch(`findPokemon/${pokemonName}`, { signal: abortSignal });
        const data = await response.json();

        console.log(data);
        setPokemon(data as Pokemon);
    }

    async function updateMatchups(pokemon: Pokemon, abortSignal: AbortSignal) {
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
            {
                typeData.length == 0 ? <p>Loading...</p> : <WeakTypesList typesAndValues={DetermineWeaknesses(typeData)} typesList={[]} />
            }
            
        </div>
    );
}

export default FindPokemon;