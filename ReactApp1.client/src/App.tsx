import { useEffect, useState, useRef } from 'react';
import './App.css';
import Statblock from './Views/statblock';
import { TypesList, WeakTypesList } from './Views/typeList';
import CollapsablePokemonFrame from './Views/CollapsablePokemonFrame';

function App()
{
    interface TypeRelationTable
    {
        id: string,
        type: string,
        typeAdvantages: string[],
        typeDisadvantages: string[],
        typeResistances: string[],
        typeImmunities: string[];
    }

    interface Pokemon
    {
        name: string;
        types: string[];
        TypeRelations: TypeRelationTable[];
        spriteURL?: string;
    }

    const search = useRef("");
    const [foundPokemon, setFoundPokemon] = useState<Pokemon | undefined>(undefined);

    useEffect(() =>
    {


    }, [foundPokemon]);

    async function updateMatchups(pokemon: Pokemon)
    {
        const pokemonTypes = pokemon.types;
        const typeDataTables: TypeRelationTable[] = [];

        await Promise.all(pokemonTypes.map(async (type, index) =>
        {
            const typeIDData = await fetch(`typelookup/${type}`);
            typeDataTables[index] = await typeIDData.json() as TypeRelationTable;

        })).then(() => pokemon.TypeRelations = typeDataTables);
    }

    function updateSearch(newSearch: string)
    {
        search.current = newSearch;
        fetch(`findPokemon/${search.current}`).then((response) =>
        {
            if (response.ok)
            {
                response.json().then((data) =>
                {
                    const pokemon = data as Pokemon;
                    updateMatchups(pokemon).then(() => setFoundPokemon(pokemon));
                });
            }
        });
    }

    const invalidSearchStyle = foundPokemon === undefined && search.current.length > 0 ? {
        border: '1px solid red',
        title: search + ' was not found'
    } : {};

    return (
        <>
            <input type="text" onChange={e => updateSearch(e.target.value)} style={invalidSearchStyle} title={invalidSearchStyle.title} />

            {foundPokemon === undefined ?
                <p>Enter a pokemon to start</p> :
                <CollapsablePokemonFrame pokemonToRender={foundPokemon}>
                    <TypesList typesList={foundPokemon.types} />
                    <h4>Strong Against:</h4>
                    <TypesList typesList={foundPokemon.TypeRelations.flatMap(tr => tr.typeAdvantages)} />

                    <h4>Immune to:</h4>
                    <TypesList typesList={Array.from(new Set(foundPokemon.TypeRelations.flatMap(type => type.typeImmunities)))} />

                    <h4>Weak Against:</h4>
                    <WeakTypesList key={foundPokemon.name + '_weaknesses'} typesList={foundPokemon.TypeRelations.map(typeRelationshipTable => typeRelationshipTable.type)} />

                    <Statblock key={foundPokemon.name + '_statblock'} pokemonName={foundPokemon.name} />
                </CollapsablePokemonFrame>
            }
        </>

    );
}

export default App;