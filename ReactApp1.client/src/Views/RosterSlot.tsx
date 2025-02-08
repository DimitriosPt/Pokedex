import { useEffect, useState } from "react";
import DisplayPokemon from "./DisplayPokemon";
import { DndContext, useDroppable } from "@dnd-kit/core";

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

interface Props
{
    PokemonToSlot: Pokemon | undefined;
    slotID: string;
}

function RosterSlot({ PokemonToSlot, slotID }: Props)
{
    const [droppedPokemon, setDroppedPokemon] = useState<Pokemon | undefined>(undefined);

    const { setNodeRef } = useDroppable({
        id: slotID
    })

    useEffect(() =>
    {
        setDroppedPokemon(PokemonToSlot);
    }, [PokemonToSlot]);

    return (
        <DndContext id={slotID}>
            <div ref={setNodeRef}>
                {droppedPokemon ? (
                    <DisplayPokemon pokemonToRender={droppedPokemon} />
                ) : null}
            </div>
        </DndContext>
    );
}

export default RosterSlot;