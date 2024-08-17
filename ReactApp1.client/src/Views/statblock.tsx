import '../Styles/Statblock.css';
import { useEffect, useState, useRef } from 'react';

interface Statblock {
    name: string;
    stats: { [key: string]: number };
}

interface Props {
    pokemonName: string;
}

function Statblock({ pokemonName }: Props)
{

    const isLoading = useRef(true);

    const [pokemonStats, setStats] = useState<Statblock>(
    {
        name: "",
        stats: {
            hp: 0,
            attack: 0,
            defense: 0,
            "special-attack": 0,
            "special-defense": 0,
            speed: 0
        }
        })


    useEffect(() => {
        getPokemonStatblock(pokemonName);

    }, [pokemonName]);

    async function getPokemonStatblock(pokemonName: string)
    {
        isLoading.current = true;

        const response = await fetch(`pokemonstats/${pokemonName}`);

        if (response.ok)
        {
            const data = await response.json();

            isLoading.current = false;
            setStats(data as Statblock);
        }
    }

    return (
        <div>
            {isLoading.current ? <></> :
                <>
                    {
                        Object.entries(pokemonStats.stats).map(([key, value]) => (
                            <div key={key + "_stat"}>
                                <label className="stat-label" key={key + "label"} > {key} : {value} </label>
                                <progress className="stat-progress" key={key + "progress"} max="255" value={pokemonStats.stats[key]} />
                            </div>

                        ))
                    }

                    <div key={pokemonName + '_statTotals'}>
                        <label className="stat-label" key={pokemonName + "label"} > Total : {Object.values(pokemonStats.stats).reduce((acc, cur) => acc + cur)} </label>
                    </div>
                </>}
        </div>);
}

export default Statblock;