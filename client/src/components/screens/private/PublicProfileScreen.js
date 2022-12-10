import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserProfile } from '../../cards/UserProfile'
import { fetchPublicUserData } from "../../../redux/Actions.js";
import { ScreenWithNav } from "../../containers/ScreenWithNav";
const PublicProfileScreen = () => {
    const { publicUserData } = useSelector((state) => state);
    let param = useParams();
    const dispatch = useDispatch();

    React.useEffect(() => {
        //se obtienen los datos del usuario (se utiliza el presente en la URL)
        dispatch(fetchPublicUserData(param.username))
    }, [])


    return (
        <ScreenWithNav titulo={`${param.username}'s profile`}>
            <UserProfile
                data={publicUserData}
                isPrivateProfile={false}
            />
        </ScreenWithNav>
    );
};

export default PublicProfileScreen;