import { useState } from 'react';
import './App.css';
import FindPokemon from './findPokemon';
import Statblock from './statblock';

function App() {
    const [search, setSearch] = useState("Pikachu");

    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />

            <FindPokemon pokemonName={search} />

            <Statblock pokemonName={search} />
        </div>
    );

}

export default App;