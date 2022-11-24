import React from 'react'
import { FlexContainer } from '../containers/FlexContainer';
import { FlexRow } from '../containers/FlexRow';

export const ScaleSelector = (props) => {
    const { callback, scaleSelected } = props;

    const [scale, setScale] = React.useState(scaleSelected)

    React.useEffect(() => {
        setScale(scaleSelected);
    }, [])
    React.useEffect(() => {
        callback(scale);
    }, [scale])

    return (
        <FlexContainer columns gap='0.5em'>
            <div
                onClick={() => { setScale('major') }}
                className={`custom-radiobutton ${scale === 'major' && 'custom-radiobutton-active'}`}
            >
                Mayor
            </div>
            <div
                onClick={() => { setScale('minor') }}
                className={`custom-radiobutton ${scale === 'minor' && 'custom-radiobutton-active'}`}
            >
                Menor
            </div>
        </FlexContainer>
    )
}
