import { DndContext } from '@dnd-kit/core';
import '../Styles/Roster.css';
import PokedexScroller from './pokemonScroller';
import RosterSlot from './RosterSlot';

function Roster()
{
    return (
        <DndContext>
            <div style={{ display: 'flex' }}>
                <PokedexScroller />
                <div style={{ display: 'flex' }}  className='roster-grid'>
                    <div>
                        <div className='roster-slot'>
                            <RosterSlot PokemonToSlot={undefined } />
                        </div>
                    </div>
                </div>
            </div>
        </DndContext>
    );
}

export default Roster;