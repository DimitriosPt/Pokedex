/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";


interface Pokemon
{
    name: string;
    types: string[];
    spriteURL?: string;
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
            dataLength={allPokemon.length}
            next={() => { }}
            hasMore={false}
            loader={<h4>Loading...</h4>}>

            {allPokemon?.map((pokemon) => (
                <div key={pokemon.id}> {pokemon.name}
                    <img src={pokemon.spriteURL} />
                </div>
            ))}
        </InfiniteScroll>
    )
}

export default PokedexScroller;