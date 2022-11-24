import React, { useState, useEffect } from "react";
import { PasswordInput } from '../../utils/PasswordInput';
import { FlexRow } from "../../containers/FlexRow";
import { useSelector } from "react-redux";
import { Caja } from "../../containers/Caja";
import { FloatingButton } from "../../utils/FloatingButton";
import { ScreenWithNav } from "../../containers/ScreenWithNav";
import twitter from '../../../assets/imgs/icons/twitter.svg'
import spotify from '../../../assets/imgs/icons/spotify.svg'
import instagram from '../../../assets/imgs/icons/instagram.svg'
import youtube from '../../../assets/imgs/icons/youtube.svg'

const EditProfileScreen = () => {
    const  userData = useSelector((state) => state.userData);
    const [newData, setNewData] = React.useState(userData);
    const [mostrandoFormPass, setMostrandoFormPass] = useState(false);

    const [error, setError] = useState("");

    React.useEffect(() => {
        console.log(newData);
    }, [newData])

    React.useEffect(() => {

    }, [])


    const handleCheckbox = (e) => {
        setNewData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.checked
            }
        })
    }


    const updateProfileHandler = (e) => { }

    return (
        <ScreenWithNav titulo='Edit profile'>
            {error && <div>{error}</div>}
            <form noValidate onSubmit={updateProfileHandler} className="login-register-form fade-in" autoComplete="off">
                <Caja titulo='Main info'>
                    {/* USERNAME */}

                    <label htmlFor="register-username-label">Username:</label>
                    <input
                        id='register-username-label'
                        type='text'
                        name='username'
                        value={newData.username}
                        onChange={(evt) => { setNewData({ ...newData, username: evt.target.value }) }}
                        placeholder="Enter username..."
                        required
                        maxLength={30}
                        >
                    </input>

                    {/* EMAIL */}

                    <label htmlFor="register-email-label">Email:</label>
                    <input
                        id='register-email-label'
                        type='text'
                        name='email'
                        value={newData.email}
                        onChange={(evt) => { setNewData({ ...newData, email: evt.target.value }) }}
                        placeholder="Enter email..."
                        maxLength={70}
                        >
                    </input>

                    {/* ROLES */}
                    <FlexRow width='100%' gap='3em'>
                        <FlexRow>
                            <label htmlFor="edit-producer-label">Producer:</label>
                            <input
                                name='isProducer'
                                checked={newData.isProducer === true ? true : false}
                                onChange={handleCheckbox}
                                style={{ transform: 'scale(1.25)' }}
                                type='checkbox'
                            >
                            </input>
                        </FlexRow>
                        <FlexRow>
                            <label htmlFor="edit-artist-label">Artist:</label>
                            <input
                                name='isArtist'
                                checked={newData.isArtist === true ? true : false}
                                onChange={handleCheckbox}
                                style={{ transform: 'scale(1.25)' }}
                                type='checkbox'
                            >
                            </input>
                        </FlexRow>
                    </FlexRow>

                    {/* PASSWORDS */}
                    <p style={{ margin: 'auto', fontSize: '0.7em', padding: '1.5em' }} onClick={() => { setMostrandoFormPass(!mostrandoFormPass) }}>Cambiar contraseña</p>
                    {mostrandoFormPass && <>
                        <label htmlFor="register-pass-label">Current password:</label>
                        <PasswordInput
                            placeholder='Enter current password'
                            onChangeCallback={(e) => { return e }}
                            id='register-pass-label'
                        />
                        <label htmlFor="register-confirmPass-label">New password:</label>
                        <PasswordInput
                            placeholder='Repeat password'
                            onChangeCallback={(e) => { return e }}
                            id='register-confirmPass-label'
                        />
                        <label htmlFor="register-confirmPass-label">Confirm new password:</label>
                        <PasswordInput
                            placeholder='Repeat password'
                            onChangeCallback={(e) => { return e }}
                            id='register-confirmPass-label'
                        />
                    </>
                    }



                </Caja>
                <Caja titulo='Other info'>
                    <label htmlFor="edit-name-label">Name:</label>
                    <input
                        name='name'
                        value={newData.name}
                        onChange={(evt) => { setNewData({ ...newData, name: evt.target.value }) }}
                        id='edit-name-label'
                        required
                        type='text'
                        placeholder="Enter name...">
                    </input>
                    <label htmlFor="edit-aboutme-label">About me:</label>
                    <input
                        name='aboutme'
                        value={newData.aboutme}
                        onChange={(evt) => { setNewData({ ...newData, aboutme: evt.target.value }) }}
                        id='edit-aboutme-label'
                        required
                        type='text'
                        placeholder="Say something about you...">
                    </input>
                    <label htmlFor="edit-location-label">Location:</label>
                    <input
                        name='location'
                        value={newData.location}
                        onChange={(evt) => { setNewData({ ...newData, location: evt.target.value }) }}
                        id='edit-location-label'
                        required
                        type='text'
                        placeholder="Enter location...">
                    </input>
                    <label htmlFor="edit-redes-label">Redes:</label>
                    <FlexRow>
                        <img style={{ width: '1.5em' }} src={twitter}></img>
                        <input
                            name='twitter'
                            value={newData.twitter}
                            onChange={(evt) => { setNewData({ ...newData, twitter: evt.target.value }) }}
                            id='edit-redes-label'
                            required
                            type='text'
                            placeholder="Enter Twitter username...">
                        </input>
                    </FlexRow>
                    <FlexRow>
                        <img style={{ width: '1.5em' }} src={instagram}></img>
                        <input
                            name='instagram'
                            value={newData.instagram}
                            onChange={(evt) => { setNewData({ ...newData, instagram: evt.target.value }) }}
                            required
                            type='text'
                            placeholder="Enter Instagram username...">
                        </input>
                    </FlexRow>
                    <FlexRow>
                        <img style={{ width: '1.5em' }} src={spotify}></img>
                        <input
                            name='spotify'
                            value={newData.spotify}
                            onChange={(evt) => { setNewData({ ...newData, spotify: evt.target.value }) }}
                            required
                            type='text'
                            placeholder="Enter Spotify artist username...">
                        </input>
                    </FlexRow>
                    <FlexRow>
                        <img style={{ width: '1.5em' }} src={youtube}></img>
                        <input
                            name='youtube'
                            value={newData.youtube}
                            onChange={(evt) => { setNewData({ ...newData, youtube: evt.target.value }) }}
                            required
                            type='text'
                            placeholder="Enter Youtube username...">
                        </input>
                    </FlexRow>

                </Caja>
            </form>
            <FloatingButton action='save'/>

        </ScreenWithNav>
    );
};

export default EditProfileScreen;