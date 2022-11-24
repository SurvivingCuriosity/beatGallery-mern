import React from "react";
import { Link } from "react-router-dom";
import {FlexRow} from '../containers/FlexRow'
const WelcomeScreen = () => {
    return(
        <div className="welcome-screen screen">
            <h1 className="welcome-header">Beat Gallery</h1>
            <div style={{textAlign:'left', marginBottom:'4em'}}>
                <p className="welcome-subheader">For producers:</p>
                <p className="welcome-text">- Store beat metadata</p>
                <p className="welcome-text">- Search, sort, and filter</p>
                <p className="welcome-text">- Sell your beats</p>

                <p className="welcome-subheader">For artists:</p>
                <p className="welcome-text">- Find beats by your mood</p>
                <p className="welcome-text">- Save, like and share beats</p>
            </div>

                    <Link className='btn btn-1 btn-start' to='/register'>SIGN UP</Link>
                    <Link className='btn btn-2 pad-2' to='/search'>Explore as guest...</Link>

                <Link className='welcome-login-btn' to='/login' style={{color:'var(--blanco2)'}}>Login</Link>
        </div>
    )
}

export default WelcomeScreen