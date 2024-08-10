import '../Styles/Statblock.css';
import { useEffect, useState } from 'react';

interface Statblock {
    name: string;
    stats: { [key: string]: number };
}

interface Props {
    pokemonName: string;
}

function Statblock({ pokemonName }: Props) {

    const [pokemonStats, setStats] = useState<Statblock>(
        {
            name: "pikachu",
            stats: [
                ["hp", 0],
                ["attack", 0],
                ["defense", 0],
                ["special-attack", 0],
                ["special-defense", 0],
                ["speed", 0]]
        })

    useEffect(() => {
        getPokemonStatblock(pokemonName);
    }, [pokemonName]);

    async function getPokemonStatblock(pokemonName: string) {
        const response = await fetch(`pokemonstats/${pokemonName}`);
        const data = await response.json();

        console.log(data);
        setStats(data as Statblock);
    }

    return (
        <div>

            {Object.entries(pokemonStats.stats).map(([key, value]) => (
                <div>
                    <label className="stat-label" key={key + "label"} > {key} : {value} </label>
                    <progress className="stat-progress" key={key + "progress"} max="255" value={pokemonStats.stats[key]} />
                </div>

            ))}
        </div>);
}

export default Statblock;