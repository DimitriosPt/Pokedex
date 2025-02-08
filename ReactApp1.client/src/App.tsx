import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokedexScroller from './Views/pokemonScroller';
import Lookup from './Views/Lookup';
import Roster from './Views/Roster';

function App()
{
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Lookup} />
                <Route path="/all" Component={PokedexScroller} />
                <Route path="/party" Component={Roster} />
            </Routes>
        </Router>
    );
}

export default App;