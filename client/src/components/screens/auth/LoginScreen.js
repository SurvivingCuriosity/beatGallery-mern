import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PopupMsg } from "../../utils/PopupMsg";
import { PasswordInput } from "../../utils/PasswordInput";
import { loginAction } from "../../../redux/Actions.js";
import { useDispatch, useSelector } from "react-redux";
import { FormButton } from "../../utils/FormButton";

function LoginScreen(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('');



    React.useEffect(() => {
        if (error === '') {
            return
        }
        setTimeout(() => { setError(''); }, 5000)
    }, [error]);

    const loginHandler = async (evt) => {
        evt.preventDefault();
        dispatch(loginAction({email, password}, navigate, evt));
    }


    return (
        <div className="login-screen screen">
            <Link className='logo-link-welcome' to='/welcome'>BeatGallery</Link>
            {error && <PopupMsg type='error' msg={error} />}
            <form onSubmit={loginHandler} className="login-register-form fade-in" autoComplete="off">
                <h2 className="titulo-screen">Login</h2>
                <label htmlFor="login-email-label">Email:</label>
                <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    id='login-email-label'
                    type='email'
                    required
                    placeholder="Enter email...">
                </input>
                <label htmlFor="login-pass-label">Password:</label>
                <PasswordInput
                    placeholder='Enter password'
                    onChangeCallback={(pass) => { setPassword(pass) }}
                    id='login-pass-label'
                />

                <Link to='/forgotPassword' className='btn btn-3' style={{ marginTop: '1em' }}>Forgot password</Link>
                <FormButton
                    callback={loginHandler}
                    text='Login'
                />
            </form>
            <p className="bottom-text-register">New to this site? Register <Link className='btn btn-3' to='/register'>here</Link></p>

        </div>
    )
}

export default LoginScreen