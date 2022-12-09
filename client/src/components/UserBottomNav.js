import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import icon_home from '../assets/imgs/icons/icon_home.svg';
import icon_music_library from '../assets/imgs/icons/icon_music_library.svg';
import icon_user from '../assets/imgs/icons/icon_user.svg';
import icon_search from '../assets/imgs/icons/icon_search.svg';
import icon_add from '../assets/imgs/icons/icon_add.svg';
import { useSelector, useDispatch } from "react-redux";
import { navigationDone } from '../redux/Actions';
export const UserBottomNav = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isProducer } = props;
    const loggedUser = useSelector((state) => state?.userData);
    const loggedUsername = loggedUser?.username;
    const { redirect } = useSelector((state) => state);

    const artistConfig = [
        { img: icon_home, text: 'Home', link: '/' },
        { img: icon_search, text: 'Search', link: '/search' },
        { img: icon_user, text: 'Home2', link: `/${loggedUsername}` }
    ]
    const producerConfig = [
        { img: icon_home, text: 'Home', link: '/' },
        { img: icon_search, text: 'Search', link: '/search' },
        { img: icon_add, text: 'Add Beat', link: `/${loggedUsername}/beats/add` },
        { img: icon_music_library, text: 'Beats', link: `/${loggedUsername}/beats` },
        { img: icon_user, text: 'Perfil', link: `/${loggedUsername}` }
    ]

    const [activeConfig, setActiveConfig] = React.useState(isProducer ? producerConfig : artistConfig);

    React.useEffect(() => {
        /*RESALTA EL ENLACE ACTUAL BASED ON PATH*/
        const newState = activeConfig.map((menuItem) => {
            if (menuItem.link === window.location.pathname) {
                return { ...menuItem, active: true }
            } else {
                return { ...menuItem, active: false }
            }
        })
        setActiveConfig(newState);

    }, []);

    React.useEffect(() => {
        if (redirect != '' && redirect != undefined && redirect != null) {
            console.log(redirect);
            navigate(`${redirect}`, { replace: true })
            dispatch(navigationDone());
        }
    
    }, [redirect])
    


    return (
        <nav className="fixed-bottom-nav">
            <ul>
                {activeConfig?.map((menuItem) => {
                    return (
                        <Link
                            key={menuItem.text}
                            to={menuItem.link}
                        >
                            <img
                                className={menuItem.active === true ? `menu-item-activo` : ''}
                                src={menuItem.img}
                                alt={menuItem.text}
                                name={menuItem.link}
                            />
                            <p className={menuItem.active === true ? `menu-item-text-activo` : ''} style={{ fontSize: '0.75em', textAlign: 'center' }}>{menuItem.text}</p>
                        </Link>
                    )
                })}
            </ul>
        </nav>
    )
}
