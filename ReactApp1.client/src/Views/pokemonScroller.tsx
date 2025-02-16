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
    const [offSet, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Add initial load state

    async function fetchPokemon()
    {
        const response = await fetch(`/allPokemon/range?limit=60&offset=${offSet}`);
        const data = await response.json();
        if (data.length === 0)
        {
            setHasMore(false);
        } else
        {
            setOffset(prevOffset => prevOffset + 60); // Update the offset after fetching data
            setPokemon(prevPokemon => [...prevPokemon, ...data]);
        }
        setIsInitialLoad(false); // Set initial load to false after initial fetch
    }

    useEffect(() =>
    {
        fetchPokemon();
    }, [offSet]);


    return (
        <InfiniteScroll
            dataLength={currentlyLoadedPokemon.length}
            hasMore={hasMore && !isInitialLoad} // Prevent next request if initial load is in progress
            loader={<h4>Loading...</h4>}
            next={fetchPokemon}
            height={"50vh"}
            style={{ overflow: 'auto', overflowX: 'hidden', maxWidth: '200px', padding: '20px', margin:'10px' }}
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