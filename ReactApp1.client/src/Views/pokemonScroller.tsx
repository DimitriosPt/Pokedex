/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import CollapsablePokemonFrame from './CollapsablePokemonFrame';
import TypesList from './typeList';

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
    spriteURL?: string;
    TypeRelations: TypeRelationTable[];
    id: string;
}

function PokedexScroller()
{
    const [currentlyLoadedPokemon, setPokemon] = useState<Pokemon[]>([]);

    //const fetchPokemon = useCallback(async () =>
    //{
    //    setLoading(true);
    //    try
    //    {
    //        const response = await fetch(`/allPokemon?limit=${currentlyLoadedPokemon.length}&offset=${limit}`);
    //    }
    //})

    useEffect(() =>
    {
        async function getAllPokemon()
        {
            const response = await fetch('/allPokemon');
            const data = await response.json();
            setPokemon(data);
        }

        getAllPokemon();
    }, []);

    return (
        <InfiniteScroll
            dataLength={1000}
            hasMore={false}
            loader={<h4>Loading...</h4>}
            next={() => { }}
            style={{ overflow: 'auto', maxHeight: '50vh' }}
        >
            {currentlyLoadedPokemon?.map((pokemon) => (
                <CollapsablePokemonFrame pokemonToRender={pokemon} key={pokemon.id} >
                    <TypesList typesList={pokemon.types} />
                </CollapsablePokemonFrame>
            ))}
        </InfiniteScroll>
    );
}

export default PokedexScroller;