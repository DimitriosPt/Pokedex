/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import DisplayPokemon from './DisplayPokemon';
import CollapsablePokemonFrame from './CollapsablePokemonFrame';

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
    id: number;
}

function PokedexScroller()
{
    const [allPokemon, setPokemon] = useState<Pokemon[]>([]);

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
            next={() => { }}
            hasMore={false}
            loader={<h4>Loading...</h4>}>

            {allPokemon?.map((pokemon) => (
                <div key={pokemon.id}>
                    <CollapsablePokemonFrame pokemonToRender={pokemon} />
                </div>
            ))}
        </InfiniteScroll>
    )
}

export default PokedexScroller;