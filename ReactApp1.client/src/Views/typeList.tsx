import { useEffect, useState } from 'react';
import ElementIcon from './elementIcon';

interface Props {
    typesList: string[];
}

interface TypeRelationTable
{
    id: string,
    type: string,
    typeAdvantages: string[],
    typeDisadvantages: string[],
    typeResistances: string[],
    typeImmunities: string[];
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

export function WeakTypesList({ typesList }: Props)
{
    const [weaknessesAndValues, setWeaknessesAndValues] = useState<Map<string, number>>(new Map<string, number>());

    useEffect(() =>
    {
        async function populateTypeTables(types: string[]): Promise<TypeRelationTable[]>
        {
            const typeDataTable: TypeRelationTable[] = [];

            await Promise.all(types.map(async (type, index) =>
            {
                const typeIDData = await fetch(`typelookup/${type}`);
                typeDataTable[index] = await typeIDData.json() as TypeRelationTable;
            }));

            return typeDataTable;
        }

        async function DetermineWeaknesses(typeData: TypeRelationTable[]): Promise<Map<string, number>>
        {

            const allWeaknesses: Map<string, number> = new Map<string, number>();

            // Populate allWeaknesses with all types that the pokemon is weak to for its first type.
            typeData[0].typeDisadvantages.map(
                (type) =>
                {
                    allWeaknesses.set(type, 2);
                });

            if (typeData.length == 2)
            {
                const secondType = typeData[1];

                // Go thorugh the weaknesses of the second type and add them to the allWeaknesses object.
                // if a weakness overlaps, then the weakness is 4x.
                secondType.typeDisadvantages.map((type) =>
                {
                    if (allWeaknesses.has(type))
                    {
                        // Type is a key in the allWeaknesses dictionary
                        allWeaknesses.set(type, 4);
                    } else
                    {
                        // Type is not a key in the allWeaknesses dictionary
                        allWeaknesses.set(type, 2);
                    }
                });

                // Go through types 1's resistances and remove them from the weaknesses, they now have a normal damage relationship.
                typeData[0].typeResistances.map((type) =>
                {
                    allWeaknesses.delete(type);
                });

                // do the same thing for type 2's resistances.
                typeData[1].typeResistances.map((type) =>
                {
                    allWeaknesses.delete(type);
                });


                // Remove the immunities from the weaknesses.
                Array.from(new Set(typeData.flatMap(type => type.typeImmunities))).map((type) =>
                {
                    allWeaknesses.delete(type);
                });
            }

            return allWeaknesses;
        }
        
        populateTypeTables(typesList).then((typeData) => DetermineWeaknesses(typeData).then(((weaknessesAndVals) => setWeaknessesAndValues(weaknessesAndVals))));

    }, [typesList]);

    return (
        <div key={typesList.join(",") + "_weaknesses"} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            {Array.from(weaknessesAndValues.entries()).map(([type, value], index) => (
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