import '../Styles/Statblock.css';
import { useEffect, useState } from 'react';

interface Statblock {
    name: string;
    stats: { [key: string]: number; };
}

interface Pokemon {
    id: string;
    name: string;
    spriteURL?: string;
}

interface Props {
    team: (Pokemon | undefined)[];
}

function TeamStatblock({ team }: Props) {
    const [pokemonStats, setStats] = useState<Statblock>({
        name: "Team Stats",
        stats: {
            hp: 0,
            attack: 0,
            defense: 0,
            "special-attack": 0,
            "special-defense": 0,
            speed: 0
        }
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        refreshTeamStats(team);
    }, [team]);

    async function refreshTeamStats(team: (Pokemon | undefined)[]) {
        setIsLoading(true);

        const stats: { [key: string]: number; } = {
            "hp": 0,
            "attack": 0,
            "defense": 0,
            "special-attack": 0,
            "special-defense": 0,
            "speed": 0
        };

        try {
            const fetchPromises = team
                .filter(pokemon => pokemon !== undefined) // Filter out undefined values
                .map(pokemon =>
                    fetch(`pokemonstats/${pokemon!.name}`).then(response => response.json())
                );

            const results = await Promise.all(fetchPromises);

            results.forEach(data => {
                for (const [key, value] of Object.entries(data.stats)) {
                    stats[key] += (value as number);
                }
            });

            setStats({ name: "Team Stats", stats });
        } catch (error) {
            console.error("Failed to fetch Pokémon stats:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {Object.entries(pokemonStats.stats).map(([key, value]) => (
                        <div key={key + "_stat"}>
                            <label className="stat-label" key={key + "label"}>{key} : {value}</label>
                            <progress className="stat-progress" key={key + "progress"} max="1530" value={value} />
                        </div>
                    ))}
                    <div key={pokemonStats.name + '_statTotals'}>
                        <label className="stat-label" key={pokemonStats.name + "label"}>Total : {Object.values(pokemonStats.stats).reduce((acc, cur) => acc + cur, 0)}</label>
                    </div>
                </>
            )}
        </div>
    );
}

export default TeamStatblock;