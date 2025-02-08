import { useState } from 'react';
import { useCollapse } from 'react-collapsed';
import DisplayPokemon from './DisplayPokemon';
import { useDraggable } from '@dnd-kit/core';

interface TypeRelationTable
{
    id: string,
    type: string,
    typeAdvantages: string[],
    typeDisadvantages: string[],
    typeResistances: string[],
    typeImmunities: string[];
}

interface Pokemon
{
    id: string;
    name: string;
    types: string[];
    TypeRelations: TypeRelationTable[];
    spriteURL?: string;
}

interface Props
{
    children?: React.ReactNode;
    pokemonToRender: Pokemon;
}

function CollapsablePokemonFrame({ children, pokemonToRender }: Props)
{
    const [isExpanded, setExpanded] = useState(true);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: pokemonToRender.id,
    });

    const transformStyle = transform ?
        { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;


    return (
        <div
            className='hoverable'
            {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })}>
            <div ref={setNodeRef} {...attributes} {...listeners} style={transformStyle}>
                <DisplayPokemon pokemonToRender={pokemonToRender} />

            </div>

            <section {...getCollapseProps()} style={{ margin: '5px' }}>
                {children}
            </section>
        </div>
    );
}

export default CollapsablePokemonFrame;