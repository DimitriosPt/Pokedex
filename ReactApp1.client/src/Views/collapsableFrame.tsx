import { useState } from 'react';
import { useCollapse } from 'react-collapsed';

interface Props
{
    children?: React.ReactNode;
}

function CollapsableFrame({ children }: Props)
{
    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    return (
        <div>
            <button
                {...getToggleProps({
                    onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                })}
            >
                {isExpanded ? 'Collapse' : 'Expand'}
            </button>
            <section {...getCollapseProps()}>
                {children}
            </section>
        </div>
    );
}

export default CollapsableFrame;
