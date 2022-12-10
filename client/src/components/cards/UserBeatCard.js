import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FlexRow } from '../containers/FlexRow'
import icon_editar from '../../assets/imgs/icons/icon_edit.svg'
import icon_delete from '../../assets/imgs/icons/icon_delete.svg'
import icon_visibility from '../../assets/imgs/icons/icon_visibility.svg'
import icon_paid from '../../assets/imgs/icons/icon_paid.svg'
import { deleteBeatAction } from '../../redux/Actions'
import { useDispatch } from 'react-redux'

export const UserBeatCard = (props) => {
    const dispatch = useDispatch();
    const param = useParams();
    const username = param.username;

    const handleBorrarBeat = () => {
        dispatch(deleteBeatAction(data._id));
        console.log();
    }

    const { data } = props;
    return (
        <div id='user-beat-card'>
            <div className='right-part'>
                <p className='beat-card-name'>{data.name}</p>

                <span>
                    <FlexRow rows gap={'0.25em'} wrap='wrap' >
                        {data.tags?.split(',').map((tag, index) => {
                            return (
                                <div key={index} className='card-tag'>{tag}</div>
                            )
                        })}

                    </FlexRow>
                    <p className='beat-card-genre'>{data.genre}</p>
                </span>
            </div>

            <div className='left-part'>
                <div className='user-beat-card-botones-container'>
                    <Link to={`/${username}/beat/${data._id}`}>
                        <img className='card-icono-editar' src={icon_editar} alt='icono_editar'></img>
                    </Link>

                    <button onClick={handleBorrarBeat}>
                        <img className='card-icono-borrar' src={icon_delete} alt='icono_borrar'></img>
                    </button>
                </div>
                <FlexRow width='100%' alignItems='flex-end' gap='0.2em'>
                    {data?.isFree===false && <img src={icon_paid}></img>}
                    {data?.isVisible && <img src={icon_visibility}></img>}
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
