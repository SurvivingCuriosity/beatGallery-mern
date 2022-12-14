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
    const { isProducer, hide } = props;
    const loggedUser = useSelector((state) => state?.userData);
    const loggedUsername = loggedUser?.username;
    const { redirect } = useSelector((state) => state);

    const artistConfig = [
        { img: icon_home, text: 'Home', link: '/' },
        { img: icon_search, text: 'Search', link: '/search' },
        { img: icon_user, text: 'Perfil', link: `/profile` }
    ]
    const producerConfig = [
        { img: icon_home, text: 'Home', link: '/' },
        { img: icon_search, text: 'Search', link: '/search' },
        { img: icon_add, text: 'Add Beat', link: `/${loggedUsername}/beats/add` },
        { img: icon_music_library, text: 'Beats', link: `/${loggedUsername}/beats` },
        { img: icon_user, text: 'Perfil', link: `/profile` }
    ]

    const [activeConfig, setActiveConfig] = React.useState(isProducer ? producerConfig : artistConfig);

    React.useEffect(() => {
        /*RESALTA EL ENLACE ACTUAL BASED ON PATH*/
        resaltaEnlaceActivo();
    }, []);

    React.useEffect(() => {
        if (redirect != '' && redirect != undefined && redirect != null) {
            navigate(`${redirect}`, { replace: true })
            dispatch(navigationDone());
        }

    }, [redirect])

    React.useEffect(() => {
        setActiveConfig(isProducer ? producerConfig : artistConfig)
        resaltaEnlaceActivo();
    }, [isProducer])


    const resaltaEnlaceActivo = () => {
        const newState = activeConfig.map((menuItem) => {
            if (menuItem.link === window.location.pathname) {
                return { ...menuItem, active: true }
            } else {
                return { ...menuItem, active: false }
            }
        })
        setActiveConfig(newState);
    }

    if (hide) return (
        <nav className="fixed-bottom-nav">
            <ul>
                <li>
                    <Link to={'/search'} >
                        <img
                            className={window.location.pathname === '/search' ? `menu-item-activo` : ''}
                            src={icon_search}
                            alt='search icon'
                            name='search'
                        />
                        <p className={window.location.pathname === '/search' ? `menu-item-text-activo` : ''} style={{ fontSize: '0.75em', textAlign: 'center' }}>Search</p>
                    </Link>
                </li>
                <li>
                    <Link to={'/welcome'} >
                        <img
                            src={icon_home}
                            alt='go back icon'
                            name='goback'
                        />
                        <p style={{ fontSize: '0.75em', textAlign: 'center' }}>Go back</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
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
