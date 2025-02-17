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

const LIMIT = 60;

function PokedexScroller()
{
    const [currentlyLoadedPokemon, setPokemon] = useState<Pokemon[]>([]);
    const [offSet, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);



    useEffect(() =>
    {
        async function fetchPokemon()
        {
            const response = await fetch(`/allPokemon/range?${LIMIT}=60&offset=${offSet}`);
            const data = await response.json();
            if (data.length === 0)
            {
                setHasMore(false);
            } else
            {
                setPokemon(prevPokemon => [...prevPokemon, ...data]);
            }
        }

        fetchPokemon();
    }, [offSet]);


    return (
        <InfiniteScroll
            dataLength={currentlyLoadedPokemon.length}
            hasMore={hasMore} // Prevent next request if initial load is in progress
            loader={<h4>Loading...</h4>}
            next={() => { setOffset(prev => prev + 60); }}
            height={"50vh"}
            style={{ overflow: 'auto', overflowX: 'hidden', maxWidth: '200px', padding: '20px', margin: '10px', direction: 'rtl' }}
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