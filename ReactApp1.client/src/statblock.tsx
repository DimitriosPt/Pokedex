import { useEffect, useState } from 'react';

interface Statblock {
    name: string;
    stats: [key: string, value: number][];
}

interface Props {
    pokemonName: string;
}

function Statblock({ pokemonName }: Props) {

    const [pokemonStats, setStats] = useState<Statblock>(
        {
            name: "pikachu",
            stats: [
                ["hp", 35],
                ["attack", 55],
                ["defense", 40],
                ["special-attack", 50],
                ["special-defense", 50],
                ["speed", 90]]
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
            <div>
                {Object.entries(pokemonStats.stats).map(([key, value]) => <p>{key} : {value}</p>)}
            </div>
        </div>);
}

export default Statblock;