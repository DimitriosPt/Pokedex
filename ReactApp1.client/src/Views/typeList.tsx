import { useEffect, useState } from 'react';
import ElementIcon from './elementIcon';

interface Props {
    typesList: string[];
    typesAndValues ?: Map<string, number>;
}

export function TypesList({ typesList }: Props) {

    const [types, setTypes] = useState<string[]>();

    useEffect(() => {
        setTypes(typesList);
    }, [typesList]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            {types?.map((type, index) =>
            {
                return <div key={type + index + "typeItem"} style={{ marginRight: '5px' }}><ElementIcon typeName={type} key={index} /></div>;
            })}
        </div>
    );
}

export function WeakTypesList({ typesAndValues }: Props) {
    if (!typesAndValues) {
        return <p style={{ marginRight: '10px' }}>Loading...</p> // or any other fallback behavior you want
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            {Array.from(typesAndValues.entries()).map(([type, value], index) => (
                <>
                    <div key={value + type + "_elementIcon"} style={{ display: 'inline-block', justifyContent: 'center', alignContent: 'center' }}>
                        <ElementIcon typeName={type} key={index} />
                    </div>
                    <div key={value + type + "_multiplier"} style={{ display: 'inline-block', justifyContent: 'center', alignContent: 'center', marginRight: '7px' }}>
                        <p key={index} style={{ marginLeft: '1px' }}>{`x${value}`}</p>
                    </div>
                </>
            ))}
        </div>
    );
}


export default TypesList;