import React from 'react'
import icon_save from '../../assets/imgs/icons/icon_save.svg'
import icon_add from '../../assets/imgs/icons/icon_add.svg'
import icon_search from '../../assets/imgs/icons/icon_search.svg'
import { Spinner } from './Spinner';
import { useSelector } from 'react-redux';
export const FloatingButton = (props) => {
    const { loading } = useSelector((state) => state);
    const { callback, action } = props;

    let icon = icon_add;
    const [iconState, setIconState] = React.useState(icon_save);
    React.useEffect(() => {
        switch (action) {
            case 'save':
                setIconState(icon_save);
                break;
            case 'search':
                setIconState(icon_search);
                break;
            case 'add':
                setIconState(icon_add);
                break;
            default:
                setIconState(icon_save);
                break;
        }
    }, [action])

    const handleClick = (evt) => {
        console.log('Se pulsa boton, llamando a callback');
        callback();
    }
    return (
        <button
            className='floating-button'
            onClick={handleClick}
            disabled={loading === true ? true : false}
        >
            {loading === true
                ?
                <Spinner enBoton={true} />
                :
                <img src={iconState}></img>
            }
        </button>
    )
}
