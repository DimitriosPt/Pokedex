import '../Styles/Roster.css';
import PokedexScroller from './pokemonScroller';
import RosterSlot from './RosterSlot';

function Roster()
{
    return (
        <>
            <div style={{ display: 'flex' }}>
                <PokedexScroller />
                <div style={{ display: 'flex' }}  className='roster-grid'>
                    <div>
                        <div className='roster-slot'>
                            <RosterSlot />
                        </div>
                        <div className='roster-slot'>
                            <RosterSlot />
                        </div>
                        <div className='roster-slot'>
                            <RosterSlot />
                        </div>
                    </div>
                    <div>
                        <div className='roster-slot'>
                            <RosterSlot />
                        </div>
                        <div className='roster-slot'>
                            <RosterSlot />
                        </div>
                        <div className='roster-slot'>
                            <RosterSlot />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Roster;