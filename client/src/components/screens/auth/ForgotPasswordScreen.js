import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { PopupMsg } from "../../utils/PopupMsg";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')

    React.useEffect(() => {
        if(error===''){
            return
        }
        setTimeout(()=>{setError('');},5000)
    }, [error]);

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header:{
                'Content-Type':'application/json'
            }
        }
        try {
            const {data} = await axios.post(
                '/api/auth/forgotPassword',
                {email},
                config
            )
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error)
            setEmail('')
        }
    }
    return(
        <div className="forgotPass-screen screen">
            <Link className='logo-link-welcome' to='/welcome'>BeatGallery</Link>
            
            {error && <PopupMsg type='error' msg={error}/>}
            {success && <PopupMsg type='success' msg={success}/>}

            <form onSubmit={forgotPasswordHandler} className="login-register-form fade-in">

                <h2 className="titulo-screen">¿Forgot your password?</h2>
                <p style={{color:'var(--blanco2)',marginBottom:'2em'}}>Enter your email and we'll send you a link to set a new password.</p>

                <label htmlFor="forgotPass-email-label">Email:</label>
                <input 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                    id='forgotPass-email-label'
                    type='text'
                    placeholder="Enter email...">

                </input>

                <button className="btn btn-1" type='submit'>Send email</button>
            </form>

        </div>
    )
}

export default ForgotPasswordScreen