import { useEffect, useState } from 'react';

interface Props {
    typesList: string[];
}

function TypesList({ typesList }: Props) {

    const [types, setTypes] = useState<string[]>();

    useEffect(() => {
        setTypes(typesList);
    }, [typesList]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            {types?.map((type, index) => (
                <b><p key={index} style={{ marginRight: '10px' }}>{type}</p></b>
            ))}
        </div>
    );
}

export default TypesList;