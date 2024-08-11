import { useState, useEffect } from 'react';
import './App.css';
import FindPokemon from './Views/findPokemon';
import Statblock from './Views/statblock';

function App() {
    const [search, setSearch] = useState("");
    const [lastValidSearch, setPokemonName] = useState("");

    useEffect(() =>
    {
        fetch(`findPokemon/${search}`).then((response) =>
        {
            if (response.ok) {
                setPokemonName(search);
            }
            else
            {
                setPokemonName(lastValidSearch);
            }
        });
    }), [search];

    const invalidSearchStyle = lastValidSearch !== search ? {
        border: '1px solid red',
        title: search + ' was not found'
    } : {};

    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} style={invalidSearchStyle} title={invalidSearchStyle.title} />

            {lastValidSearch === "" ?
                <p>Enter a pokemon to start</p> : 
                <div className='parent grid-parent'>
                    <div className='child'>
                        <FindPokemon pokemonName={lastValidSearch} />
                    </div>
                    <div className='child' style={{ marginTop: '20%' }}>
                        <Statblock pokemonName={lastValidSearch} />
                    </div>
                </div>
            }
        </div>
    );

}

export default App;