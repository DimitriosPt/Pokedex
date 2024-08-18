import { useState } from 'react';
import { useCollapse } from 'react-collapsed';
import DisplayPokemon from './DisplayPokemon';

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

function CollapsablePokemonFrame({ children, pokemonToRender}: Props)
{
    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    return (
        <div
            className='hoverable'
            {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}>
            <DisplayPokemon pokemonToRender={pokemonToRender} />

            <section {...getCollapseProps()} style={{ margin : '5px' }}>
                {children}
            </section>
        </div>
    );
}

export default CollapsablePokemonFrame;