import React from "react";
import {Link} from 'react-router-dom';
import icon_home from '../imgs/icons/icon_home.svg';
import icon_music_library from '../imgs/icons/icon_music_library.svg';
import icon_user from '../imgs/icons/icon_user.svg';
import icon_search from '../imgs/icons/icon_search.svg';

export const UserBottomNav = () => {
    let testuser = localStorage.getItem('username');

    
    const artistConfig = [
        {img: icon_home, text:'Home', link:'/', active:true},
        {img: icon_search, text:'Search', link:'/search'},
        {img: icon_user, text:'Home2', link:`/${testuser}/profile`}
    ]
    const producerConfig = [
        {img: icon_home, text:'Home', link:'/', active:true},
        {img: icon_search, text:'Search', link:'/search'},
        { img: icon_music_library, text: 'Beats', link: `/${testuser}/beats` },
        {img: icon_user, text:'Home2', link:`/${testuser}/profile`}
    ]
    const [activeConfig, setActiveConfig] = React.useState(localStorage.getItem('role')==='producer' ? producerConfig : artistConfig)

    React.useEffect(() => {
        /*RESALTA EL ENLACE ACTUAL BASED ON PATH*/
        let currentPath = window.location.pathname;
        if(localStorage.getItem('role')==='producer'){
            console.log('es producer');
            setActiveConfig(()=>{return producerConfig})
        }else if (localStorage.getItem('role')==='artist'){
            console.log('es artist');
            setActiveConfig(()=>{return artistConfig})
        }
        const newState = activeConfig.map((menuItem) => {
            if (menuItem.link === currentPath) {
                return { ...menuItem, active: true }
            } else {
                return { ...menuItem, active: false }
            }
        })
        setActiveConfig(newState);
    }, []);
    return(
        <nav className="fixed-bottom-nav">
            <ul>
                {activeConfig.map((menuItem)=>{return(
                    <Link 
                        key={menuItem.text}
                        to={menuItem.link}
                        >
                            <img
                                className={menuItem.active===true ? `menu-item-activo` : ''}
                                src={menuItem.img}
                                alt={menuItem.text}
                                name={menuItem.link}
                            />
                    </Link>
                )})}
            </ul>
        </nav>
    )
}
