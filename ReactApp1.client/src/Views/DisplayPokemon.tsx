import React, { useEffect, useState } from 'react';
import '../Styles/Utility.css';
import { DndContext, useDraggable } from '@dnd-kit/core';



interface Pokemon
{
    id: string;
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
    const [pokemon, setPokemon] = useState<Pokemon>({ id: "-1", name: "", types: [""], TypeRelations: [] });
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: pokemonToRender.id,
        data: pokemonToRender,
    });



    const transformStyle = transform ?
        { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;

    useEffect(() =>
    {
        setPokemon(pokemonToRender);
    }, [pokemonToRender]);

    return (
        <>
            <DndContext>
                <div ref={setNodeRef} {...attributes} {...listeners} style={transformStyle}>
                    <div key={`display_${pokemon.name}`}>
                        <h1 className={pokemon.types.join(" ")} id="pokemonLabel" style={{ marginBottom: "0" }}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                        <img src={pokemon.spriteURL} style={{ marginTop: "-20px", marginBottom: "-20px" }} />

                        {children}
                    </div>
                </div>
            </DndContext>
        </>
    );
}

export default DisplayPokemon;