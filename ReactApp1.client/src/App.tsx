import { useState, useEffect } from 'react';
import './App.css';
import FindPokemon from './Views/findPokemon';
import Statblock from './Views/statblock';

function App() {
    const [search, setSearch] = useState("");
    const [validPokemonName, setPokemonName] = useState("");

    useEffect(() =>
    {
        fetch(`findPokemon/${search}`).then((response) =>
        {
            if (response.ok) {
                setPokemonName(search);
            }
            else
            {
                setPokemonName(validPokemonName);
            }
        });
    }), [search];

    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />

            {validPokemonName === undefined || validPokemonName.length === 0 ?
                <p>Enter a pokemon to start</p> : 
                <div className='parent grid-parent'>
                    <div className='child'>
                        <FindPokemon pokemonName={validPokemonName} />
                    </div>
                    <div className='child' style={{ marginTop: '20%' }}>
                        <Statblock pokemonName={validPokemonName} />
                    </div>
                </div>
            }
        </div>
    );

}

export default App;