import React, { useState } from "react";
import DisplayPokemon from "./DisplayPokemon";

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
    id: string;
    type: string;
    typeAdvantages: string[];
    typeDisadvantages: string[];
    typeResistances: string[];
    typeImmunities: string[];
}

function RosterSlot()
{
    const [droppedPokemon, setDroppedPokemon] = useState<Pokemon | null>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) =>
    {
        event.preventDefault();
        const droppedPokemonData = event.dataTransfer.getData("text/plain");
        const parsedDroppedPokemon = JSON.parse(droppedPokemonData);
        setDroppedPokemon(parsedDroppedPokemon);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    {
        event.preventDefault();
    };

    return (
        <>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {droppedPokemon ? (
                    <DisplayPokemon pokemonToRender={droppedPokemon} />
                ) : null}
            </div>
        </>
    );
}

export default RosterSlot;