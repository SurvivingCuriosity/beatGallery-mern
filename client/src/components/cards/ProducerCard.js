import React from 'react'
import { Link } from 'react-router-dom'
import { FlexContainer } from '../containers/FlexContainer'
import icon_editar from '../../assets/imgs/icons/icon_edit.svg'

export const ProducerCard = (props) => {
    const { data } = props;
    console.log(data);
    return (
        <div id='user-beat-card'>

            <p>{data.username}</p>
            <p>{data.role}</p>

            {/* <Link to={`/${username}/beat/${data._id}`}>
                <img className='card-icono-editar' src={icon_editar} alt='icono_editar'>

                </img>
            </Link> */}

        </div>
    )
}
