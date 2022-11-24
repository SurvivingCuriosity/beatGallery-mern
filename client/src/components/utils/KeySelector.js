import React from 'react'
import { FlexRow } from '../containers/FlexRow'

export const KeySelector = (props) => {
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const {callback, keySelected} = props;
    const [keyState, setKeyState] = React.useState(keySelected)

    const handleClick = (evt) => {
        setKeyState(evt.target.id)
    }

    React.useEffect(() => {
        callback(keyState);
    }, [keyState]);
    return (
        <div className='key-selector-keys'>
            {keys.map((key, index) => {
                return (
                    <div 
                        id={key}
                        key={index}
                        className={`custom-radiobutton ${keyState === key && 'custom-radiobutton-active'}`}
                        onClick={handleClick}
                    >{key}</div>
                )
            })}
        </div>
    )
}
