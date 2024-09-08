import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokedexScroller from './Views/pokemonScroller';
import Lookup from './Views/Lookup';

function App()
{
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Lookup} />
                <Route path="/all" Component={PokedexScroller} />
            </Routes>
        </Router>
    );
}

export default App;