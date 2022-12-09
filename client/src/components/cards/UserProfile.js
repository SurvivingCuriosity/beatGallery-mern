import React from 'react'
import { Link } from 'react-router-dom'
import { FlexRow } from '../containers/FlexRow'
import icon_edit from '../../assets/imgs/icons/icon_edit.svg'
import icon_user from '../../assets/imgs/icons/icon_user.svg'
import twitter from '../../assets/imgs/icons/twitter.svg'
import instagram from '../../assets/imgs/icons/instagram.svg'
import spotify from '../../assets/imgs/icons/spotify.svg'
import youtube from '../../assets/imgs/icons/youtube.svg'

export const UserProfile = (props) => {
    const { data, logoutCallback } = props;
    return (
        <main className='user-profile fade-in'>
            <section className='caja --user-profile-main-info'>
                <FlexRow>
                    {/* imagen */}
                    <img src={icon_user}></img>
                    {/* AKA */}
                    <p className='--user-profile-username'>{data?.username}</p>
                </FlexRow>
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

                {/* nombre */}
                {data?.name && <p>{data.name}</p>}
                {/* ciudad */}
                {data?.location && <p>{data.location}</p>}

                <Link to={'/profile/edit'} className='--user-profile-edit-profile-link'>
                    <FlexRow>
                        <p>Editar perfil</p>
                        <img src={icon_edit} alt='icono editar perfil'></img>
                    </FlexRow>
                </Link>
            </section>
            
            <section className='caja --user-profile-more-info'>
                {/* about me */}

                <p className='--user-profile-header-text'>Breve descripción sobre mi</p>
                <p>{data?.aboutme || 'Edita el perfil para agregar más datos.'}</p>

                {data?.twitter || data?.instagram || data?.youtube || data?.spotify &&
                    <>
                        <p className='--user-profile-header-text'>Find me on:</p>
                        <FlexRow gap='1em'>
                            {data?.twitter &&
                                <FlexRow gap='0.25em'>
                                    <img src={twitter} alt='icono twitter' className='--user-profile-social-icon'></img>
                                    <p>{data?.twitter}</p>
                                </FlexRow>
                            }
                            {data?.youtube &&
                                <FlexRow gap='0.25em'>
                                    <img src={youtube} alt='icono youtube' className='--user-profile-social-icon'></img>
                                    <p>{data?.youtube}</p>
                                </FlexRow>
                            }
                            {data?.instagram &&
                                <FlexRow gap='0.25em'>
                                    <img src={instagram} alt='icono instagram' className='--user-profile-social-icon'></img>
                                    <p>{data?.instagram}</p>
                                </FlexRow>
                            }
                            {data?.spotify &&
                                <FlexRow gap='0.25em'>
                                    <img src={spotify} alt='icono spotify' className='--user-profile-social-icon'></img>
                                    <p>{data?.spotify}</p>
                                </FlexRow>
                            }
                        </FlexRow>
                    </>
                }



            </section>

            <section className='caja --user-profile-user-beats'>
                <p className='--user-profile-header-text'>Beats: </p>
            </section>

            <section className='caja --user-profile-saved-beats'>
                <p className='--user-profile-header-text'>Saved beats:</p>
            </section>


            <p className='--user-profile-logout-button' onClick={logoutCallback}>Cerrar sesión</p>
        </main>
    )
}
