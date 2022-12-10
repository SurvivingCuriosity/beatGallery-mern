import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserProfile } from '../../cards/UserProfile'
import { logoutAction } from "../../../redux/Actions.js";
import { ScreenWithNav } from "../../containers/ScreenWithNav";
const PublicProfileScreen = () => {
    const  userData  = useSelector((state) => state.userData);
    let param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");


    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutAction(navigate));
    }
    
    

    return (
        <ScreenWithNav titulo={`${userData?.username}'s profile`}>
            {error && <p>{error}</p>}
            <UserProfile
                data={userData}
                logoutCallback={handleLogout}
                isPrivateProfile={true}
            />
        </ScreenWithNav>
    );
};

export default PublicProfileScreen;