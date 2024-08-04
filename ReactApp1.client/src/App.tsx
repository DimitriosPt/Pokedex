import { useState } from 'react';
import './App.css';
import FindPokemon from './findPokemon';

function App() {
    const [search, setSearch] = useState("Pikachu");
    const secondContents = <FindPokemon pokemonName={search} />;

    

    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />

            {secondContents }
        </div>
    );

}

export default App;