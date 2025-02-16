import { DndContext, DragEndEvent } from '@dnd-kit/core';
import '../Styles/Roster.css';
import PokedexScroller from './pokemonScroller';
import RosterSlot from './RosterSlot';
import { useState } from 'react';

function Roster()
{
    const [firstPokemon, setFirstPokemon] = useState<Pokemon | undefined>(undefined);
    const [secondPokemon, setSecondPokemon] = useState<Pokemon | undefined>(undefined);
    const [thirdPokemon, setThirdPokemon] = useState<Pokemon | undefined>(undefined);
    const [fourthPokemon, setFourthPokemon] = useState<Pokemon | undefined>(undefined);
    const [fifthPokemon, setFifthPokemon] = useState<Pokemon | undefined>(undefined);
    const [sixthPokemon, setSixthPokemon] = useState<Pokemon | undefined>(undefined);

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

        console.log("Over:", over.id, "Active:", active.id, "Active Data:", active.data.current, "Over Data:", over.data.current);

        const pokemonToSlot = active.data.current as Pokemon;

        if (over.id === "slot1") {
            setFirstPokemon(pokemonToSlot);
        } else if (over.id === "slot2") {
            setSecondPokemon(pokemonToSlot);
        } else if (over.id === "slot3") {
            setThirdPokemon(pokemonToSlot);
        } else if (over.id === "slot4") {
            setFourthPokemon(pokemonToSlot);
        } else if (over.id === "slot5") {
            setFifthPokemon(pokemonToSlot);
        } else if (over.id === "slot6") {
            setSixthPokemon(pokemonToSlot);
        }

    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex' }}>

                <div className="pokedex-scroller" style={{ overflow: 'clip' }}>
                    <PokedexScroller/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                    <div className='roster-slot'>
                        <RosterSlot PokemonToSlot={firstPokemon} slotID="slot1" />
                    </div>
                    <div className='roster-slot'>
                        <RosterSlot PokemonToSlot={secondPokemon} slotID="slot2" />
                    </div>
                    <div className='roster-slot'>
                        <RosterSlot PokemonToSlot={thirdPokemon} slotID="slot3" />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                    <div className='roster-slot'>
                        <RosterSlot PokemonToSlot={fourthPokemon} slotID="slot4" />
                    </div>
                    <div className='roster-slot'>
                        <RosterSlot PokemonToSlot={fifthPokemon} slotID="slot5" />
                    </div>
                    <div className='roster-slot'>
                        <RosterSlot PokemonToSlot={sixthPokemon} slotID="slot6" />
                    </div>
                </div>
            </div>
        </DndContext>
    );
}

export default Roster;