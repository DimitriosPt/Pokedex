import { useState } from 'react';
import './App.css';
import FindPokemon from './Views/findPokemon';
import Statblock from './Views/statblock';

function App() {
    const [search, setSearch] = useState("");

    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />

            {search === undefined || search.length === 0 ?
                <p>Enter a pokemon to start</p> : 
                <div className='parent grid-parent'>
                    <div className='child'>
                        <FindPokemon pokemonName={search} />
                    </div>
                    <div className='child' style={{ marginTop: '20%' }}>
                        <Statblock pokemonName={search} />
                    </div>
                </div>
            }
        </div>
    );

}

export default App;