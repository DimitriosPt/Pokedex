import '../Styles/Elements.css';
import { useEffect} from 'react';


interface Props
{
    typeName: string;
}

function ElementIcon({ typeName }: Props)
{
    useEffect(() =>
    {
    }, [typeName]);

    return (
        <textarea className={typeName +" elementIcon"} readOnly={true} value={typeName} wrap="hard"> </textarea>
    );
}

export default ElementIcon;