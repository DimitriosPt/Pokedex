import './App.css';
import FindPokemon from './findPokemon';
import Forecast from './forecast';


function App() {
    
    const contents = <Forecast />;

    const secondContents = <FindPokemon />;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {secondContents }
        </div>
    );

}

export default App;