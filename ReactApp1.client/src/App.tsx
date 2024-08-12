import { useState, useRef } from 'react';
import './App.css';
import FindPokemon from './Views/findPokemon';
import Statblock from './Views/statblock';

function App()
{
    const search = useRef("");
    const [lastValidSearch, setLastValidSearch] = useState("");

    function updateSearch(newSearch : string)
    {
        search.current = newSearch;
        fetch(`findPokemon/${search.current}`).then((response) =>
        {
            if (response.ok)
            {
                setLastValidSearch(search.current);
            }

        });
    }

    const invalidSearchStyle = lastValidSearch !== search.current ? {
        border: '1px solid red',
        title: search + ' was not found'
    } : {};

    return (
        <div>
            <input type="text" onChange={e => updateSearch(e.target.value)} style={invalidSearchStyle} title={invalidSearchStyle.title} />

            {lastValidSearch === "" ?
                <p>Enter a pokemon to start</p> : 
                <div className='parent grid-parent'>
                    <div className='child'>
                        <FindPokemon searchedName={lastValidSearch} />
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