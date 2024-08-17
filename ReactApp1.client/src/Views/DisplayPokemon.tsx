import React, { useEffect, useState, useRef } from 'react';

interface Pokemon
{
    name: string;
    types: string[];
    TypeRelations: TypeRelationTable[];
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
    pokemonToRender: Pokemon;
    children?: React.ReactNode;
}

function DisplayPokemon({ pokemonToRender, children }: Props)
{
    const [pokemon, setPokemon] = useState<Pokemon>({ name: "", types: [""], TypeRelations: [] });

    useEffect(() =>
    {

        setPokemon(pokemonToRender);
    }, [pokemonToRender]);

    return (
        <>
            <div>
                <h1 className={pokemon.types.join(" ")} id="pokemonLabel" >{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                <img src={pokemon.spriteURL} />

                {children}

            </div>
        </>
    );
}

export default DisplayPokemon;