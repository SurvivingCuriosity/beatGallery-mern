import React from 'react'
import { FlexRow } from '../containers/FlexRow'
import { Link } from 'react-router-dom';

export const ProducerCard = (props) => {
    const { data } = props;


    const goToUserProfile = () => {

    }

    return (
        <Link to={`/${data.username}`}>
            <div id='user-beat-card' onClick={goToUserProfile}>
                <p>{data.username}</p>
                <p>{data.role}</p>
                <FlexRow>
                    {data?.isProducer === true &&
                        <div className='--user-profile-tag'>
                            productor
                        </div>
                    }
                    {data?.isArtist === true &&
                        <div className='--user-profile-tag'>
                            artista
                        </div>
                    }
                </FlexRow>
            </div>
        </Link>
    )
}
