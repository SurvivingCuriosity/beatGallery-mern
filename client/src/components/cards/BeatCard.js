import React from 'react'
import { useParams } from 'react-router-dom'
import { FlexRow } from '../containers/FlexRow'
import icon_paid from '../../assets/imgs/icons/icon_paid.svg'
import icon_visibility from '../../assets/imgs/icons/icon_visibility.svg'
import { deleteBeatAction } from '../../redux/Actions'
import { useDispatch } from 'react-redux'

export const BeatCard = (props) => {
    const dispatch = useDispatch();
    const param = useParams();
    const username = param.username;

    const handleBorrarBeat = () => {
        dispatch(deleteBeatAction(data._id));
        console.log();
    }

    const { data } = props;
    return (
        <div id='beat-card'>
            <div className='right-part'>
                <p className='beat-card-name'>{data.name}</p>
                <p className='beat-card-genre'>{data.genre || 'Sin género'}</p>
                <FlexRow rows gap={'0.25em'} >
                    {data.tags?.split(',').map((tag, index) => {
                        return (
                            <div key={index} className='card-tag'>{tag || 'Sin tags'}</div>
                        )
                    })}

                </FlexRow>
            </div>
            <div className='left-part'>
                <FlexRow width='100%' alignItems='flex-end' gap='0.2em'>
                    {data?.isFree === false && <img src={icon_paid}></img>}
                    {data?.isAvailable && <p className='card-tag'>Available</p>}

                    <div className='card-key-and-bpm'>
                        <p>{data.key + " " + data.scale}</p>
                        <p>{data.tempo}</p>
                    </div>
                </FlexRow>
            </div>
            

            
            
        </div>
    )
}
