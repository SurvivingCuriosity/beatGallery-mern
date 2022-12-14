import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PopupMsg } from '../../utils/PopupMsg';
import { PasswordInput } from '../../utils/PasswordInput'
import { registerAction } from "../../../redux/Actions.js";
import { useDispatch, useSelector } from "react-redux";
import { FormButton } from "../../utils/FormButton";

const RegisterScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [isProducer, setIsProducer] = React.useState(false);
    const [isArtist, setIsArtist] = React.useState(false);

    const [error, setError] = React.useState('');



    React.useEffect(() => {
        if (error === '') {
            return
        }
        setTimeout(() => { setError(''); }, 5000)
    }, [error]);

    const registerHandler = async (evt) => {
        evt.preventDefault();
        if (username !== '' && email !== '' && password !== '')
            dispatch(registerAction({ username, email, password, isProducer, isArtist }, navigate, evt));
    }

    const handleCheckbox = (e) => {
        switch (e.target.name) {
            case 'producer':
                setIsProducer(!isProducer);
                break;
            case 'artist':
                setIsArtist(!isArtist);
                break;
            default:
                break;
        }
    }

    return (
        <div className="register-screen screen">
            <Link className='logo-link-welcome' to='/welcome'>BeatGallery</Link>
            <form noValidate onSubmit={registerHandler} className="login-register-form fade-in" autoComplete="off">
                <h2 className="titulo-screen">Register</h2>
                <label htmlFor="register-user-label">Username:</label>
                <input
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    id='register-user-label'
                    required
                    type='text'
                    placeholder="Enter username..."
                >
                </input>

                <label htmlFor="register-email-label">Email:</label>
                <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    id='register-email-label'
                    required
                    type='text'
                    placeholder="Enter email...">

                </input>
                <label htmlFor="register-pass-label">Password:</label>
                <PasswordInput
                    tieneError={password !== confirmPassword && confirmPassword !== '' && true}
                    coincide={password === confirmPassword && true}
                    placeholder='Enter password'
                    onChangeCallback={(pass) => { setPassword(pass) }}
                    id='register-pass-label'
                    required
                />
                <label htmlFor="register-confirmPass-label">Confirm password:</label>
                <PasswordInput
                    tieneError={password !== confirmPassword && confirmPassword !== '' && true}
                    placeholder='Repeat password'
                    coincide={password === confirmPassword && true}
                    onChangeCallback={(pass) => { setConfirmPassword(pass) }}
                    id='register-confirmPass-label'
                    required
                />
                <div style={{ display: 'flex', gap: '0.5em', alignItems: 'baseline' }}>
                    <input
                        name='producer'
                        checked={isProducer}
                        onChange={handleCheckbox}
                        style={{ transform: 'scale(1.25)' }}
                        type='checkbox'
                        id='register-producer-label'
                    >
                    </input>
                    <label htmlFor="register-producer-label">I'm a producer</label>
                </div>
                <div style={{ display: 'flex', gap: '0.5em', alignItems: 'baseline' }}>
                    <input
                        name='artist'
                        checked={isArtist}
                        onChange={handleCheckbox}
                        style={{ transform: 'scale(1.25)' }}
                        type='checkbox'
                        id='register-artist-label'
                    >
                    </input>
                    <label htmlFor="register-artist-label">I'm an artist</label>
                </div>
                <FormButton 
                    callback={registerHandler}
                    text='Register'
                />
                
            </form>
            <p className="bottom-text-register">Already have an account? Login <Link to='/login' className="btn btn-3">here</Link></p>

        </div>
    )
}

export default RegisterScreen