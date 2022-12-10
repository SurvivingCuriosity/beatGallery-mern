import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FlexRow } from '../containers/FlexRow'
import icon_editar from '../../assets/imgs/icons/icon_edit.svg'
import icon_delete from '../../assets/imgs/icons/icon_delete.svg'
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

            <p>{data.name}</p>
            <p>{data.genre}</p>

            <FlexRow rows gap={'0.25em'} >
                {data.tags?.split(',').map((tag, index) => {
                    return (
                        <div key={index} className='card-tag'>{tag}</div>
                    )
                })}

            </FlexRow>

            <p>{data.isAvailable}</p>
            <p>{data.isVisible}</p>


            <div className='card-key-and-bpm'>
                <p>{data.key + " " + data.scale}</p>
                <p>{data.tempo}</p>
            </div>
            <FlexRow>
                <Link to={`/${username}/beat/${data._id}`}>
                    <img className='card-icono-editar' src={icon_editar} alt='icono_editar'>

                    </img>
                </Link>

                <button onClick={handleBorrarBeat}>
                    <img className='card-icono-borrar' src={icon_delete} alt='icono_borrar'>

                    </img>
                </button>
            </FlexRow>

        </div>
    )
}
