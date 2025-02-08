import { DndContext, DragEndEvent } from '@dnd-kit/core';
import '../Styles/Roster.css';
import PokedexScroller from './pokemonScroller';
import RosterSlot from './RosterSlot';
import { useState } from 'react';

function Roster()
{
    const [firstPokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

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

    function handleDragEnd(event: DragEndEvent)
    {

        const { active, over } = event;

        if (!over)
        {
            return;
        }

        setPokemon(active.data.current as Pokemon);

    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex' }}>
                <PokedexScroller />
                <div className='roster-slot'>
                    <RosterSlot PokemonToSlot={firstPokemon} slotID="slot1" />
                </div>
            </div>
        </DndContext>
    );
}

export default Roster;