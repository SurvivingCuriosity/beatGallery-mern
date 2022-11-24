import React from "react";
import visibility from '../../assets/imgs/icons/visibility.svg'
import visibility_off from '../../assets/imgs/icons/visibility_off.svg'
export const PasswordInput = (props) => {
    const { placeholder, id, onChangeCallback, tieneError, coincide } = props;
    const [password, setPassword] = React.useState('')
    const [showingPass, setShowingPass] = React.useState(false);


    React.useEffect(()=>{
        onChangeCallback(password)
    },[password])

    return(
        <div style={{position:'relative', width:'100%'}}>
            <input 
                className={tieneError ? 'input-error' : ''}
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                id={id}
                type={`${showingPass ? `text` : `password`}`}
                required
                placeholder={placeholder}>
            </input>
            {password &&
            <img 
                className="logo-show-password"
                onClick={()=>{setShowingPass(!showingPass)}}
                src={showingPass ? visibility_off : visibility}></img>}
        </div>
    )
}