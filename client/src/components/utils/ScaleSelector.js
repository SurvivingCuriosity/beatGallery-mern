import React from 'react'
import { FlexContainer } from '../containers/FlexContainer';
import { FlexRow } from '../containers/FlexRow';

export const ScaleSelector = (props) => {
    const { callback, scaleSelected, isFilter } = props;

    const [scale, setScale] = React.useState(scaleSelected)

    React.useEffect(() => {
        setScale(scaleSelected);
    }, [])

    React.useEffect(() => {
        callback(scale);
    }, [scale])

    const handleClick = (evt) => {
        setScale(evt.target.id)

        if(isFilter){
            if(scale===evt.target.id){
                setScale('')
            }
        }
    }
    return (
        <FlexContainer columns gap='0.5em'>
            <div
                id='major'
                onClick={handleClick}
                className={`custom-radiobutton ${scale === 'major' && 'custom-radiobutton-active'}`}
            >
                Mayor
            </div>
            <div
                id='minor'
                onClick={handleClick}
                className={`custom-radiobutton ${scale === 'minor' && 'custom-radiobutton-active'}`}
            >
                Menor
            </div>
        </FlexContainer>
    )
}
