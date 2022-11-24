import React from "react";
import axios from "axios";
import { PopupMsg } from "../../utils/PopupMsg";
import {PasswordInput} from '../../utils/PasswordInput'
import { Link, useParams} from "react-router-dom";
const ResetPasswordScreen = ({match}) => {
    let param = useParams();
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    
    React.useEffect(() => {
        if(error===''){
            return
        }
        setTimeout(()=>{setError('');},5000)
    }, [error]);

    const resetPasswordHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      if (password !== confirmPassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Passwords don't match");
      }
  
      try {
        const { data } = await axios.put(
          `/api/auth/resetPassword/${param.resetToken}`,
          {
            password,
          },
          config
        );
  
        setSuccess(data.data);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };

    return(
        <div className="resetPass-screen screen">
            <Link className='logo-link-welcome' to='/welcome'>BeatGallery</Link>
            
            {error && <PopupMsg type='error' msg={error}/>}
            <form onSubmit={resetPasswordHandler} className="login-register-form fade-in">

                <h2 className="titulo-screen">Reset password</h2>
                
                
                {success && (
                <span className="success-message">
                    {success} <Link to="/login">Login</Link>
                </span>
                )}
                

                <label htmlFor="resetPass-password-label">Password:</label>
                <PasswordInput 
                    placeholder='Enter password'
                    onChangeCallback={(pass)=>{setPassword(pass)}}
                    id='login-pass-label'
                />
                <label htmlFor="resetPass-confirmPassword-label">Confirm password:</label>
                <PasswordInput 
                    placeholder='Repeat password'
                    onChangeCallback={(pass)=>{setConfirmPassword(pass)}}
                    id='resetPass-confirmPassword-label'
                />

                <button className="btn btn-1" type='submit'>Update password</button>
            </form>

        </div>
    )
}

export default ResetPasswordScreen