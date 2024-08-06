import { useEffect, useState } from 'react';

interface Props {
    typesList: string[];
}

export function TypesList({ typesList }: Props) {

    const [types, setTypes] = useState<string[]>();

    useEffect(() => {
        setTypes(typesList);
    }, [typesList]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            {types?.map((type, index) => {
                if (type === 'someCondition') {
                    return <b><p key={index} style={{ marginRight: '10px' }}>{type}</p></b>;
                } else {
                    return <p key={index} style={{ marginRight: '10px' }}>{type}</p>;
                }
            })}
        </div>
    );
}

export function WeakTypesList({ typesList }: Props) {
    const [typesAndOccurrences, setTypesAndOccurrences] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        async function fetchData() {
            const updatedTypesAndOccurrences = new Map<string, number>();

            for (const type of typesList) {
                const typeData = await fetch(`typelookup/${type}`).then((response) => response.json());

                const weaknesses = typeData.typeDisadvantages as string[];

                for (const weakness of weaknesses) {
                    if (updatedTypesAndOccurrences.has(weakness)) {
                        updatedTypesAndOccurrences.set(weakness, 2);
                    } else {
                        updatedTypesAndOccurrences.set(weakness, 1);
                    }
                }
            }

            setTypesAndOccurrences(updatedTypesAndOccurrences);
        }

        fetchData();
    }, [typesList]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            {Array.from(typesAndOccurrences.entries()).map(([type, value], index) => (
                    <p key={index}  style={{ marginRight: '10px' }}>{`${type}: ${value * 2}x`}</p>
            ))}
        </div>
    );
}

export default TypesList;