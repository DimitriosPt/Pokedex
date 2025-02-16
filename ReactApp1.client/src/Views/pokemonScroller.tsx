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

    useEffect(() =>
    {
        async function getAllPokemon()
        {
            const response = await fetch(`/allPokemon/range?limit=30&offset=${offSet}`);
            const data = await response.json();
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setPokemon(prevPokemon => [...prevPokemon, ...data]);
                setOffset(prevOffset => prevOffset + 30); // Update the offset after fetching data
            }
        }

        getAllPokemon();
    }, []);

    const fetchMoreData = () =>
    {
        async function getAllPokemon()
        {
            const response = await fetch(`/allPokemon/range?limit=30&offset=${offSet}`);
            const data = await response.json();
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setPokemon(prevPokemon => [...prevPokemon, ...data]);
                setOffset(prevOffset => prevOffset + 30); // Update the offset after fetching data
            }
        }

        getAllPokemon();
    };

    return (
        <InfiniteScroll
            dataLength={currentlyLoadedPokemon.length}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            next={fetchMoreData}
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