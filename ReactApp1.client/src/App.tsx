import { useState } from 'react';
import './App.css';
import FindPokemon from './Views/findPokemon';
import Statblock from './Views/statblock';

function App() {
    const [search, setSearch] = useState("Pikachu");

    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />


            <div className='parent grid-parent'>
                <div className='child'>
                    <FindPokemon pokemonName={search} />
                </div>
                <div className='child'>
                    <Statblock pokemonName={search} />
                </div>
            </div>
        </div>
    );

}

export default App;